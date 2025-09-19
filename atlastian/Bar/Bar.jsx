import React, { useMemo } from "react";
import { CHART_DATA } from "./data";

const BarItem = ({ color, height, ticketCount }) => {
  return (
    <div
      className="bar"
      style={{
        backgroundColor: color,
        height: `${height}%`,
      }}
    >
      <div className="tooltip">{ticketCount}</div>
    </div>
  );
};

export default function Bar() {
  const maxHeight = useMemo(() => {
    return Math.max(...CHART_DATA.map((chart) => chart.ticketCount));
  }, [CHART_DATA]);

  console.log("maxHeight", maxHeight);
  return (
    <>
      <div className="bar-container">
        {CHART_DATA.map((chart) => {
          const height = (chart.ticketCount / maxHeight) * 100;
          return (
            <BarItem
              ticketCount={chart.ticketCount}
              height={height}
              color={chart.colour}
            />
          );
        })}
        <div className="x-axis">Departments</div>
        <div className="y-axis">Number of tickets</div>
      </div>
    </>
  );
}
