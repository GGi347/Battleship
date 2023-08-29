import Ships from "./Ships";

const ROW_NUM = 10;
const COL_NUM = 10;

function Cell({ ship, rowIndex, colIndex, board }) {
  if (board[rowIndex][colIndex] === "") return <span className="cell" />;

  const firstCellOfShipOrNot =
    (rowIndex > 0 && !isNaN(board[rowIndex - 1][colIndex])) ||
    (colIndex > 0 && !isNaN(board[rowIndex][colIndex - 1])) ||
    true;

  return (
    <span className="cell">
      {!isNaN(ship) && firstCellOfShipOrNot && <Ships numofTiles={1} />}
    </span>
  );
}

function GameRow({ rowIndex, board }) {
  return (
    <div className="game-row">
      {board[rowIndex].map((col, colIndex) => (
        <Cell
          key={`${rowIndex}${colIndex}`}
          ship={board[rowIndex][colIndex]}
          rowIndex={rowIndex}
          colIndex={colIndex}
          board={board}
        ></Cell>
      ))}
    </div>
  );
}

function Gameboard({ board }) {
  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <GameRow key={rowIndex} rowIndex={rowIndex} board={board} />
      ))}
    </div>
  );
}

export default Gameboard;
