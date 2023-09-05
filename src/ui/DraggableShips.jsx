import { useState } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../features/util";
import { useGame } from "../contexts/GameContext";

export default function DraggableShips({
  numOfTiles,
  isHit,
  shipTiles,
  children,
}) {
  //const [widgets, setWidgets] = useState([]);
  // const [{ isDragging, c }, drag] = useDrag(
  //   () => ({
  //     type: ItemTypes.SHIPS,
  //     item: { numofTiles },
  //     collect: (monitor) => ({
  //       isDragging: !!monitor.isDragging(),
  //       c: !!monitor.getDropResult(),
  //     }),
  //   }),
  //   [numofTiles]
  // );
  let width;
  let height;
  if (shipTiles.rowShip) {
    width = `${40 * numOfTiles}px`;
    height = `${40}px`;
  } else {
    height = `${40 * numOfTiles}px`;
    width = `${40}px`;
  }
  const style = { width: width, height: height };

  return (
    // <div
    //   className={isHit ? "hit-row game-row ship-row" : "game-row ship-row"}
    //   onClick={(e) => e.preventDefault()}
    // >
    //   {children}
    <span
      className="ship-cell"
      onClick={(e) => e.preventDefault()}
      style={style}
      draggable={true}
    ></span>
    // </div>
  );
}
