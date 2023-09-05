import { useNavigate } from "react-router";
import Gameboard from "../ui/Gameboard";
import { useGame } from "../contexts/GameContext";
import Home from "./Home";
import Popup from "reactjs-popup";
import { useState } from "react";
function Game() {
  const navigate = useNavigate();

  const { verdict, dispatch, isGameOver } = useGame();

  function handlePlayBtn() {
    dispatch({ type: "game/restart" });
    navigate("/prepareBoard");
  }

  function handleHomeBtn() {
    dispatch({ type: "game/start" });
    navigate("/");
  }
  console.log("isgameover ", verdict);
  return (
    <div className="game-container">
      <Gameboard isGameBoard={true} />
      <Gameboard isOpponentBoard={true} isGameBoard={true} />

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
