import { useState } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../features/util";
import { useGame } from "../contexts/GameContext";

export default function DraggableShips({
  numOfTiles,
  shipId,
  isHit,
  shipTiles,
  children,
}) {
  //const [widgets, setWidgets] = useState([]);

  const [{ isDragging, c, s, dropResult }, drag] = useDrag(
    () => ({
      type: ItemTypes.SHIPS,
      item: { shipId },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        handleDrop(dropResult);
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),

        s: monitor.getItem(),
      }),
    }),
    [shipId]
  );
  let width;
  let height;
  if (shipTiles.rowShip) {
    width = `${40 * numOfTiles}px`;
    height = `${40}px`;
  } else {
    height = `${40 * numOfTiles}px`;
    width = `${40}px`;
  }
  const style = {
    width: width,
    height: height,
    backgroundColor: isDragging ? "transparent" : "",
    borderColor: isDragging ? "#3535b8" : "",
  };

  const { dispatch, userShips, userBoard } = useGame();

  function handleDrop(dropResult) {
    if (!dropResult) return;
    0;
    const { rowIndex, colIndex } = dropResult;

    const ship = userShips.find((item) => item.shipId === shipId);
    const board = userBoard;

    let isCellAvailable = true;

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
        if (rowIndex > 9) {
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
      console.log("error)");
    }
  }

  //console.log(s, "isDrag");
  function handleRotation() {
    dispatch({ type: "game/shipRotated", payload: { shipId } });
  }
  return (
    <span
      className="ship-cell"
      onClick={handleRotation}
      ref={drag}
      style={style}
    ></span>
    // </div>
  );
}
