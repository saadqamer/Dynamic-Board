import { useEffect, useState } from "react";
import "./App.css";

const KNIGHT_MOVES_OFFSETS = [
  [-2, -1], [-2, 1], // Two moves up, one left or right
  [2, -1], [2, 1],   // Two moves down, one left or right
  [1, -2], [1, 2],   // One move right, two up or down
  [-1, -2], [-1, 2]  // One move left, two up or down
];
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

  const getKnightMoves = (rowIndex, colIndex) => {
    const moves = [];
    for (const [dx, dy] of KNIGHT_MOVES_OFFSETS) {
      const newRow = rowIndex + dx;
      const newCol = colIndex + dy;
      // Check if the move is within bounds of the board
      if (newRow >= 0 && newRow < rowsInput && newCol >= 0 && newCol < colsInput) {
        moves.push(`${newRow}-${newCol}`);
      }
    }
    return moves;
  };

  const handleSquareClick = (rowIndex, colIndex) => {
    if (knightOption) {
      const knightMoves = getKnightMoves(rowIndex, colIndex);
      setHighlightedSquares(new Set(knightMoves));
    } else {
      const rowColPair = `${rowIndex}-${colIndex}`;
      let newHighlightedSqaures = new Set(highlightedSquares);      
      if (highlightedSquares.has(rowColPair)) {
        newHighlightedSqaures.delete(rowColPair);
      } else {
        newHighlightedSqaures.add(rowColPair);
      }
      setHighlightedSquares(newHighlightedSqaures)
    }
  };

  const onKnightsMovesClick = () => {
    setKnightOption(true);
  }

  const onResetPiece = () => {
    setKnightOption(false);
    setHighlightedSquares(new Set());
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
      {"Choose a chess piece then click on a square to see it's moves"}
      <button
        onClick={onKnightsMovesClick}>
        {"Knight"}
      </button>
    </div>
  );
};

export default App;
