import Gameboard from "../ui/Gameboard";
import { useGame } from "../contexts/GameContext";
import { useNavigate } from "react-router";

function PrepareBoard() {
  const { dispatch } = useGame();
  const navigate = useNavigate();

  function handleRandomBtn() {
    dispatch({ type: "game/setup" });
  }

  function handlePlayBtn() {
    dispatch({ type: "game/started" });
    navigate("/game");
  }

  function handleResetBtn() {
    navigate("/resetBoard");
  }

  return (
    <div>
      <Gameboard />
      <button onClick={handleRandomBtn}>Randomize</button>
      <button onClick={handleResetBtn}>Reset</button>
      <button onClick={handlePlayBtn}>Play</button>
    </div>
  );
}

export default PrepareBoard;
