import { useParams, useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";
import styles from "./EventDetail.module.css";
import { supportedCategory } from "../../data/categories";
import Icon from "../../components/Icon";
import { ThemeContext } from "../../ThemeContext";
import Swal from 'sweetalert2';
import BackToTopBtn from "../../components/BackToTopBtn/BackToTopBtn";

const defaultImageUrl =
  "https://cdn.pixabay.com/photo/2017/07/27/12/31/party-2545168_1280.jpg";

const EventDetail = ({ onDeleteEvent }) => {
  const { lightMode } = useContext(ThemeContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [editedEvent, setEditedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateError, setDateError] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:3001/events/${id}`);
        if (!res.ok) throw new Error("Event not found");
        const data = await res.json();
        setEvent(data);
        setEditedEvent(data);
        fetchWeather(data.location);
      } catch (err) {
        console.error("Error loading event:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchWeather = async (location) => {
      try {
        const city = location.split(",")[0];
        const apiKey = "59957c3ac93508bc3ae610a4fee2df0f";
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(weatherUrl);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (field, value) =>
    setEditedEvent((prev) => ({ ...prev, [field]: value }));

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setEditedEvent(event);
    setIsEditing(false);
  };

  const handleSave = async () => {
    const { startDate, endDate } = editedEvent;
  
    setDateError("");
  
    if (startDate < todayStr || endDate < todayStr) {
      setDateError("Event dates cannot be in the past.");
      return;
    }

    if (startDate > endDate) {
      setDateError("Start date cannot be after end date.");
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:3001/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedEvent),
      });
  
      if (!res.ok) throw new Error("Failed to save changes");
  
      const updated = await res.json();
  
      setEvent(updated);
      setEditedEvent(updated);
      setIsEditing(false);
  
      await Swal.fire({
        title: "Event saved!",
        text: "Your changes have been updated successfully.",
        icon: "success",
        confirmButtonText: "Nice!",
        confirmButtonColor: "#000000",
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true,
        backdrop: true,
        didOpen: () => {
          const modal = Swal.getPopup();
          if (modal) {
            modal.setAttribute('draggable', 'true');
          }
        }
      });
  
    } catch (error) {
      console.error("Error saving:", error);
  
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while saving.",
        footer: '<span style="color: #888;">Please check your connection or try again later.</span>'
      });
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#c60000",
      confirmButtonText: "Yes, delete it!"
    });
  
    if (!result.isConfirmed) return;
  
    try {
      const res = await fetch(`http://localhost:3001/events/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) throw new Error("Failed to delete event");
  
      if (onDeleteEvent) onDeleteEvent(id);
      navigate("/events");
  
      await Swal.fire({
        title: "Deleted!",
        text: "Your event has been deleted.",
        icon: "success"
      });
  
    } catch (error) {
      console.error("Error deleting event:", error);
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong while deleting the event."
      });
    }
  };

  const formatDateRange = (start, end) => {
    const format = (str) => new Date(str).toLocaleDateString("fi-FI");
    return start === end ? format(start) : `${format(start)} – ${format(end)}`;
  };

  const getConditionIconName = (condition) => {
    const normalized = condition.toLowerCase();
    if (normalized.includes("clear")) return "clear";
    if (normalized.includes("cloud")) return "clouds";
    if (normalized.includes("rain")) return "rain";
    if (normalized.includes("snow")) return "snow";
    if (normalized.includes("storm") || normalized.includes("thunder"))
      return "storm";
    if (normalized.includes("wind")) return "wind";
    if (!iconModule) return null;
  };

  const getWeatherMessage = (condition) => {
    const normalized = condition.toLowerCase();
    if (normalized.includes("clear")) return "A perfect day to go outside!";
    if (normalized.includes("cloud")) return "A bit gloomy — perfect for a coffee and chill.";
    if (normalized.includes("rain")) return "Brrr... don't forget your umbrella!";
    if (normalized.includes("snow")) return "Snowball fight, anyone?";
    if (normalized.includes("storm") || normalized.includes("thunder")) return "Stay safe indoors — stormy out there!";
    if (normalized.includes("wind")) return "Hold on to your hat, it's windy!";
    return "Weather is unpredictable today!";
  };

  if (loading) return <div className={styles.wrapper}>Loading event...</div>;
  if (!event) return <div className={styles.wrapper}>Event not found.</div>;

  const address = encodeURIComponent(editedEvent.address || "");

  return (
    <div className={`${styles.page} ${lightMode ? styles.light : styles.dark}`}>
      <div className={styles.wrapper}>
        <div className={styles.topSection}>
          <div className={styles.leftColumn}>
            {isEditing ? (
              <input
                className={styles.titleEditor}
                value={editedEvent.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            ) : (
              <h1 className={styles.heading}>{event.title}</h1>
            )}

            <div className={styles.infoGroup}>
              <div className={styles.infoBox}>
                <div className={styles.iconTextRow}>
                  <Icon
                    name="date"
                    alt="Calendar icon"
                    className={styles.icon}
                  />
                  <span className={styles.labelInline}>Date</span>
                </div>
                {isEditing ? (
                  <>
                    <input
                      type="date"
                      className={styles.dateInput}
                      value={editedEvent.startDate}
                      onChange={(e) =>
                        handleChange("startDate", e.target.value)
                      }
                      min={todayStr}
                    />
                    {" to "}
                    <input
                      type="date"
                      className={styles.dateInput}
                      value={editedEvent.endDate}
                      onChange={(e) => handleChange("endDate", e.target.value)}
                      min={todayStr}
                    />
                    {dateError && (
                      <p className={styles.errorText}>{dateError}</p>
                    )}
                  </>
                ) : (
                  <p>{formatDateRange(event.startDate, event.endDate)}</p>
                )}
              </div>

              <div className={styles.infoBox}>
                <div className={styles.iconTextRow}>
                  <Icon name="time" alt="Clock icon" className={styles.icon} />
                  <span className={styles.labelInline}>Time</span>
                </div>
                {isEditing ? (
                  <>
                    <input
                      type="time"
                      className={styles.timeInput}
                      value={editedEvent.startTime}
                      onChange={(e) =>
                        handleChange("startTime", e.target.value)
                      }
                    />
                    {" – "}
                    <input
                      type="time"
                      className={styles.timeInput}
                      value={editedEvent.endTime}
                      onChange={(e) => handleChange("endTime", e.target.value)}
                    />
                  </>
                ) : (
                  <p>{`${event.startTime} – ${event.endTime}`}</p>
                )}
              </div>

              <div className={styles.infoBox}>
                <div className={styles.iconTextRow}>
                  <Icon
                    name="location"
                    alt="Location icon"
                    className={styles.icon}
                  />
                  <span className={styles.labelInline}>Location</span>
                </div>
                {isEditing ? (
                  <input
                    className={styles.textInput}
                    value={editedEvent.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                  />
                ) : (
                  <p>{event.location}</p>
                )}
              </div>

              <div className={styles.infoBox}>
                <div className={styles.iconTextRow}>
                  <Icon
                    name="address"
                    alt="Address icon"
                    className={styles.icon}
                  />
                  <span className={styles.labelInline}>Address</span>
                </div>
                {isEditing ? (
                  <input
                    className={styles.textInput}
                    value={editedEvent.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                ) : (
                  <p>{event.address}</p>
                )}
              </div>

              <div className={styles.infoBox}>
                <div className={styles.iconTextRow}>
                  <Icon
                    name="category"
                    alt="Category icon"
                    className={styles.icon}
                  />
                  <span className={styles.labelInline}>Category</span>
                </div>
                {isEditing ? (
                  <select
                    className={styles.dropdown}
                    value={editedEvent.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                  >
                    {Object.entries(supportedCategory).map(([key, label]) =>
                      key === "all" ? null : (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                ) : (
                  <p>{supportedCategory[event.category] || event.category}</p>
                )}
              </div>

              <div className={styles.infoBox}>
                <div className={styles.iconTextRow}>
                  <Icon
                    name="description"
                    alt="Description icon"
                    className={styles.icon}
                  />
                  <span className={styles.labelInline}>Description</span>
                </div>
                {isEditing ? (
                  <textarea
                    className={styles.textareaInput}
                    value={editedEvent.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                  />
                ) : (
                  <p>{event.description}</p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <img
              src={editedEvent.imageUrl || defaultImageUrl}
              alt={event.title}
              className={styles.previewImage}
            />

            {!isEditing ? (
              <div className={styles.editDeleteWrap}>
                <button
                  className={`${styles.actionBtn} ${styles.editBtn}`}
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className={`${styles.actionBtn} ${styles.deleteBtn}`}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className={styles.saveCancelWrap}>
                <button
                  className={`${styles.actionBtn} ${styles.saveBtn}`}
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className={`${styles.actionBtn} ${styles.cancelBtn}`}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.rightColumn}>
          <img
            src={editedEvent.imageUrl || defaultImageUrl}
            alt={event.title}
            className={styles.previewImage}
          />

          {!isEditing ? (
            <div className={styles.editDeleteWrap}>
              <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={handleEdit}>Edit</button>
              <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={handleDelete}>Delete</button>
            </div>
          ) : (
            <div className={styles.saveCancelWrap}>
              <button className={`${styles.actionBtn} ${styles.saveBtn}`} onClick={handleSave}>Save</button>
              <button className={`${styles.actionBtn} ${styles.cancelBtn}`} onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </div>
      </div>

            {weather && (
        <div className={styles.weatherMapRow}>
          <div className={styles.weatherBox}>
            <h2 className={styles.weatherTitle}>Weather in {event.location}</h2>

            <div className={styles.iconTextRow}>
              <Icon name="temperature" alt="Temperature icon" className={styles.icon} />
              <span className={styles.temperatureLabel}>
                Temperature: {weather.main.temp}°C
              </span>
              <Icon
                name={getConditionIconName(weather.weather[0].description)}
                alt="Weather icon"
                className={styles.icon}
                title={weather.weather[0].description}
              />
            </div>

            <div className={styles.weatherMessage}>
              {getWeatherMessage(weather.weather[0].description)}
            </div>
          </div>
          <div className={styles.mapBox}>
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?q=${address}&key=AIzaSyCsXViH5vbINPYFvG359obqMUDvPq-ub-0`}
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        )}
      </div>

      <BackToTopBtn showAfter={200} />
    </div>
  );
};

export default EventDetail;
