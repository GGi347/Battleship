import { getShips } from "./ships";

export function getBoard() {
  const board = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push("");
    }
    board.push(row);
  }
  return board;
}

export function getBoardWithShips() {
  const newArr = getBoard();
  const ships = getShips();
  console.table(ships);
  for (let ship of ships) {
    const { boardTiles, numOfTiles } = ship;
    const { rowTiles, colTiles, rowShip, colShip } = boardTiles;
    if (rowShip) {
      for (let tile of colTiles) {
        newArr[rowTiles[0]][tile] = numOfTiles;
      }
    }
    if (colShip) {
      for (let tile of rowTiles) {
        newArr[tile][colTiles[0]] = numOfTiles;
      }
    }
  }

  return newArr;
}
