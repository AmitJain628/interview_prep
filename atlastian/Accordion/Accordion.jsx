import React, { useId, useState } from "react";

const Accordion = ({ data }) => {
  const [expandedOnes, setExpanded] = useState(new Set());
  const accordionId = useId();

  const handleClick = (title) => {
    setExpanded((prev) => {
      const updatedSections = new Set(prev);
      updatedSections.has(title)
        ? updatedSections.delete(title)
        : updatedSections.add(title);

      return updatedSections;
    });
  };

  const handlKeyDown = (e) => {
    const key = e.code;
    console.log("key", key, document.activeElement.getAttribute("data-attr"));
    switch (key) {
      case "Enter":
        const title = document.activeElement.getAttribute("data-attr");
        handleClick(title);
        break;

      case "Tab":
        break;

      case "Space":
        break;

      default:
        break;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onKeyDown={handlKeyDown}
    >
      {data.map((el, index) => {
        const { title, content } = el;
        const isExanded = expandedOnes.has(title);
        return (
          <>
            <button
              key={index}
              aria-expanded={isExanded}
              data-attr={title}
              style={{
                height: "40px",
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#d3b784",
                padding: "5px 40px",
              }}
            >
              <span>{el.title}</span>
              <span
                style={{
                  cursor: "pointer",
                }}
                onClick={() => handleClick(title)}
              >
                {isExanded ? ">" : "^"}
              </span>
            </button>
            {isExanded ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  backgroundColor: "antiquewhite",
                }}
              >
                {el.content}
              </div>
            ) : null}
          </>
        );
      })}
    </div>
  );
};

export default Accordion;
