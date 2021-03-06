import React from "react";

export default function AddEvent() {
  const addEvent = () => {
    console.log("Hello");
  };
  return (
    <div>
      <button onClick={addEvent}>+ Add Event</button>
    </div>
  );
}
