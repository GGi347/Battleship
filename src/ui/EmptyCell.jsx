import { useGame } from "../contexts/GameContext";
import GameShips from "./GameShips";

export default function EmptyCell({
  rowIndex,
  colIndex,
  board,
  isOpponentBoard,
}) {
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
      >
        {isHit ? (
          <div className="hit-cell empty-cell">
            <div>&bull;</div>
          </div>
        ) : (
          <div className="empty-cell" />
        )}
      </span>
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
        <GameShips numOfTiles={1} isHit={isHit}>
          {isHit && <div>&bull;</div>}
        </GameShips>
      )}
    </span>
  );
}
