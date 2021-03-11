import React, { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns";
import "../css/Calender.css";

export default function Calender({ events, setEvents }) {
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const [currentMonthValue, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonthValue, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonthValue, 1));
  };

  const removeEvent = (deleteId) => {
    events = events.filter((e) => e.id !== deleteId);
    setEvents(events);
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonthValue, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "dddd";
    const days = [];

    let startDate = startOfWeek(currentMonthValue);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const currentMonth = currentMonthValue;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const ComparisonDate = new Date(day).setHours(0, 0, 0, 0);
        const eventsOnDay = events.filter(
          (e) => e.dateValue === ComparisonDate
        );
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart) ? "disabled" : ""
            }`}
            key={day}
          >
            <span className="number">{formattedDate}</span>
            {eventsOnDay.map((e) => (
              <div key={e.id}>
                <span
                  className="eventsPart"
                  style={{ backgroundColor: e.color, color: "white" }}
                >
                  {e.eventName}
                </span>
                <span
                  className="deleteButton"
                  style={{ backgroundColor: e.color, color: "white" }}
                  onClick={() => removeEvent(e.id)}
                >
                  X
                </span>
              </div>
            ))}
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
