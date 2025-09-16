import "./styles.css";
import { useState, useEffect } from "react";
const CHART_DATA = [
  { id: "dep-1", name: "Legal", ticketCount: 32, colour: "#3F888F" },
  { id: "dep-2", name: "Sales", ticketCount: 20, colour: "#FFA420" },
  { id: "dep-3", name: "Engineering", ticketCount: 60, colour: "#2196F3" },
  { id: "dep-4", name: "Manufacturing", ticketCount: 5, colour: "#4CAF50" },
  { id: "dep-5", name: "Maintenance", ticketCount: 14, colour: "#607D8B" },
  {
    id: "dep-6",
    name: "Human Resourcing",
    ticketCount: 35,
    colour: "#1D1E33",
  },
  { id: "dep-7", name: "Events", ticketCount: 43, colour: "#E1CC4F" },
];

export default function App() {
  return (
    <div className="chart-container">
      <div className="chart">
        {CHART_DATA.map((chart) => (
          <div
            className="bar"
            style={{
              height: `${chart.ticketCount}%`,
              backgroundColor: `${chart.colour}`,
              color: `${chart.colour}%`,
            }}
          ></div>
        ))}
      </div>
      <span className="y-axis">Number of tickets</span>
      <span className="x-axis">Departments</span>
    </div>
  );
}


.App {
    font-family: sans-serif;
    text-align: center;
  }
  
  .chart {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-right: 0;
    border-top: 0;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: flex-end;
  }
  
  .y-axis {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateX(-50%) translateY(-50%) rotate(-90deg);
  }
  
  .x-axis {
    position: absolute;
    left: 50%;
  }
  
  .chart-container {
    width: 400px;
    height: 400px;
    position: relative;
    padding: 14px;
  }
  
  .bar {
    flex: 1;
    height: 100%;
  }
  