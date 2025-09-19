import React, { useState, useMemo } from "react";
import { startOfMonth, lastDayOfMonth, format } from "date-fns";
import { FaBackward, FaForward } from "react-icons/fa";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
    <div className="grid grid-cols-7 p-2">
      {days.map((day) => (
        <div className="flex justify-center border-2 border-gray-300 py-4 mb-2">{day}</div>
      ))}

      {Array.from({ length: firstDay }).map((_, i) => (
        <div key={`empty-${i}`} className="border-2 border-gray w-full h-28"></div>
      ))}

      {Array.from({ length: lastDateOfMonth }).map((_, index) => (
        <div key={index} className="border-2 border-gray flex flex-col items-center w-full h-28">
          {netToday.getDate() === index + 1 &&
            netToday.getMonth() === month &&
            netToday.getFullYear() === year && (
              <div className="w-full flex justify-end">
                <div className="w-4 h-4 bg-green-800 rounded-full"></div>
              </div>
            )}
          <div className="flex justify-center items-center h-32">
            {index + 1}
          </div>
          {currentMonthMapper[index + 1] && (
            <div
              className={`m-2 h-32 text-sm rounded-sm border-4 border-transparent font-bold ml-2 bg-${currentMonthMapper[index + 1].identifier}-200 flex items-center justify-center`}
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
    <div className="mx-auto">
      <div className="flex gap-x-4 items-center justify-center mb-4 mt-4">
        <button
          onClick={() => {
            if (month === 0) setYear(year - 1);
            setMonth((month + 11) % 12);
          }}
        >
          <FaBackward />
        </button>
        <div className="font-bold">Event Calendar</div>
        <button
          onClick={() => {
            if (month === 11) setYear(year + 1);
            setMonth((month + 1) % 12);
          }}
        >
          <FaForward />
        </button>
        <span>
          {month + 1}/{year}
        </span>
      </div>

      <MonthWiseCalendar eventsMapper={eventsMapper} month={month} year={year} />
    </div>
  );
};
