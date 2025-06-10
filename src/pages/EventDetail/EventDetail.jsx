import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import styles from "./EventDetail.module.css";
import { supportedCategory } from "../../data/categories";

const defaultImageUrl = "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg";

const EventDetail = ({ onDeleteEvent }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [editedEvent, setEditedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setEditedEvent(event);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedEvent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const { startDate, endDate } = editedEvent;

    if (startDate < todayStr || endDate < todayStr) {
      alert("Event dates cannot be in the past.");
      return;
    }

    if (startDate > endDate) {
      alert("Start date cannot be after end date.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedEvent),
      });
      if (!response.ok) throw new Error("Failed to save changes");

      const updated = await response.json();
      setEvent(updated);
      setEditedEvent(updated);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`http://localhost:3001/events/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete event");

      if (onDeleteEvent) onDeleteEvent(id);
      navigate("/events");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const formatDateRange = (start, end) => {
    const format = (dateStr) =>
      new Date(dateStr).toLocaleDateString("fi-FI");

    return start === end
      ? format(start)
      : `${format(start)} – ${format(end)}`;
  };

  if (loading) return <div className={styles.container}>Loading event...</div>;
  if (!event) return <div className={styles.container}>Event not found.</div>;

  const address = encodeURIComponent(editedEvent.address || "");

  return (
    <div className={styles.container}>
      {isEditing ? (
        <input
          className={styles.titleInput}
          value={editedEvent.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      ) : (
        <h1>{event.title}</h1>
      )}

      <img
        src={editedEvent.imageUrl || defaultImageUrl}
        alt={event.title}
        className={styles.eventImage}
      />

      <p><strong>Date:</strong>{" "}
        {isEditing ? (
          <>
            <input
              type="date"
              value={editedEvent.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              min={todayStr}
            />
            {" to "}
            <input
              type="date"
              value={editedEvent.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              min={todayStr}
            />
          </>
        ) : (
          formatDateRange(event.startDate, event.endDate)
        )}
      </p>

      <p><strong>Time:</strong> {event.startTime} – {event.endTime}</p>

      <p><strong>Location:</strong>{" "}
        {isEditing ? (
          <input
            value={editedEvent.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        ) : (
          event.location
        )}
      </p>

      <p><strong>Address:</strong>{" "}
        {isEditing ? (
          <input
            value={editedEvent.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        ) : (
          event.address
        )}
      </p>

      <p><strong>Category:</strong>{" "}
        {isEditing ? (
          <select
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
          supportedCategory[event.category] || event.category
        )}
      </p>

      <p><strong>Description:</strong>{" "}
        {isEditing ? (
          <textarea
            value={editedEvent.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        ) : (
          event.description
        )}
      </p>

      <div className={styles.mapContainer}>
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?q=${address}&key=AIzaSyCsXViH5vbINPYFvG359obqMUDvPq-ub-0`}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {weather && (
        <div className={styles.weatherContainer}>
          <h2>Weather in {event.location}</h2>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Conditions:</strong> {weather.weather[0].description}</p>
        </div>
      )}

      <div className={styles.buttonGroup}>
        {!isEditing ? (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        ) : (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetail;