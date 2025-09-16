import { useState, useEffect } from "react";

const ProgressBar = ({ current, running, onCompleted, isWaiting }) => {
  const [prog, setProg] = useState(0);

  useEffect(() => {
    if (isWaiting) return;
    let interval;
      interval = setInterval(() => {
        setProg((prev) => {
          if (prev >= 100) {
            onCompleted();
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 30);

    return () => clearInterval(interval); // cleanup
  }, [isWaiting]);

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


  console.log("bars", bars);
  return (
    <div>
      <button onClick={() => setBars(bars + 1)}>Add</button>
      {new Array(bars).fill(null).map((_, i) => (
        <ProgressBar
          key={i}
          running={running}
          onCompleted={() => setRunning(c => c+1)}
          isWaiting={i >= running + 3}
          current={i}
          value={10}
        />
      ))}
    </div>
  );
}
