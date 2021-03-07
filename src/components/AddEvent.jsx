import React, { useState } from "react";
import { SketchPicker } from "react-color";
import "../css/AddEvent.css";

export default function AddEvent({ events }) {
  const [color, setColor] = useState("#0000FF");
  const [showevent, setShowEvent] = useState("no");

  const triggerAddTripState = () => {
    if (showevent === "no") {
      setShowEvent("yes");
    } else {
      setShowEvent("no");
    }
  };

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  const addEvent = (e) => {
    e.preventDefault();
    const eventName = document.getElementById("eventName");
    const date = document.getElementById("date");
    if (eventName.value === "" || date.value === "") {
      console.log("Enter value");
    } else {
      const eventInfo = {
        eventName: eventName.value,
        date: date.value,
        color: color,
      };
      console.log(eventInfo);
      events.push(eventInfo);
      eventName.value = "";
      date.value = "";
    }
  };
  return (
    <div>
      <button onClick={triggerAddTripState}>+ Add Event</button>
      <div>
        {showevent === "yes" && (
          <form className="eventBody">
            <input id="eventName" type="text" placeholder="Enter the event" />
            <br />
            <input id="date" type="date" />
            <br />
            <label> Select a Color:</label>
            <SketchPicker
              color={color}
              onChangeComplete={handleChangeComplete}
            />
            <button onClick={addEvent}>Submit</button>
          </form>
        )}

        {showevent === "no" && ""}
      </div>
    </div>
  );
}
