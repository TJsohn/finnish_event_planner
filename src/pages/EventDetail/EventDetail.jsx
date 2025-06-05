import { useParams } from "react-router";  // Correct for react-router
import { useState, useEffect } from "react";
import styles from "./EventDetail.module.css";  // Styling later

const EventDetail = ({ eventsData }) => {
  const { eventId } = useParams();  // Get the eventId from the URL
  const [event, setEvent] = useState(null);
  const [weather, setWeather] = useState(null);

  // Find the event from eventsData
  useEffect(() => {
    const foundEvent = eventsData.find((e) => e.id.toString() === eventId);
    setEvent(foundEvent);

    // Fetch weather for the location
    if (foundEvent) {
      const fetchWeather = async () => {
        const location = foundEvent.location.split(',')[0];  // Take city for weather
        const apiKey = "59957c3ac93508bc3ae610a4fee2df0f";  // Replace with your OpenWeatherMap API key
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

  if (!event) {
    return <div className={styles.container}>Event not found</div>;
  }

  // Format the address for the Google Maps Embed API
  const address = encodeURIComponent(event.address);

  return (
    <div className={styles.container}>
      <h1>{event.title}</h1>
      <img
        src="https://images.unsplash.com/photo-1652381210069-2e4b639b3585?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt={event.title}
        className={styles.eventImage}
      />
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Address:</strong> {event.address}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Description:</strong> {event.description}</p>

      {/* Google Map embed */}
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

      {/* Weather Info */}
      {weather && (
        <div className={styles.weatherContainer}>
          <h2>Weather in {event.location}</h2>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Conditions:</strong> {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
