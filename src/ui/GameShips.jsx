import { useState } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../features/util";
import { useGame } from "../contexts/GameContext";

function GameShips({ numOfTiles, isHit, shipTiles, children }) {
  return (
    <div className={isHit ? "hit-row game-row ship-row" : "game-row ship-row"}>
      {[...Array(numOfTiles)].map((tile, index) => (
        <span
          key={index}
          className={
            children ? " hit-ship-cell empty-cell" : " game-ship empty-cell"
          }
        >
          {children}
        </span>
      ))}
    </div>
  );
}

export default GameShips;
