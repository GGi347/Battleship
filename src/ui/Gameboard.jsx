import { DndProvider, useDrop } from "react-dnd";
import Ships from "./Ships";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemTypes } from "../features/util";

const ROW_NUM = 10;
const COL_NUM = 10;

function Cell({
  cellContent,
  rowIndex,
  colIndex,
  board,
  setBoard,
  isComputerBoard,
}) {
  if (board[rowIndex][colIndex] === "") return <span className="cell" />;
  const firstCellOfShip =
    (rowIndex > 0 && !isNaN(board[rowIndex - 1][colIndex])) ||
    (colIndex > 0 && !isNaN(board[rowIndex][colIndex - 1])) ||
    true;

  return (
    <span
      className="cell"
      onClick={() => console.log(board[rowIndex][colIndex])}
    >
      {!isNaN(cellContent) && firstCellOfShip && <Ships numofTiles={1} />}
    </span>
  );
}
function handleDrop(rowIndex, colIndex, board, cellContent, setBoard, item) {
  console.log("item ", item);
  board[rowIndex][colIndex] = 2;
  setBoard(board);
  console.table(board);
}

function Gameboard({ board, setBoard, isComputerBoard = false }) {
  if (board.length === 0) {
    return <div>Loading</div>;
  }
  function renderSquare(i) {
    const colIndex = i % 10;
    const rowIndex = Math.floor(i / 10);

    return (
      <div key={i} className="cell">
        <Cell
          cellContent={board[rowIndex][colIndex]}
          rowIndex={rowIndex}
          colIndex={colIndex}
          board={board}
          setBoard={setBoard}
          isComputerBoard={isComputerBoard}
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
