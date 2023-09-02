import { useNavigate } from "react-router";
import Gameboard from "../ui/Gameboard";
import { useGame } from "../contexts/GameContext";

function Game() {
  const navigate = useNavigate();

  const { userBoard, userShips, opponentBoard, opponentShips, dispatch } =
    useGame();
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Gameboard board={userBoard} />
      <Gameboard board={opponentBoard} />
      {/* <button onClick={handleRandomBtn}>Randomize</button>
    <button onClick={handleResetBtn}>Reset</button>
    <button onClick={handlePlayBtn}>Play</button> */}
    </div>
  );
}

export default Game;
