import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemTypes } from "../features/util";
import { useGame } from "../contexts/GameContext";
import EmptyCell from "./EmptyCell";
import DraggableShips from "./DraggableShips";
import ShipCell from "./ShipCell";

function Gameboard({
  isOpponentBoard = false,
  isBoardUnclickable = false,
  isGameBoard = false,
}) {
  const { userBoard, opponentBoard, userShips, opponentShips } = useGame();

  const board = isOpponentBoard ? opponentBoard : userBoard;
  const ships = isOpponentBoard ? opponentShips : userShips;

  if (board.length === 0) {
    return <div>Loading</div>;
  }
  function renderSquare(i) {
    const colIndex = i % 10;
    const rowIndex = Math.floor(i / 10);

    const cellContent = board[rowIndex][colIndex].value;
    let shipCell;

    if (!isNaN(cellContent)) {
      const ship = ships.find((ship) => ship.numOfTiles === cellContent);

      let firstCellOfShip = false;

      if (ship !== undefined) {
        firstCellOfShip =
          rowIndex === ship.boardTiles.allTiles[0][0] &&
          colIndex === ship.boardTiles.allTiles[0][1];
        // console.log(board);
      }

      const isHit = board[rowIndex][colIndex].isHit;

      shipCell = !isNaN(cellContent) && firstCellOfShip && (
        <DraggableShips
          shipId={ship.shipId}
          numOfTiles={ship.numOfTiles}
          isHit={isHit}
          shipTiles={ship.boardTiles}
        ></DraggableShips>
      );
    }

    return (
      <div key={i} className="cell">
        {isGameBoard ? (
          <EmptyCell
            rowIndex={rowIndex}
            colIndex={colIndex}
            board={board}
            isOpponentBoard={isOpponentBoard}
            isBoardUnclickable={isBoardUnclickable}
            ships={ships}
          />
        ) : (
          <ShipCell
            rowIndex={rowIndex}
            colIndex={colIndex}
            board={board}
            isOpponentBoard={isOpponentBoard}
            isBoardUnclickable={isBoardUnclickable}
            ships={ships}
          >
            {shipCell}
          </ShipCell>
        )}
      </div>
    );
  }
  const squares = [];
  for (let i = 0; i < 100; i += 1) {
    squares.push(renderSquare(i));
  }
  return <div className="game-board">{squares}</div>;
}

export default Gameboard;
