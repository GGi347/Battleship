import { isObjectEmpty } from "./util";
import { getRandomNumber } from "./util";

const ships = [
  { shipId: 1, numOfTiles: 2, color: "red", boardTiles: {} },
  { shipId: 2, numOfTiles: 3, color: "red", boardTiles: {} },
  { shipId: 3, numOfTiles: 4, color: "red", boardTiles: {} },
  { shipId: 4, numOfTiles: 5, color: "red", boardTiles: {} },
];

function checkForRepeatedness(prevShip, tiles) {
  for (let tile of tiles.allTiles) {
    for (let prev of prevShip.boardTiles.allTiles) {
      if (tile[0] === prev[0] && tile[1] === prev[1]) {
        return true;
      }
    }
  }

  return false;
}

function getShipPosition(ship) {
  let firstNum = getRandomNumber();
  let secondNum = getRandomNumber();
  const shipDirection = Math.random() < 0.5 ? "row" : "col";
  const { numOfTiles } = ship;
  const tiles = {
    rowShip: false,
    colShip: false,
    allTiles: [],
  };
  if (shipDirection === "col") {
    if (firstNum + numOfTiles >= 10) {
      firstNum = firstNum + numOfTiles - 10;
    }

    tiles.colShip = true;
    for (let i = firstNum; i < firstNum + numOfTiles; i++) {
      tiles.allTiles.push([i, secondNum]);
    }
  } else {
    if (secondNum + numOfTiles >= 10) {
      secondNum = secondNum + numOfTiles - 10;
    }
    tiles.rowShip = true;

    for (let i = secondNum; i < secondNum + numOfTiles; i++) {
      tiles.allTiles.push([firstNum, i]);
    }
  }
  return tiles;
}

function setShipPosition(ship) {
  const tiles = getShipPosition(ship);
  if (isObjectEmpty(tiles)) return;
  let repeated = false;
  for (let prevShip of ships) {
    if (!isObjectEmpty(prevShip.boardTiles)) {
      repeated = checkForRepeatedness(prevShip, tiles);
      if (repeated) break;
    }
  }

  if (!repeated && (tiles.rowShip || tiles.colShip)) {
    ship.boardTiles = tiles;
  } else {
    setShipPosition(ship);
  }
}

export function getShips() {
  for (let ship of ships) {
    setShipPosition(ship);
  }

  return ships;
}
