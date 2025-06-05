import { BrowserRouter, Routes, Route } from "react-router";  // Corrected import for react-router-dom
import useSpinningFavicon from "./hooks/useSpinningFavicon";
import { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import EventList from "./pages/EventList/EventList";
import About from "./pages/About/About";
import AddEventForm from "./pages/AddEventForm/AddEventForm";
import Root from "./pages/Root";
import EventDetail from "./pages/EventDetail/EventDetail";
import axios from "axios";

const App = () => {
  useSpinningFavicon();

  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/events")  // Assuming your json-server is running on port 3001
      .then((res) => {
        setEventsData(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch events", error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route
            path="/events"
            element={<EventList eventsData={eventsData} />}
          />
          <Route
            path="/events/details/:eventId"
            element={<EventDetail eventsData={eventsData} />}
          />
          <Route path="/add" element={<AddEventForm />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;