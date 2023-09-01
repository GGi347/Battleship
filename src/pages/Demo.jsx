/** Styling properties applied to each square element */
// const squareStyle = { width: "12.5%", height: "12.5%" };
// const sqStyle = {
//   width: "100%",
//   height: "100%",
// };
/**
 * The chessboard component
 * @param props The react props
 */
function Demo() {
  // const [[knightX, knightY], setKnightPos] = useState(game.knightPosition);
  // useEffect(() => game.observe(setKnightPos));
  function renderSquare(i) {
    const x = i % 10;
    const y = Math.floor(i / 10);
    return (
      <div key={i} className="cell">
        <BoardSquare x={x} y={y}>
          <Piece isKnight={x === 4 && y === 4} />
        </BoardSquare>
      </div>
    );
  }
  const squares = [];
  for (let i = 0; i < 100; i += 1) {
    squares.push(renderSquare(i));
  }
  return <div className="game-board">{squares}</div>;
}

export const Piece = ({ isKnight }) =>
  isKnight ? <Ships numofTiles={2} /> : <div>12</div>;

export const BoardSquare = ({ x, y, children }) => {
  return (
    <div
      data-testid={`(${x},${y})`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Square>{children}</Square>
    </div>
  );
};
import { useState } from "react";

function Ships({ numofTiles }) {
  //const [widgets, setWidgets] = useState([]);

  return (
    <div className="game-row ship-row">
      {[...Array(numofTiles)].map((tile, index) => (
        <span key={index} className="shipCell cell">
          {tile}
        </span>
      ))}

      <div>{numofTiles}</div>
    </div>
  );
}

export const Square = ({ children }) => {
  return <div className="cell">{children}</div>;
};

export default Demo;
