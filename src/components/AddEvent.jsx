import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "../css/AddEvent.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

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
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid spacing={3}>
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
