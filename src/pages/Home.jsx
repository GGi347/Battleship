import { useNavigate } from "react-router";
import { useGame } from "../contexts/GameContext";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const { dispatch } = useGame();

  function handlePlayBtn() {
    dispatch({ type: "game/setup" });
    navigate("/prepareBoard");
  }

  useEffect(
    function () {
      dispatch({ type: "game/start" });
    },
    [dispatch]
  );
  return (
    <div>
      <h3>Get ready to battle!</h3>
      <button onClick={handlePlayBtn}>Play</button>
      <button>How to Play?</button>
    </div>
  );
}

export default Home;
