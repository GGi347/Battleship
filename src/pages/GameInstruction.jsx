import { useNavigate } from "react-router";

function GameInstruction() {
  const navigate = useNavigate();
  return (
    <div className="game-instruction-container">
      <h3>How To Play The Game?</h3>
      <p>
        Battleship is a strategy type guessing game for two players. The game is
        played on four grids, two for each player. The grids are typically
        square – usually 10×10 – and the individual squares in the grid are
        identified by letter and number.
      </p>
      <p>
        On one grid the player arranges ships and records the shots by the
        opponent. On the other grid, the player records their own shots. Before
        play begins, each player secretly arranges their ships on their primary
        grid. Each ship occupies a number of consecutive squares on the grid,
        arranged either horizontally or vertically. The number of squares for
        each ship is determined by the type of ship. The ships cannot overlap.
        The types and numbers of ships allowed are the same for each player.
        These may vary depending on the rules. The ships should be hidden from
        players sight and it&apos;s not allowed to see each other&apos;s pieces.
        The game is a discovery game which players need to discover their
        opponents ship positions.
      </p>
      <button onClick={() => navigate("/")}>Let&apos;s Start! 🤞🏽</button>
    </div>
  );
}

export default GameInstruction;
