/*
 .progress-container {
    background-color: rgb(233, 236, 239);
    border: 1px solid #c5c5c5;
    border-radius: 8px;
    height: 20px;
    overflow: hidden;
  }
  
  .progress {
    background-color: #0d6efd;
    color: #fff;
    height: 100%;
    overflow: hidden;
    text-align: center;
  }
*/

import { useState, useEffect } from "react";
const ProgressBar = ({ current, running, onCompleted }) => {
  const [prog, setProg] = useState(0);

  useEffect(() => {
  let interval;
  if (current === running) {
    interval = setInterval(() => {
      setProg((prev) => {
          if (prev >= 100) {
            onCompleted();
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        })
      }, 30);
    }

    return () => clearInterval(interval); // cleanup
  }, [running]);

  console.log("value", current, running, prog);
  return (
    <div className="progress-container">
      <div className="progress" style={{ width: `${prog}%` }}></div>
    </div>
  );
};

export default function App() {
  const [bars, setBars] = useState(0);
  const [running, setRunning] = useState(0);

  const onCompleted = () => setRunning(running + 1);

  console.log("bars", bars);
  return (
    <div>
      <button onClick={() => setBars(bars + 1)}>Add</button>
      {new Array(bars).fill(null).map((_, i) => (
        <ProgressBar
          key={i}
          running={running}
          onCompleted={onCompleted}
          current={i}
          value={10}
        />
      ))}
    </div>
  );
}
