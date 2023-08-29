import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h3>Get ready to battle!</h3>
      <button onClick={() => navigate("/prepareBoard")}>Play</button>
      <button>How to Play?</button>
    </div>
  );
}

export default Home;
