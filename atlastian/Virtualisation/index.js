import "./styles.css";
import Options from "./Options";
import Normal from "./Normal";
import { useState } from "react";
import Virtual from "./Virtual";

export default function App() {
  const [selected, setSelected] = useState(1);
  return (
    <div className="App">
      <Options selected={selected} setSelected={setSelected} />
      {selected === 0 ? <Normal /> : null}
      {selected === 1 ? <Virtual /> : null}
    </div>
  );
}
