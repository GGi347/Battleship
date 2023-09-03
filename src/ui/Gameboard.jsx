import { DndProvider, useDrop } from "react-dnd";
import Ships from "./Ships";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemTypes } from "../features/util";
import { useGame } from "../contexts/GameContext";

function Cell({ rowIndex, colIndex, board, isOpponentBoard }) {
  const { handleCellClick } = useGame();
  const isHit = board[rowIndex][colIndex].isHit;
  const cellContent = board[rowIndex][colIndex].value;
  if (board[rowIndex][colIndex].value === "")
    return (
      <span
        onClick={
          !isOpponentBoard
            ? () => {
                handleCellClick(rowIndex, colIndex);
              }
            : () => {}
        }
        className={isHit ? "hit-cell cell" : "cell"}
      />
    );
  const firstCellOfShip =
    (rowIndex > 0 && !isNaN(board[rowIndex - 1][colIndex].value)) ||
    (colIndex > 0 && !isNaN(board[rowIndex][colIndex - 1].value)) ||
    true;

  return (
    <span
      onClick={
        !isOpponentBoard
          ? () => {
              handleCellClick(rowIndex, colIndex);
            }
          : () => {}
      }
    >
      {!isNaN(cellContent) && firstCellOfShip && (
        <Ships numOfTiles={1} isHit={isHit}>
          {isHit && <span>X</span>}
        </Ships>
      )}
    </span>
  );
}

function Gameboard({ isOpponentBoard = false }) {
  const { userBoard, opponentBoard } = useGame();
  const board = isOpponentBoard ? opponentBoard : userBoard;
  if (board.length === 0) {
    return <div>Loading</div>;
  }
  function renderSquare(i) {
    const colIndex = i % 10;
    const rowIndex = Math.floor(i / 10);

    return (
      <div key={i} className="cell">
        <Cell
          rowIndex={rowIndex}
          colIndex={colIndex}
          board={board}
          isOpponentBoard={isOpponentBoard}
        ></Cell>
      </div>
    );
  }
  const squares = [];
  for (let i = 0; i < 100; i += 1) {
    squares.push(renderSquare(i));
  }
  return <div className="game-board">{squares}</div>;
}

export default Gameboard;

// const [{ isOver }, drop] = useDrop(() => ({
//   accept: ItemTypes.SHIPS,
//   drop: (item) =>
//     handleDrop(rowIndex, colIndex, board, cellContent, setBoard, item),
//   collect: (monitor) => ({
//     isOver: !!monitor.isOver(),
//   }),
// }));
// if (board[rowIndex][colIndex] === "")
//   return <span className="cell" ref={drop} />;
// function handleDrop(rowIndex, colIndex, board, cellContent, setBoard, item) {
//   console.log("item ", item);
//   board[rowIndex][colIndex] = 2;
//   setBoard(board);
//   console.table(board);
// }
