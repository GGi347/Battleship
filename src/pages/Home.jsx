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

  function handleHowToPlayBtn() {
    navigate("/howToPlay");
  }

  useEffect(
    function () {
      dispatch({ type: "game/start" });
    },
    [dispatch]
  );
  return (
    <div className="header-button-container">
      <button onClick={handlePlayBtn}>Play 🚢</button>
      <button onClick={handleHowToPlayBtn}>How to Play?</button>
    </div>
  );
}

export default Home;
