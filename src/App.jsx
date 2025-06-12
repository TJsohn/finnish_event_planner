import useAxios from "./hooks/useAxios";
import { BrowserRouter, Routes, Route } from "react-router";
import useSpinningFavicon from "./hooks/useSpinningFavicon";
import { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import EventList from "./pages/EventList/EventList";
import About from "./pages/About/About";
import AddEventForm from "./pages/AddEventForm/AddEventForm";
import Root from "./pages/Root";
import EventDetail from "./pages/EventDetail/EventDetail";

const App = () => {
  const {get} = useAxios();
  useSpinningFavicon();

  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
      get("/events")
      .then((res) => {
        setEventsData(res.data);
      })
      .catch((error) => {
        console.error("Fail to fectch", error);
      });
  }, [get]);

  const addEventHandler = (newEvent) => {
    setEventsData((prev) => [...prev, newEvent]);
  };

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
            path="/events/details/:id"
            element={
              <EventDetail
                onDeleteEvent={(deletedId) => {
                  setEventsData((prev) => prev.filter((event) => event.id !== deletedId));
                }}
              />
            }
          />
          <Route path="/add" element={<AddEventForm onAddEvent={addEventHandler}/>} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
