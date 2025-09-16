import { useState, useEffect } from "react";
const ProgressBar = () => {
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProg((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval); // cleanup
  }, []);

  console.log("value", prog);
  return (
    <div className="progress-container">
      <div className="progress" style={{ width: `${prog}%` }}></div>
    </div>
  );
};

export default function App() {
  const [bars, setBars] = useState(0);

  console.log("bars", bars);
  return (
    <div>
      <button onClick={() => setBars(bars + 1)}>Add</button>
      {new Array(bars).fill(null).map((_, i) => (
        <ProgressBar key={i} value={10} />
      ))}
    </div>
  );
}
