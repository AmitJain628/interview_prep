import React, { useState, useEffect, useCallback } from "react";

function Color({ color, isBlink, handleLightClick, index }) {
  return (
    <span
      style={{
        width: "100px", // Makes the element 500px wide
        height: "100px", // Makes the element 500px tall
        borderRadius: "100%", // Makes it a perfect circle (since width = height)
        color: color, // Sets the text/icon color (usually for inner content)
        backgroundColor: color, // Sets the background color (same as `color`)
        marginRight: "20px",
        border: isBlink ? "5px solid black" : null,
      }}
      onClick={() => handleLightClick(index)}
    ></span>
  );
}

export default function App() {
  const [code, setCode] = useState(`function Test () { return "hello"}`);
  const [level, setLevel] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showSequence, setShowSequence] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [gameSequence, setGameSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [blink, setSelectedBlink] = useState(null);

  const [colors] = useState(["red", "green", "blue", "orange", "purple"]);

  const displaySequence = useCallback(async () => {
    setShowSequence(true);
    for (let i = 0; i < gameSequence.length; i++) {
      const colorIndex = gameSequence[i];
      await delay(600);
      setSelectedBlink(colorIndex);
      await delay(300);
      setSelectedBlink(null);
    }
    setShowSequence(false);
  }, [gameSequence]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const addSequence = useCallback(() => {
    let number = Math.floor(Math.random() * colors.length);
    setGameSequence((prevSequence) => [...prevSequence, number]);
  }, []);

  const startGame = useCallback(() => {
    setGameSequence([]);
    setPlayerSequence([]);
    setLevel(0);
    setGameOver(false);
    addSequence();
  }, [addSequence]);

  const handleLightClick = (index) => {
    if (showSequence || gameOver) return;

    setSelectedBlink(index);
    setTimeout(() => setSelectedBlink(null), 300);

    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);

    // Check if player's click is wrong
    if (
      newPlayerSequence[newPlayerSequence.length - 1] !==
      gameSequence[newPlayerSequence.length - 1]
    ) {
      setGameOver(true);
      if (level > highScore) {
        setHighScore(level);
      }
      return;
    }

    // If correct and full sequence entered
    if (newPlayerSequence.length === gameSequence.length) {
      const newLevel = level + 1;
      setLevel(newLevel);
      setPlayerSequence([]);
      setTimeout(() => {
        addSequence();
      }, 1000);
    }
  };

  useEffect(() => {
    if (gameSequence.length > 0) {
      displaySequence();
    }
  }, [gameSequence, displaySequence]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "30%",
        }}
      >
        {colors.map((color, index) => (
          <Color
            key={index}
            color={color}
            isBlink={blink === index}
            index={index}
            handleLightClick={handleLightClick}
          />
        ))}
      </div>
      <button
        style={{
          color: "white",
          backgroundColor: "blue",
          width: "100px",
          padding: "10px",
        }}
        onClick={startGame}
      >
        {gameOver ? "Start Game" : "Play again"}
      </button>
      <div>
        <span>Level: {level}</span>
        <span>High Score: {highScore}</span>
      </div>
    </div>
  );
}
