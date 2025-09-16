import "./styles.css";
import React, { useState } from "react";
const Stars = ({ filled, half, onClick, onMouseMove }) => {
  let starChar = "☆";
  if (filled) starChar = "★";
  else if (half) starChar = "⯨";

  return (
    <div
      style={{
        marginRight: "5px",
        color: "#bfbf71",
        cursor: "pointer",
      }}
      onMouseEnter={onMouseMove}
      onClick={onClick}
    >
      {starChar}
    </div>
  );
};

export default function App() {
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (e, index) => {
    const isHalf = e.nativeEvent.offsetX < e.target.offsetWidth / 2;
    setRating(isHalf ? index + 0.5 : index + 1);
  };

  console.log("rating", rating);

  const getStarStatus = (index, rate) => {
    let filled = false;
    let half = false;

    if (index + 1 <= rate) {
      return { filled: true, half: false };
    } else if (index + 0.5 === rate) {
      return { filled: false, half: true };
    }

    return {
      filled: false,
      half: false,
    };
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {[1, 2, 3, 4, 5].map((el, index) => {
        const rate = rating || hoverRating;
        const { filled, half } = getStarStatus(index, rate);
        return (
          <Stars
            filled={filled}
            half={half}
            onClick={(e) => handleClick(e, index)}
            onMouseMove={(e) => {
              const isHalf = e.nativeEvent.offsetX < e.target.offsetWidth / 2;
              setHoverRating(isHalf ? index + 0.5 : index + 1);
            }}
            onMouseLeave={() => setHoverRating(0)}
          />
        );
      })}
    </div>
  );
}
