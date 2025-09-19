import React, { useState, useEffect, useRef } from "react";

const GRID_SIZE = 15;
const GAME_GRID = Array.from({ length: GRID_SIZE }, () =>
  new Array(GRID_SIZE).fill("")
);
const generateFood = () => {
  return [
    Math.floor(Math.random() * GRID_SIZE),
    Math.floor(Math.random() * GRID_SIZE),
  ];
};

const INITIAL_SNAKE = [[5, 5]];

const Snake = () => {
  const [snakeBody, setSnakeBody] = useState(INITIAL_SNAKE);

  const directionRef = useRef([1, 0]);
  const foodRef = useRef(generateFood());

  useEffect(() => {
    console.log("use effect");
    const intervalId = setInterval(() => {
      setSnakeBody((prev) => {
        console.log("prev 1", prev);
        const newHead = [
          prev[0][0] + directionRef.current[0],
          prev[0][1] + directionRef.current[1],
        ];

        // Check collision with walls or self
        if (
          newHead[0] < 0 ||
          newHead[0] > GRID_SIZE - 1 ||
          newHead[1] < 0 ||
          newHead[1] > GRID_SIZE - 1 ||
          prev.some(([x, y]) => {
            return newHead[0] === x && newHead[1] === y;
          })
        ) {
          console.log("collision - resetting");
          foodRef.current = generateFood(); // Reset food position too
          return INITIAL_SNAKE;
        }

        // Create new snake body with new head
        const newSnakeBody = [newHead, ...prev];
        console.log("food intersection before", newHead, newSnakeBody);

        // Check if food is eaten
        const foodEaten =
          newHead[0] === foodRef.current[0] &&
          newHead[1] === foodRef.current[1];

        if (foodEaten) {
          console.log("food eaten! Snake growing", newSnakeBody);
          // Generate new food position that doesn't overlap with snake
          let newFood;
          do {
            newFood = generateFood();
          } while (
            newSnakeBody.some(([x, y]) => x === newFood[0] && y === newFood[1])
          );

          foodRef.current = newFood;
          // Don't pop - snake grows
        } else {
          // Remove tail if no food eaten
          newSnakeBody.pop();
        }

        console.log("newSnakeBody", newSnakeBody);
        return newSnakeBody;
      });
    }, 200); // Made it faster for better gameplay

    const handleDirection = (e) => {
      console.log(e.key);
      if (e.key === "ArrowUp" && directionRef.current[0] !== 1) {
        directionRef.current = [-1, 0];
      } else if (e.key === "ArrowDown" && directionRef.current[0] !== -1) {
        directionRef.current = [1, 0];
      } else if (e.key === "ArrowLeft" && directionRef.current[1] !== 1) {
        directionRef.current = [0, -1];
      } else if (e.key === "ArrowRight" && directionRef.current[1] !== -1) {
        directionRef.current = [0, 1];
      }
    };

    window.addEventListener("keydown", handleDirection);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", handleDirection);
    };
  }, []);

  const isSnakeBody = (xc, yc) => {
    return (
      snakeBody.findIndex((snake) => snake[0] === xc && snake[1] === yc) !== -1
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`,
        gap: "1px",
        backgroundColor: "#333",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      {GAME_GRID.map((row, rIndex) =>
        row.map((col, cIndex) => (
          <div
            key={`${rIndex}-${cIndex}`}
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: isSnakeBody(rIndex, cIndex)
                ? "#4ade80"
                : foodRef.current[0] === rIndex && foodRef.current[1] === cIndex
                ? "#ef4444"
                : "#1f2937",
              border: "1px solid #374151",
              borderRadius: "2px",
            }}
          />
        ))
      )}
      <div
        style={{
          gridColumn: `1 / ${GRID_SIZE + 1}`,
          textAlign: "center",
          color: "white",
          marginTop: "10px",
          fontFamily: "monospace",
        }}
      >
        Snake Length: {snakeBody.length} | Use Arrow Keys to Play
      </div>
    </div>
  );
};

export default Snake;
