import React, { useState } from "react";
import Calender from "./components/Calender.jsx";
import AddEvent from "./components/AddEvent.jsx";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  return (
    <div>
      <AddEvent events={events} setEvents={setEvents} />
      <Calender events={events} setEvents={setEvents} />
    </div>
  );
}

export default App;
