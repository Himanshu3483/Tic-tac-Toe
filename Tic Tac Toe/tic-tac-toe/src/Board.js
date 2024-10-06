import React, { useState } from "react";
import "./Board.css";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null)); // Array to store the square states (X, O, or null)
  const [isXNext, setIsXNext] = useState(true); // State to track whose turn it is (X or O)
  const [winner, setWinner] = useState(null); // State to track the winner
  const [draw, setDraw] = useState(false); // State to track if the game is a draw
  const [score, setScore] = useState({ X: 0, O: 0 }); // State to track scores

  // Winning combinations for Tic Tac Toe
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Function to calculate the winner based on the current state of squares
  const calculateWinner = (squares) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; // Return the winning symbol (X or O)
      }
    }
    return null; // Return null if there is no winner
  };

  // Function to handle a square click
  const handleClick = (index) => {
    // Prevent updating the square if it's already filled or if there is a winner
    if (squares[index] || winner) return;

    const newSquares = squares.slice(); // Create a copy of the squares array
    newSquares[index] = isXNext ? "X" : "O"; // Set the clicked square to X or O
    setSquares(newSquares); // Update squares state

    // Add filled class for animation
    document.getElementsByClassName("square")[index].classList.add("filled");

    const currentWinner = calculateWinner(newSquares); // Check for a winner
    setWinner(currentWinner); // Update winner state

    // Update score if there is a winner
    if (currentWinner) {
      setScore((prevScore) => ({
        ...prevScore,
        [currentWinner]: prevScore[currentWinner] + 1, // Increment winner's score
      }));
    }

    // Check for a draw if no winner and all squares are filled
    if (newSquares.every((square) => square !== null) && !currentWinner) {
      setDraw(true);
    }

    setIsXNext(!isXNext); // Switch turns
  };

  // Function to handle the game reset
  const handleReset = () => {
    setSquares(Array(9).fill(null)); // Reset squares to null
    setIsXNext(true); // Reset to X's turn
    setWinner(null); // Reset winner
    setDraw(false); // Reset draw state
  };

  // Function to render each square
  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {squares[index]} {/* Display X or O */}
      </button>
    );
  };

  return (
    <div className="board-container">
      <div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      {winner && <div className="status">Winner: {winner}</div>}
      {draw && !winner && <div className="status">It's a Draw!</div>}
      <button className="reset-button" onClick={handleReset}>
        Reset Game
      </button>
      <div className="scoreboard">
        <h3>Score</h3>
        <p>
          X: {score.X} | O: {score.O}
        </p>
      </div>
    </div>
  );
}

export default Board;
