import { useState, useEffect } from "react";

function Hand({ height = 1, width = 1, angle }) {
  return (
    <div
      aria-hidden={true}
      className="clock-hand"
      style={{
        transform: `rotate(${angle}deg) scaleY(${height}) scaleX(${width})`,
      }}
    />
  );
}

export default function Clock() {
  let date = useCurrentDate();
  let hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const secondsPercentage = seconds / 60;
  // To have second-level precision in the minute hand angle.
  const minutesPercentage = (minutes + secondsPercentage) / 60;
  // To have minute-level precision in the hour hand angle.
  const hoursPercentage = ((hours % 12) + minutesPercentage) / 12;

  const hourAngle = hoursPercentage * 360;
  const minutesAngle = minutesPercentage * 360;
  const secondsAngle = secondsPercentage * 360;

  return (
    <div
      className="clock"
      style={{
        "--size": `${300}px`,
      }}
    >
      {" "}
      <Hand height={0.5} angle={hourAngle} width={3} />
      <Hand height={0.9} angle={minutesAngle} width={2} />
      <Hand height={0.8} angle={secondsAngle} />
    </div>
  );
}

function useCurrentDate() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let intervalId = setInterval(() => {
      setDate(new Date());
    }, 30);
    return () => clearInterval(intervalId);
  }, []);

  return date;
}



/*
body {
  font-family: sans-serif;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.clock {
  display: block;
  flex-shrink: 0;
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 100%;
  border: 2px solid #ccc;
  transform: rotate(180deg);
}

.clock-hand {
  background-color: #ccc;
  position: absolute;
  width: 1px;
  height: calc(var(--size) / 2);
  left: calc(var(--size) / 2);
  top: calc(var(--size) / 2);
  transform-origin: top center;
}
*/