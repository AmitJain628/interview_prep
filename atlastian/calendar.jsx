import React, { useState, useMemo } from "react";
import { startOfMonth, lastDayOfMonth, format } from "date-fns";
import { FaBackward, FaForward } from "react-icons/fa";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const eventColors = {
  meeting: { background: "#cce5ff", border: "2px solid #007bff" },
  holiday: { background: "#ffe5e5", border: "2px solid #ff4d4d" },
  reminder: { background: "#e5ffe5", border: "2px solid #28a745" },
};

const MonthWiseCalendar = ({ eventsMapper, month, year }) => {
  const today = new Date(year, month);
  const firstDateOfMonth = startOfMonth(today);
  const lastDateOfMonth = lastDayOfMonth(today).getDate();
  const firstDay = firstDateOfMonth.getDay();
  const netToday = new Date();

  const currentMonthMapper = useMemo(() => {
    const map = {};
    Object.keys(eventsMapper).forEach((key) => {
      const date = new Date(key);
      if (date.getMonth() === month && date.getFullYear() === year) {
        map[date.getDate()] = eventsMapper[key];
      }
    });
    return map;
  }, [eventsMapper, month, year]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        padding: "8px",
        gap: "4px",
      }}
    >
      {days.map((day, i) => (
        <div
          key={i}
          style={{
            textAlign: "center",
            border: "2px solid #ccc",
            padding: "12px",
            marginBottom: "8px",
            background: "#f3f3f3",
            fontWeight: "bold",
          }}
        >
          {day}
        </div>
      ))}

      {Array.from({ length: firstDay }).map((_, i) => (
        <div
          key={`empty-${i}`}
          style={{
            border: "2px solid #ccc",
            height: "120px",
            background: "#f9f9f9",
          }}
        ></div>
      ))}

      {Array.from({ length: lastDateOfMonth }).map((_, index) => (
        <div
          key={index}
          style={{
            border: "2px solid #ccc",
            height: "120px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {netToday.getDate() === index + 1 &&
            netToday.getMonth() === month &&
            netToday.getFullYear() === year && (
              <div
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  width: "12px",
                  height: "12px",
                  background: "green",
                  borderRadius: "50%",
                }}
              ></div>
            )}
          <div style={{ marginTop: "8px", fontWeight: "bold" }}>{index + 1}</div>
          {currentMonthMapper[index + 1] && (
            <div
              style={{
                margin: "8px",
                padding: "4px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "bold",
                textAlign: "center",
                width: "80%",
                color: "#333",
                ...(eventColors[currentMonthMapper[index + 1].identifier] || {}),
              }}
            >
              {currentMonthMapper[index + 1].title}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const EventCalendar = ({ events }) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const eventsMapper = useMemo(() => {
    const map = {};
    events.forEach((event) => {
      map[format(new Date(event.date), "yyyy-MM-dd")] = event;
    });
    return map;
  }, [events]);

  return (
    <div style={{ maxWidth: "900px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          justifyContent: "center",
          margin: "16px 0",
        }}
      >
        <button
          onClick={() => {
            if (month === 0) setYear(year - 1);
            setMonth((month + 11) % 12);
          }}
        >
          <FaBackward />
        </button>
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>Event Calendar</div>
        <button
          onClick={() => {
            if (month === 11) setYear(year + 1);
            setMonth((month + 1) % 12);
          }}
        >
          <FaForward />
        </button>
        <span style={{ fontSize: "14px", marginLeft: "8px" }}>
          {month + 1}/{year}
        </span>
      </div>

      <MonthWiseCalendar eventsMapper={eventsMapper} month={month} year={year} />
    </div>
  );
};
