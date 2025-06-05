import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import styles from "./EventDetail.module.css";

const EventDetail = ({ eventsData }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [editedEvent, setEditedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [weather, setWeather] = useState(null);

  const defaultImageUrl = "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg";

  useEffect(() => {
    const foundEvent = eventsData.find((e) => e.id.toString() === eventId);
    setEvent(foundEvent);
    setEditedEvent(foundEvent);

    if (foundEvent) {
      const fetchWeather = async () => {
        const location = foundEvent.location.split(',')[0];
        const apiKey = "59957c3ac93508bc3ae610a4fee2df0f";
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        try {
          const response = await fetch(weatherUrl);
          const data = await response.json();
          setWeather(data);
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      };
      fetchWeather();
    }
  }, [eventId, eventsData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (field, value) => {
    setEditedEvent((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setEditedEvent(event);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/events/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEvent),
      });

      if (!response.ok) throw new Error("Failed to update event");

      const updated = await response.json();
      setEvent(updated);
      setEditedEvent(updated);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete event");

      navigate("/events");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (!event) {
    return <div className={styles.container}>Event not found</div>;
  }

  const address = encodeURIComponent(editedEvent.address);
  const formatEventDate = (date) => {
    return date || "";
  };

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

      <p>
        <strong>Date:</strong>{" "}
        {isEditing ? (
          <input
            value={editedEvent.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        ) : (
          formatEventDate(event.date)
        )}
      </p>

      <p>
        <strong>Location:</strong>{" "}
        {isEditing ? (
          <input
            value={editedEvent.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        ) : (
          event.location
        )}
      </p>

      <p>
        <strong>Address:</strong>{" "}
        {isEditing ? (
          <input
            value={editedEvent.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        ) : (
          event.address
        )}
      </p>

      <p>
        <strong>Category:</strong>{" "}
        {isEditing ? (
          <input
            value={editedEvent.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />
        ) : (
          event.category
        )}
      </p>

      <p>
        <strong>Description:</strong>{" "}
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
          allowFullScreen=""
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
        {!isEditing && <button onClick={handleEdit}>Edit</button>}
        {isEditing && (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetail;