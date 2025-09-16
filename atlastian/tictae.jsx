import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const N = 3;
  const [board, setBoard] = useState([]);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  const changePlayer = () => {
    setPlayer((prev) => (prev === "X" ? "O" : "X"));
  };

  useEffect(() => {
    setBoard(
      Array(N)
        .fill(null)
        .map(() => Array(N).fill(""))
    );
  }, []);

  const checkWinner = (newBoard) => {
    console.log("check winner", newBoard);
    // check rows
    for (let i = 0; i < 3; i++) {
      if (
        newBoard[i][0] &&
        newBoard[i].every((row) => row === newBoard[i][0])
      ) {
        setWinner(newBoard[i][0]);
        return;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        newBoard[0][i] &&
        newBoard.every((row) => {
          return row[0] === newBoard[0][i];
        })
      ) {
        setWinner(newBoard[0][i]);
        return;
      }
    }

    if (
      newBoard[0][0] &&
      newBoard.every((row, idx) => {
        console.log("diagonal 1", row, idx);
        return newBoard[0][0] === row[idx];
      })
    ) {
      console.log("calling here");
      setWinner(newBoard[0][0]);
      return;
    }

    if (
      newBoard[0][N - 1] &&
      newBoard.every((row, idx) => {
        console.log("diagonal 1", row, idx);
        return newBoard[0][N - 1] === row[N - idx - 1];
      })
    ) {
      console.log("calling here");
      setWinner(newBoard[0][N - 1]);
      return;
    }
  };

  const handleClick = (row, col) => {
    console.log("click", row, col);
    if (board[row][col] !== "" || winner) return;
    const newBoard = [...board];
    newBoard[row] = [...newBoard[row]];
    newBoard[row][col] = player;
    console.log("newBoard", newBoard);
    checkWinner(newBoard);
    setBoard(newBoard);
    changePlayer();
  };

  return (
    <div>
      <span>Current player {player}</span>
      {board.length !== 0 &&
        board.map((row, rIndex) => (
          <div className="grid" key={rIndex}>
            {Array.isArray(row) &&
              row.length !== 0 &&
              row.map((col, cIndex) => (
                <div
                  key={cIndex}
                  onClick={() => handleClick(rIndex, cIndex)}
                  className="cell"
                >
                  {col}
                </div>
              ))}
          </div>
        ))}
      <span>Winner {winner}</span>
    </div>
  );
}
