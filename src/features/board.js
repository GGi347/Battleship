import { getShips } from "./ships";

export function getBoard() {
  const board = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push({ isHit: false, value: "" });
    }
    board.push(row);
  }
  return board;
}

export function getBoardWithShips(ships) {
  const newArr = getBoard();
  for (let ship of ships) {
    const { boardTiles, numOfTiles } = ship;
    const { allTiles } = boardTiles;
    for (let tile of allTiles) {
      newArr[tile[0]][tile[1]].value = numOfTiles;
    }
  }

  return newArr;
}
