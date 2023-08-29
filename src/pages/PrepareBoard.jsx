import { useEffect, useState } from "react";
import Gameboard from "../ui/Gameboard";
import Ships from "../ui/Ships";

const ships = [2, 3, 4, 5];

function getBoard() {
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

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function placeShip(shipPositions, board) {
  const newArr = board;
  // newArr[shipPositions[0][0][0]][shipPositions[0][0][1]] = ships[0];
  let count = 0;
  for (let position of shipPositions) {
    if (position[0][0] == position[1][0]) {
      for (let i = position[0][1]; i < position[1][1]; i++) {
        newArr[position[0][0]][i] = ships[count];
      }
    } else {
      for (let i = position[0][0]; i < position[1][0]; i++) {
        newArr[i][position[0][1]] = ships[count];
      }
    }
    count++;
  }
  // newArr[position[0][0]][position[[0][1]]] = ship;
  return newArr;
}

function getShips() {
  const shipPosition = [];
  for (let ship of ships) {
    const firstNum = getRandomNumber();
    const secondNum = getRandomNumber();

    if (firstNum + ship < 10) {
      shipPosition.push([
        [firstNum, secondNum],
        [firstNum + ship, secondNum],
      ]);
    } else if (secondNum + ship < 10) {
      shipPosition.push([
        [firstNum, secondNum],
        [firstNum, secondNum + ship],
      ]);
    } else {
      getShips();
    }
  }
  return shipPosition;
}

function PrepareBoard() {
  const initialBoard = getBoard();
  const [board, setBoard] = useState(initialBoard);
  const [isRandomized, setIsRandmoized] = useState(false);
  useEffect(
    function () {
      const shipPositions = getShips();
      const newBoard = placeShip(shipPositions, initialBoard);
      console.table(newBoard);
      setBoard(newBoard);
    },
    [isRandomized, initialBoard, setBoard]
  );
  console.table(board);

  function handleRandomBtn() {
    setIsRandmoized(!isRandomized);
  }
  // console.log(board);
  return (
    <div>
      <Gameboard board={board} />
      {/* {ships.map((ship, index) => (
        <Ships key={index} numofTiles={ship} />
      ))} */}

      <button onClick={handleRandomBtn}>Randomize</button>
      <button>Reset</button>
      <button>Play</button>
    </div>
  );
}

export default PrepareBoard;
