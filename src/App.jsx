// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import useSpinningFavicon from './hooks/useSpinningFavicon';

import Home from "./pages/Home/Home";
import EventList from "./pages/EventList/EventList";
import About from "./pages/About/About";
import AddEventForm from "./pages/AddEventForm/AddEventForm";
import Root from "./pages/Root";
import "./App.css";
import EventDetail from "./pages/EventDetail/EventDetail";

const App = () => {
  useSpinningFavicon();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/details" element={<EventDetail />} />
          <Route path="/add" element={<AddEventForm />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;