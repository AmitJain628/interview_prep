import { useState } from "react";

export default function Carousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevHandler = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const nextHandler = () => {
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <button onClick={prevHandler}>Prev</button>
      <div
        style={{
          display: "flex",
          height: "400px",
        }}
      >
        {images.map((image, index) => (
          <img
            src={image}
            className={activeIndex === index ? "visible" : "hidden"}
          />
        ))}
      </div>
      <button onClick={nextHandler}>Next</button>
    </div>
  );
}
