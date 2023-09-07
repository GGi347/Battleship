import { useDrop } from "react-dnd";
import { useGame } from "../contexts/GameContext";
import { ItemTypes } from "../features/util";

export default function ShipCell({
  rowIndex,
  colIndex,
  board,
  isOpponentBoard,
  isBoardUnclickable,
  children,
}) {
  const { handleCellClick, isGameOver, dispatch, userShips } = useGame();
  const isHit = board[rowIndex][colIndex].isHit;

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.SHIPS,
    drop: () => ({ rowIndex, colIndex }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));
  console.log("candrop ", canDrop);
  return (
    <span
      className="noship-cell"
      ref={drop}
      style={canDrop && isOver ? { backgroundColor: "#3535b8" } : {}}
    >
      <div>{children}</div>
    </span>
  );
}
