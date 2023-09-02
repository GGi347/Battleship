import { useState } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../features/util";

function Ships({ numofTiles }) {
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
    <div className="game-row ship-row">
      {[...Array(numofTiles)].map((tile, index) => (
        <span key={index} className="shipCell cell"></span>
      ))}
    </div>
  );
}

export default Ships;
