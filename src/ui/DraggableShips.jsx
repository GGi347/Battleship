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
  const [{ isDragging, c, s, i }, drag] = useDrag(
    () => ({
      type: ItemTypes.SHIPS,
      item: { shipId },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        c: !!monitor.getDropResult(),
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
  };

  const { dispatch } = useGame();

  //console.log(s, "isDrag");
  function handleRotation() {
    dispatch({ type: "game/shipRotated", payload: { shipId } });
  }
  return (
    // <div
    //   className={isHit ? "hit-row game-row ship-row" : "game-row ship-row"}
    //   onClick={(e) => e.preventDefault()}
    // >
    //   {children}
    <span
      className="ship-cell"
      onClick={handleRotation}
      ref={drag}
      style={style}
    ></span>
    // </div>
  );
}
