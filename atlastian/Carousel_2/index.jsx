import { useState, useRef, useEffect } from "react";

export default function Carousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const [transition, setTransition] = useState(false);
  const containerRef = useRef(null);

  const prevHandler = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setTransition(true);
  };

  const nextHandler = () => {
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setTransition(true);
  };

  const updatImageWidth = () => {
    if (containerRef.current) {
      console.log(
        "ref",
        containerRef.current.getBoundingClientRect()?.width ?? 0
      );
      setImageWidth(containerRef.current.getBoundingClientRect()?.width ?? 0);
    }
  };

  useEffect(() => {
    updatImageWidth();
    document.addEventListener("resize", updatImageWidth);

    return () => {
      document.removeEventListener("resize", updatImageWidth);
    };
  }, []);

  console.log("imageWidth", imageWidth, activeIndex);

  return (
    <div
      style={{
        height: "400px",
        width: "600px",
        overflow: "hidden",
        position: "relative",
      }}
      ref={containerRef}
    >
      <div
        style={{
          display: "flex",
          transform: imageWidth
            ? `translateX(-${activeIndex * imageWidth}px)`
            : undefined,
        }}
        className={`${transition ? "image-transition" : undefined}`}
        onTransitionEnd={() => setTransition(false)}
      >
        {images.map((image, index) => (
          <img src={image.src} alt={image.alt} className="image-element" />
        ))}
      </div>
      <button className="prev" onClick={prevHandler}>
        Prev
      </button>
      <button className="next" onClick={nextHandler}>
        Next
      </button>
    </div>
  );
}
