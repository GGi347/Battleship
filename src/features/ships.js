import { isObjectEmpty } from "./util";
import { getRandomNumber } from "./util";

const ships = [
  { shipId: 1, numOfTiles: 2, color: "red", boardTiles: {} },
  { shipId: 2, numOfTiles: 3, color: "red", boardTiles: {} },
  { shipId: 3, numOfTiles: 4, color: "red", boardTiles: {} },
  { shipId: 4, numOfTiles: 5, color: "red", boardTiles: {} },
];

function checkForRepeatedness(prevShip, tiles) {
  const tilesCoor = [];
  const prevCoor = [];
  if (tiles.colShip) {
    for (let i of tiles.rowTiles) {
      tilesCoor.push([i, tiles.colTiles[0]]);
    }
  } else {
    for (let i of tiles.colTiles) {
      tilesCoor.push([tiles.rowTiles[0], i]);
    }
  }

  if (prevShip.boardTiles.colShip) {
    for (let i of prevShip.boardTiles.rowTiles) {
      prevCoor.push([i, prevShip.boardTiles.colTiles[0]]);
    }
  } else {
    for (let i of prevShip.boardTiles.colTiles) {
      prevCoor.push([prevShip.boardTiles.rowTiles[0], i]);
    }
  }

  for (let tile of tilesCoor) {
    for (let prev of prevCoor) {
      if (tile[0] === prev[0] && tile[1] === prev[1]) {
        return true;
      }
    }
  }

  return false;
}

function getShipPosition(ship) {
  const firstNum = getRandomNumber();
  const secondNum = getRandomNumber();
  const { numOfTiles } = ship;
  const tiles = {
    rowShip: false,
    colShip: false,
    colTiles: [],
    rowTiles: [],
  };
  if (firstNum + numOfTiles < 10) {
    tiles.rowShip = true;
    tiles.rowTiles[0] = firstNum;
    for (let i = firstNum; i < firstNum + numOfTiles; i++) {
      tiles.colTiles.push(i);
    }
  } else if (secondNum + numOfTiles < 10) {
    tiles.colShip = true;
    tiles.colTiles[0] = secondNum;

    for (let i = secondNum; i < secondNum + numOfTiles; i++) {
      tiles.rowTiles.push(i);
    }
  } else {
    return {};
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
    console.log("ships", ship);
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
