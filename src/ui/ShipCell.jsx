import { useGame } from "../contexts/GameContext";

export default function ShipCell({
  rowIndex,
  colIndex,
  board,
  isOpponentBoard,
  isBoardUnclickable,
  children,
}) {
  const { handleCellClick, isGameOver } = useGame();
  const isHit = board[rowIndex][colIndex].isHit;

  return (
    <span
      onClick={
        !isOpponentBoard && !isGameOver && !isBoardUnclickable
          ? () => {
              handleCellClick(rowIndex, colIndex);
            }
          : () => {}
      }
      className="noship-cell"
    >
      <div>{children}</div>

      {/* {isHit && <div>&bull;</div>} */}
    </span>
  );
}
