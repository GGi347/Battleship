import { useState } from "react";

function Ships({ numofTiles }) {
  //const [widgets, setWidgets] = useState([]);

  return (
    <div className="game-row ship-row" draggable>
      {[...Array(numofTiles)].map((tile, index) => (
        <span key={index} className="shipCell cell">
          {tile}
        </span>
      ))}
    </div>
  );
}

export default Ships;
