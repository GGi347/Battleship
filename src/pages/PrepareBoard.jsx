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
    navigate("/game", { replace: true });
  }

  return (
    <div className="prepare-board-container">
      <p>
        Move the tiles(ships) on the board to reposition them. Click on the
        tiles(ships) to change their orientation
      </p>
      <Gameboard isBoardUnclickable={true} />
      <div className="button-container">
        <button onClick={handleRandomBtn}>Randomize</button>

        <button onClick={handlePlayBtn}>Play</button>
      </div>
    </div>
  );
}

export default PrepareBoard;
