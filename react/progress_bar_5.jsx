import { useState, useEffect, useRef } from "react";

const ProgressBar = ({ id, progress }) => {
  console.log("value", progress);
  return (
    <div className="progress-container">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default function App() {
  const [bars, setBars] = useState([]);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef({});

  useEffect(() => {
    if (running) {
      onStartFilling();
    } else {
      stopFilling();
    }
  }, [running]);

  useEffect(() => {
    if (!running) return;

    const filledIds = bars.filter(b => b.progress >= 100).map(b => b.id);
    console.log("filledIds", filledIds)
    filledIds.forEach(id => {
      console.log("id", id, intervalRef.current[id]);
      if (intervalRef.current[id]) {
        clearInterval(intervalRef.current[id]);
        delete intervalRef.current[id];
      }
    });

    const activeCount = Object.keys(intervalRef.current).length;
    if (activeCount < 3) onStartFilling();
    console.log("active", activeCount, intervalRef.current)
  }, [bars, running]);


  const onCompleted = () => setRunning(running + 1);

  const onStartFilling = () => {
    if (!running) return;
    bars.forEach((bar) => {
      if (bar.progress >= 100 || intervalRef.current[bar.id]) return;
      let count = Object.keys(intervalRef.current).length;
      if (count >= 3) return;
      intervalRef.current[bar.id] = setInterval(() => {
        setBars((prev) =>
          prev.map((curr) => {
            if (curr.id == bar.id) {
              return {
                id: bar.id,
                progress: curr.progress >= 100 ? 100 : curr.progress + 10,
              };
            } else {
              return curr;
            }
          }),
        );
      }, 30);
    });
  };

  const stopFilling = () => {
    Object.values(intervalRef.current).forEach((el) => clearInterval(el));
    intervalRef.current = {};
  };

  const handleReset = () => {
    setRunning(false);
    setBars([]);
  };

  const handleAdd = () => {
    let id = Date.now();
    setBars([...bars, { id, progress: 0 }]);
  };

  const handleToggle = () => {
    setRunning(!running);
  };

  console.log("bars", bars, running);
  return (
    <div>
      <div>
        <div className="buttons">
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleToggle}>{!running ? "Start" : "Pause"}</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
      {bars.map((bar, i) => (
        <ProgressBar key={bar.id} id={bar.id} progress={bar.progress} />
      ))}
    </div>
  );
}
