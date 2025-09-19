import { useEffect, useRef, useState } from "react";

const Virtual = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const CONT_HEIGHT = 500;
  const ITEM_HEIGHT = 35;
  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - 10);
  const endIndex = Math.min(
    1000,
    Math.floor((scrollTop + CONT_HEIGHT) / ITEM_HEIGHT) + 10
  );

  return (
    <div className="container">
      <div
        className="list-container"
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      >
        {Array(endIndex - startIndex + 1)
          .fill()
          .map((el, index) => (
            <div
              className="item"
              style={{
                top: `${(index + startIndex) * ITEM_HEIGHT}px`,
              }}
            >
              list item{index + startIndex}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Virtual;


import { useState } from "react";

const itemHeight = 35;
const windowHeight = 500;
const overscan = 10;

const ListItems = ({ startIndex, endIndex }) => {
  return new Array(endIndex - startIndex + 1).fill(0).map((_, index) => {
    return (
      <div
        style={{
          height: `${itemHeight}px`,
          backgroundColor:
            (index + startIndex) % 2 === 0 ? "lightgray" : "white",
          color: "black",
          width: "500px",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
        key={index}
      >
        List Item number - {index + startIndex}
      </div>
    );
  });
};

const OptimisedVirtualisedList = ({ numberOfItems }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const renderedNodes = Math.min(
    numberOfItems - startIndex,
    Math.floor(windowHeight / itemHeight) + 2 * overscan
  );
  console.log(scrollTop, startIndex, renderedNodes);
  return (
    <div
      style={{
        border: "1px solid black",
        marginTop: "50px",
        width: "500px",
        overflowY: "scroll",
        height: `${windowHeight}px`,
      }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div
        style={{
          height: `${numberOfItems * itemHeight}px`,
        }}
      >
        <div
          style={{
            transform: `translateY(${startIndex * itemHeight}px)`,
          }}
        >
          <ListItems
            startIndex={startIndex}
            endIndex={startIndex + renderedNodes}
          />
        </div>
      </div>
    </div>
  );
};
