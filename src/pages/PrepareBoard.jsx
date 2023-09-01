import { useEffect, useState } from "react";
import Gameboard from "../ui/Gameboard";
import Ships from "../ui/Ships";
import { getBoardWithShips } from "../features/board";
import { getShips } from "../features/ships";

function PrepareBoard() {
  //const [ships, setShips] = useState([]);
  const initialBoard = getBoardWithShips();
  const [board, setBoard] = useState(initialBoard);
  const [isRandomized, setIsRandmoized] = useState(false);

  useEffect(
    function () {
      const newBoard = getBoardWithShips();
      setBoard(newBoard);
      console.table(newBoard);
    },
    [isRandomized]
  );
  console.table(board);

  function handleRandomBtn() {
    setIsRandmoized(!isRandomized);
  }
  // console.log(board);
  return (
    <div>
      <Gameboard board={board} />
      {/* {ships.map((ship, index) => (
        <Ships key={index} numofTiles={ship} />
      ))} */}

      <button onClick={handleRandomBtn}>Randomize</button>
      <button>Reset</button>
      <button>Play</button>
    </div>
  );
}

export default PrepareBoard;
