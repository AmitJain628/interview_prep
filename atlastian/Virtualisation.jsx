// https://codesandbox.io/p/sandbox/xfkv68?file=%2Fpublic%2Fcomponents%2FListItems.js%3A9%2C1-10%2C1
import "./styles.css";
import { useState } from "react";

const NormalList = () => {
  return (
    <div
      style={{
        border: "1px solid black",
        marginTop: "50px",
        position: "relative",
        width: "500px",
      }}
    >
      <ul
        style={{
          position: "relative",
          width: "500px",
          height: `500px`,
          top: "-16px",
          left: "-40px",
          overflowY: "scroll",
        }}
      >
        {Array(1000)
          .fill("")
          .map((el, index) => (
            <li
              style={{
                heigh: "35px",
                top: `${(index + 0) * 35}px`,
                position: "absolute",
                color: "black",
                width: "500px",
                listStyle: "none",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
              key={index}
            >
              list item {index}
            </li>
          ))}
      </ul>
    </div>
  );
};

const VirtualList = () => {
  const itemHeight = 35;
  const items = 10;
  const totalHeight = 500;
  const [scrollTop, setScrollTop] = useState(0);
};

export default function App() {
  const [selectedOption, setSelectedOption] = useState(2);

  const handleChange = (e) => {
    setSelectedOption(parseInt(event.target.value));
  };

  return (
    <div className="App">
      <input
        type="radio"
        name="option"
        value="0"
        checked={selectedOption === 0}
        onChange={handleChange}
      />{" "}
      Virtual
      <input
        type="radio"
        name="option"
        value="1"
        checked={selectedOption === 1}
        onChange={handleChange}
      />{" "}
      Infinite
      <input
        type="radio"
        name="option"
        value="2"
        checked={selectedOption === 2}
        onChange={handleChange}
      />{" "}
      Normal
      {selectedOption === 2 && <NormalList />}
      {selectedOption === 0 && <VirtualList />}
    </div>
  );
}
