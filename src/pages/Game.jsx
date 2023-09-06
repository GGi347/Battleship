import { useNavigate } from "react-router";
import Gameboard from "../ui/Gameboard";
import { useGame } from "../contexts/GameContext";
import Home from "./Home";
import Popup from "reactjs-popup";
import { useState } from "react";
import ShipsList from "../ui/ShipsList";
function Game() {
  const navigate = useNavigate();

  const { verdict, dispatch, isGameOver, userShips, opponentShips } = useGame();

  function handlePlayBtn() {
    dispatch({ type: "game/restart" });
    navigate("/prepareBoard");
  }

  function handleHomeBtn() {
    dispatch({ type: "game/start" });
    navigate("/");
  }

  return (
    <div className="game-container">
      <div>
        <Gameboard isGameBoard={true} />
        <ShipsList ships={userShips} />
      </div>

      <div>
        <Gameboard isOpponentBoard={true} isGameBoard={true} />
        <ShipsList ships={opponentShips} />
      </div>

      <Popup open={isGameOver}>
        <div className="popup-container">
          <div>{verdict}</div>
          <button onClick={handlePlayBtn}>Play Again</button>
          <button onClick={handleHomeBtn}>Quit</button>
        </div>
      </Popup>
    </div>
  );
}

export default Game;
