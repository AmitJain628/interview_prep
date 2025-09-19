import React, { useState, useEffect } from "react";

const lights = {
  red: {
    duration: 4000,
    next: "green",
  },
  yellow: {
    duration: 500,
    next: "red",
  },
  green: {
    duration: 3000,
    next: "yellow",
  },
};

const colors = {
  red: "bg-red",
  yellow: "bg-yellow",
  green: "bg-green",
};

const Light = (props) => {
  const { light, currentLight } = props;
  console.log("light", light, currentLight);
  return (
    <div
      className={`light ${light === currentLight ? colors[currentLight] : ""}`}
    ></div>
  );
};

export default function TrafficLight() {
  const [currentLight, setCurrentLight] = useState("red");

  useEffect(() => {
    const { duration, next } = lights[currentLight];
    // console.log("duration", duration, next);
    const timerId = setTimeout(() => {
      setCurrentLight(next);
    }, duration);

    return () => clearTimeout(timerId);
  }, [currentLight]);

  return (
    <div className="light-container">
      {Object.keys(lights).map((light) => (
        <Light light={light} currentLight={currentLight} />
      ))}
    </div>
  );
}
