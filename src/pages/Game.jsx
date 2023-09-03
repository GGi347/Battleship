import { useNavigate } from "react-router";
import Gameboard from "../ui/Gameboard";
import { useGame } from "../contexts/GameContext";

function Game() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Gameboard />
      <Gameboard isOpponentBoard={true} />
      {/* <button onClick={handleRandomBtn}>Randomize</button>
    <button onClick={handleResetBtn}>Reset</button>
    <button onClick={handlePlayBtn}>Play</button> */}
    </div>
  );
}

export default Game;
