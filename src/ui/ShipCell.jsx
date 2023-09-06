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
    drop: (item) => handleDrop(item),
    // handleDrop(rowIndex, colIndex, board, cellContent, setBoard, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  //console.log(canDrop, "can drop");
  // if (board[rowIndex][colIndex] === "")
  //   return <span className="cell" ref={drop} />;
  function handleDrop(item) {
    const shipId = item.shipId;

    const ship = userShips.find((item) => item.shipId === shipId);

    let isCellAvailable = true;
    console.log("INDEX ", rowIndex, colIndex);

    for (let i = 0; i < ship.numOfTiles; i++) {
      if (ship.boardTiles.rowShip) {
        if (colIndex > 9) {
          isCellAvailable = false;
          break;
        }
        isCellAvailable =
          board[rowIndex][colIndex + i].value === "" ||
          board[rowIndex][colIndex + i].value === ship.numOfTiles;
      }

      if (ship.boardTiles.colShip) {
        if (rowIndex + ship.numOfTiles - 1 > 9) {
          isCellAvailable = false;
          break;
        }
        isCellAvailable =
          board[rowIndex + i][colIndex].value === "" ||
          board[rowIndex + i][colIndex].value === ship.numOfTiles;
      }

      if (!isCellAvailable) break;
    }

    if (isCellAvailable) {
      dispatch({
        type: "game/randomSetup",
        payload: { rowIndex: rowIndex, colIndex: colIndex, item: ship },
      });
    } else {
      console.log("FUCK)");
    }
  }

  return (
    <span
      // onClick={
      //   !isOpponentBoard && !isGameOver && !isBoardUnclickable
      //     ? () => {
      //         handleCellClick(rowIndex, colIndex);
      //       }
      //     : () => {}
      // }
      className="noship-cell"
      ref={drop}
    >
      <div>{children}</div>

      {/* {isHit && <div>&bull;</div>} */}
    </span>
  );
}
