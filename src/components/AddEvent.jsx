import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "../css/AddEvent.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function AddEvent({ events, setEvents }) {
  const [color, setColor] = useState("#0000FF");
  const [showevent, setShowEvent] = useState("no");

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem("events")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

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
        id: Date.now(),
        eventName: eventName.value,
        date: date.value,
        color: color,
      };
      setEvents((oldArray) => [...oldArray, eventInfo]);
      eventName.value = "";
      date.value = "";
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid>
        <Grid item md={2} lg={4}></Grid>
        <Grid item md={10} lg={4}>
          <div>
            <button className="trigger-button" onClick={triggerAddTripState}>
              + Add Event
            </button>
            <div>
              {showevent === "yes" && (
                <form className="eventBody">
                  <input
                    id="eventName"
                    type="text"
                    placeholder="Enter the event"
                  />
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
        </Grid>
        <Grid item md={2} lg={4}></Grid>
      </Grid>
    </div>
  );
}
