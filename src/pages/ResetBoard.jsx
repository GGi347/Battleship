import { useState } from "react";
import { getBoard } from "../features/board";
import Gameboard from "../ui/Gameboard";
import { getShips } from "../features/ships";
import Ships from "../ui/Ships";

function ResetBoard() {
  const initialBoard = getBoard();
  const [board, setBoard] = useState(initialBoard);
  const ships = getShips();

  return (
    <div>
      <Gameboard board={board} setBoard={setBoard} />
      {ships.map((ship, index) => (
        <Ships key={index} numofTiles={ship.numOfTiles} />
      ))}

      <button>Play</button>
    </div>
  );
}

export default ResetBoard;
