import { DndProvider, useDrop } from "react-dnd";
import Ships from "./Ships";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemTypes } from "../features/util";

const ROW_NUM = 10;
const COL_NUM = 10;

function Cell({ cellContent, rowIndex, colIndex, board, setBoard }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.SHIPS,
    drop: (item) =>
      handleDrop(rowIndex, colIndex, board, cellContent, setBoard, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  if (board[rowIndex][colIndex] === "")
    return <span className="cell" ref={drop} />;

  const firstCellOfShip =
    (rowIndex > 0 && !isNaN(board[rowIndex - 1][colIndex])) ||
    (colIndex > 0 && !isNaN(board[rowIndex][colIndex - 1])) ||
    true;

  return (
    <span className="cell" ref={drop}>
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
function GameRow({ rowIndex, board, setBoard }) {
  return (
    <div className="game-row">
      {board[rowIndex].map((col, colIndex) => (
        <Cell
          key={`${rowIndex}${colIndex}`}
          cellContent={board[rowIndex][colIndex]}
          rowIndex={rowIndex}
          colIndex={colIndex}
          board={board}
          setBoard={setBoard}
        ></Cell>

        // <BoardSquare
        //   key={`${rowIndex}${colIndex}`}
        //   cellContent={board[rowIndex][colIndex]}
        //   rowIndex={rowIndex}
        //   colIndex={colIndex}
        //   board={board}

        // ></BoardSquare>
      ))}
    </div>
  );
}

// function BoardSquare({ cellContent, rowIndex, colIndex, board, setBoard }) {

//   return (
//     <div className="cell" ref={drop}>
//       <Cell
//         cellContent={board[rowIndex][colIndex]}
//         rowIndex={rowIndex}
//         colIndex={colIndex}
//         board={board}
//       ></Cell>
//     </div>
//   );
// }

function Gameboard({ board, setBoard }) {
  console.log("gameboard");
  console.table(board);
  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <GameRow
          key={rowIndex}
          rowIndex={rowIndex}
          board={board}
          setBoard={setBoard}
        />
      ))}
    </div>
  );
}

export default Gameboard;
