import { useState } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../features/util";
import { useGame } from "../contexts/GameContext";

function Ships({ numOfTiles, isHit, children }) {
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

  return (
    <div className={isHit ? "hit-row game-row ship-row" : "game-row ship-row"}>
      {[...Array(numOfTiles)].map((tile, index) => (
        <span
          key={index}
          className={children ? " hit-cell cell" : " shipCell cell"}
        >
          {children}
        </span>
      ))}
    </div>
  );
}

export default Ships;
