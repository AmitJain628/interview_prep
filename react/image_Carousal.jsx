import { useState, useEffect, useRef } from "react";

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const [active, setActive] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const len = images.length;
  const ref = useRef<HTMLDivElement | null>(null);

  const updateImageWidth = () => {
    setImageWidth(ref?.current?.getBoundingClientRect()?.width ?? 0);
  };

  useEffect(() => {
    updateImageWidth();
    document.addEventListener("resize", updateImageWidth);

    return () => {
      document.removeEventListener("resize", updateImageWidth);
    };
  }, [updateImageWidth]);

  const next = () => {
    setActive(active < len - 1 ? active + 1 : 0);
    setIsTransitioning(true);
  };

  const prev = () => {
    setActive(active > 0 ? active - 1 : len - 1);
    setIsTransitioning(true);
  };

  // {images.map(({ alt, src }) => (
  //   <img key={src} alt={alt} src={src} width="100%" />
  // ))}
  return (
    <div className="container" ref={ref}>
      <div
        className={`carousal-row ${isTransitioning ? "carousel-transition" : ""}`}
        style={{
          transform: imageWidth
            ? `translateX(-${active * imageWidth}px)`
            : undefined,
        }}
        onTransitionEnd={() => setIsTransitioning(false)}
      >
        {images.map((image) => (
          <>
            <img
              key={image.src}
              alt={image.alt}
              src={image.src}
              className="image-carousal"
              width="100%"
            />
          </>
        ))}
      </div>
      <button className="prev" disabled={isTransitioning} onClick={prev}>
        {"<"}
      </button>
      <div className="carousel__pages">
        {images.map(({ src, alt }, index) => (
          <button
            disabled={isTransitioning}
            className={`button-selector ${index === active ? "active" : ""}`}
            onClick={() => {
              setActive(index);
            }}
          ></button>
        ))}
      </div>
      <button disabled={isTransitioning} className="next" onClick={next}>
        {">"}
      </button>
    </div>
  );
}

/*
body {
  font-family: sans-serif;
}

.container {
  position: relative;
  height: 400px;
  width: 100%;
  background-color: black;
}

.carousal-row {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.carousel-transition {
  transition: transform 0.5s linear;
}

.image-carousal {
  height: 100%;
}

.button-selector {
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: gray;
  margin: 2px;
}

.next {
  position: absolute;
  top: 50%;
  right: 10px;

  font-size: 20px;
  height: 40px;
  width: 40px;

  background-color: #0008;
  border-radius: 100%;
  border: none;
  color: #fff;
  cursor: pointer;
}

.prev {
  position: absolute;
  top: 50%;
  left: 10px;
  font-size: 20px;
  height: 40px;
  width: 40px;

  background-color: #0008;
  border-radius: 100%;
  border: none;
  color: #fff;
  cursor: pointer;
}

.carousel__pages {
  position: absolute;
  bottom: 5%;
  left: 30%;
}

.active {
  background-color: white;
}

*/