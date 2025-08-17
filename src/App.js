import { useEffect, useState } from "react";
import "./App.css";

export const App = () => {
  const [board, setBoard] = useState([]);
  const [rowsInput, setRowsInput] = useState(8);
  const [colsInput, setColsInput] = useState(8);
  const [highlightedSquares, setHighlightedSquares] = useState(new Set()); 
  const [knightOption, setKnightOption] = useState(false);

  // set the board on mount
  useEffect(() => {
    const newBoard = [];
    for (let i = 0; i < rowsInput; i++) {
      const boardRows = Array.from({ length: colsInput });
      newBoard.push(boardRows);
    }
    setBoard(newBoard);
  }, [rowsInput, colsInput]);

  const onRowsInputChange = (e) => {
    setRowsInput(e.target.value);
  };

  const onColsInputChange = (e) => {
    setColsInput(e.target.value);
  };

  const onResetBoard = () => {
    setRowsInput(8);
    setColsInput(8);
  };

  const onResetHighlightedSquares = () => {
      setHighlightedSquares(new Set());
  }

  const handleSquareClick = (rowIndex, colIndex) => {
    const rowColPair = `${rowIndex}-${colIndex}`;
    let newHighlightedSqaures = new Set(highlightedSquares);
    if (highlightedSquares.has(rowColPair)) {
      newHighlightedSqaures.delete(rowColPair);
    } else {
      newHighlightedSqaures.add(rowColPair);
    }
    setHighlightedSquares(newHighlightedSqaures)
  };

  const onKnightsMovesClick = () => {
    setKnightOption(true);
  }

  const onResetPiece = () => {
    setKnightOption(false);
  }


  return (
    <div className="board-container">
      {board.map((row, rowIndex) => {
        return (
          <div className="board-row" key={rowIndex}>
            {row.map((_, colIndex) => {
              const isHighlighted = highlightedSquares.has(`${rowIndex}-${colIndex}`);
              return (
                <div
                  key={colIndex}
                  className={`board-square ${
                    (rowIndex + colIndex) % 2 === 0 ? "black" : "white"
                  }-square ${isHighlighted ? "highlighted-square" : ""}`} 
                  onClick={() => handleSquareClick(rowIndex, colIndex)} 
                />
              );
            })}
          </div>
        );
      })}
      <div className="controls-container">
        <label>
          {"Rows:"}
          <input
            type="number"
            placeholder="Add rows"
            value={rowsInput}
            min={0}
            onChange={onRowsInputChange}
          />
        </label>
        <label>
          {"Columns:"}
          <input
            type="number"
            placeholder="Add Columns"
            value={colsInput}
            min={0}
            onChange={onColsInputChange}
          />
        </label>
      </div>
      <div className="reset-container">
        <button onClick={onResetBoard}>{"Reset Board"}</button>
        <button onClick={onResetHighlightedSquares}>{"Reset Highlighted Squares"}</button>
        <button onClick={onResetPiece}>
          {"Reset Piece"}
        </button>
      </div>
      {"Shortest Path from Point A to B with:"}
      <button
        onClick={onKnightsMovesClick}>
        {"Knight"}
      </button>
    </div>
  );
};

export default App;
