import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { getBoardWithShips } from "../features/board";
import { getShips, numOfShips } from "../features/ships";
import { getRandomNumber } from "../features/util";
import { VERDICTS } from "../features/util";

const GameContext = createContext();

const initialState = {
  userBoard: [],
  userShips: [],
  opponentShips: [],
  opponentBoard: [],
  verdict: VERDICTS.undecided,
  numOfHits: 0,
  userShipsHit: 0,
  opponentShipsHit: 0,
};

function GameProvider({ children }) {
  const previousShipHit = useRef([]);
  function reducer(state, action) {
    switch (action.type) {
      case "game/setup": {
        const currShips = getShips();
        const board = getBoardWithShips(currShips);

        return {
          ...state,
          userBoard: board,
          userShips: currShips,
        };
      }

      case "game/randomSetup": {
        const rowIndex = action.payload.rowIndex;
        const colIndex = action.payload.colIndex;
        const ship = action.payload.item;

        const newUserBoard = state.userBoard;
        const newUserShips = state.userShips;
        const allTiles = ship.boardTiles.allTiles;

        for (let i = 0; i < ship.numOfTiles; i++) {
          newUserBoard[allTiles[i][0]][allTiles[i][1]].value = "";
        }

        const newAllTiles = [];
        if (ship.boardTiles.rowShip) {
          for (let col = 0; col < ship.numOfTiles; col++) {
            newUserBoard[rowIndex][colIndex + col].value = ship.numOfTiles;
            newAllTiles.push([rowIndex, colIndex + col]);
          }
        } else {
          for (let row = 0; row < ship.numOfTiles; row++) {
            newUserBoard[rowIndex + row][colIndex].value = ship.numOfTiles;
            newAllTiles.push([rowIndex + row, colIndex]);
          }
        }
        ship.boardTiles.allTiles = newAllTiles;
        newUserShips[ship.shipId] = ship;
        console.log(newUserBoard);
        // console.log("new User boadd", newUserBoard, newUserShips);
        return {
          ...state,
          userBoard: newUserBoard,
          userShips: newUserShips,
        };
      }

      case "game/shipRotated": {
        const ship = state.userShips.find(
          (item) => item.shipId === action.payload.shipId
        );
        const newTiles = [];

        if (ship.boardTiles.rowShip) {
          if (ship.boardTiles.allTiles[0][0] + ship.numOfTiles - 1 <= 9) {
            for (let i = 0; i < ship.numOfTiles; i++) {
              newTiles.push([
                ship.boardTiles.allTiles[0][0] + i,
                ship.boardTiles.allTiles[0][1],
              ]);
            }
          }
        } else if (ship.boardTiles.colShip) {
          if (ship.boardTiles.allTiles[0][1] + ship.numOfTiles - 1 <= 9) {
            for (let i = 0; i < ship.numOfTiles; i++) {
              newTiles.push([
                ship.boardTiles.allTiles[0][0],
                ship.boardTiles.allTiles[0][1] + i,
              ]);
            }
          }
        }
        if (newTiles.length > 0) {
          let rotate = true;

          for (let i = 1; i < newTiles.length; i++) {
            if (state.userBoard[newTiles[i][0]][newTiles[i][1]].value !== "") {
              rotate = false;
              console.log(state.userShips);
              break;
            }
          }
          if (rotate) {
            ship.boardTiles.colShip = !ship.boardTiles.colShip;
            ship.boardTiles.rowShip = !ship.boardTiles.rowShip;

            ship.boardTiles.allTiles = newTiles;
          }
        }

        const newUserShips = state.userShips;
        newUserShips[action.payload.shipId] = ship;
        const newBoard = getBoardWithShips(newUserShips);
        console.log(newUserShips, newBoard);
        return {
          ...state,
          userShips: newUserShips,
          userBoard: newBoard,
        };
      }

      case "game/started": {
        const currShips = getShips();
        const board = getBoardWithShips(currShips);

        return {
          ...state,
          opponentBoard: board,
          opponentShips: currShips,
        };
      }

      case "game/ongoing": {
        const newUserMove = shipAttacked(
          [...state.opponentBoard],
          [...state.opponentShips],
          action.payload.colIndex,
          action.payload.rowIndex,
          state.opponentShipsHit
        );

        const newOpponentBoard = newUserMove.newArr;
        const newOpponentShips = newUserMove.newShips;
        const newOpponentShipsHit = newUserMove.shipsHit;

        const { opponentCol, opponentRow } = checkCellAvailable(
          state.userBoard
        );

        const newOpponentMove = shipAttacked(
          [...state.userBoard],
          [...state.userShips],
          opponentCol,
          opponentRow,
          state.userShipsHit,
          true
        );

        const newUserBoard = newOpponentMove.newArr;
        const newUserShips = newOpponentMove.newShips;
        const newUserShipsHit = newOpponentMove.shipsHit;

        newUserBoard[opponentRow][opponentCol].isHit = true;
        newOpponentBoard[action.payload.rowIndex][
          action.payload.colIndex
        ].isHit = true;

        return {
          ...state,
          userBoard: newUserBoard,
          userShips: newUserShips,
          opponentBoard: newOpponentBoard,
          opponentShips: newOpponentShips,
          numOfHits: state.numOfHits + 1,
          userShipsHit: newUserShipsHit,
          opponentShipsHit: newOpponentShipsHit,
        };
      }

      case "game/ends": {
        return { ...state, verdict: action.payload, isGameOver: true };
      }

      case "game/start": {
        return {
          ...initialState,
        };
      }

      case "game/restart": {
        const currShips = getShips();
        const board = getBoardWithShips(currShips);
        return {
          ...initialState,
          userBoard: board,
          userShips: currShips,
        };
      }

      default:
        return "";
    }
  }

  const [
    {
      userBoard,
      userShips,
      opponentBoard,
      opponentShips,
      verdict,
      numOfHits,
      userShipsHit,
      opponentShipsHit,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const isGameOver = verdict !== VERDICTS.undecided;

  useEffect(function () {
    dispatch({ type: "game/setup" });
  }, []);

  useEffect(
    function () {
      if (numOfHits === 100)
        dispatch({ type: "game/ends", payload: VERDICTS.draw });
    },
    [numOfHits]
  );

  useEffect(
    function () {
      if (numOfShips === 0) return;
      if (userShipsHit === numOfShips && opponentShipsHit === numOfShips) {
        dispatch({ type: "game/ends", payload: VERDICTS.draw });
      } else if (userShipsHit === numOfShips) {
        dispatch({ type: "game/ends", payload: VERDICTS.opponentWon });
      } else if (opponentShipsHit === numOfShips) {
        dispatch({ type: "game/ends", payload: VERDICTS.userWon });
      }
    },
    [userShipsHit, opponentShipsHit]
  );

  function shipAttacked(
    newArr,
    newShips,
    colIndex,
    rowIndex,
    shipsHit,
    isOpponentMove = false
  ) {
    if (newArr[rowIndex][colIndex].value !== "") {
      const ship = newShips.find(
        (ship) => ship.numOfTiles === newArr[rowIndex][colIndex].value
      );
      ship.hits += 1;

      if (ship.hits === ship.numOfTiles) {
        // console.log("SHIP HIT ", shipsHit, ship.hits, ship.numOfTiles, ship);
        shipsHit += 1;

        if (isOpponentMove) {
          previousShipHit.current = previousShipHit.current.filter(
            (item) => item.ship.shipId !== ship.shipId
          );
        }

        console.log("Ship Hit ", previousShipHit.current);
      } else {
        if (isOpponentMove) {
          previousShipHit.current = [
            ...previousShipHit.current,
            {
              rowIndex: rowIndex,
              colIndex: colIndex,
              ship: ship,
            },
          ];
        }
      }
      console.log("Prev ", previousShipHit.current);
    }

    return { newArr, newShips, shipsHit };
  }

  function checkCellAvailable(board = []) {
    let opponentCol = -1;
    let opponentRow = -1;
    let prevShipLen = previousShipHit.current.length;
    let count = 0;
    if (prevShipLen > 0) {
      let prev = previousShipHit.current[prevShipLen - 1];
      while (prevShipLen > 0 && count < prev.ship.numOfTiles - 1) {
        let minCol = prev.colIndex - 1;
        let maxCol = prev.colIndex + 1;
        let minRow = prev.rowIndex - 1;
        let maxRow = prev.rowIndex + 1;

        if (minCol < 0) {
          minCol = prev.colIndex;
        }
        if (maxCol > 9) {
          maxCol = prev.colIndex;
        }

        if (minRow < 0) {
          minRow = prev.rowIndex;
        }
        if (maxRow > 9) {
          maxRow = prev.rowIndex;
        }
        for (let row = minRow; row <= maxRow; row++) {
          for (let col = minCol; col <= maxCol; col++) {
            if (!board[row][col].isHit) {
              opponentCol = col;
              opponentRow = row;
              return { opponentCol, opponentRow };
            }
            console.log("smart ", row, col);
          }
        }
        count++;
        prevShipLen--;
        prev = previousShipHit.current[prevShipLen - 1];
      }
    } else {
      opponentCol = getRandomNumber();
      opponentRow = getRandomNumber();

      if (board[opponentRow][opponentCol].isHit) {
        return checkCellAvailable(board);
      }
    }

    return { opponentCol, opponentRow };
  }

  function handleCellClick(rowIndex, colIndex) {
    if (!opponentBoard[rowIndex][colIndex].isHit) {
      dispatch({ type: "game/ongoing", payload: { rowIndex, colIndex } });
    } else {
      console.log("hit ", opponentBoard[rowIndex][colIndex]);
    }
  }

  return (
    <GameContext.Provider
      value={{
        userBoard,
        userShips,
        opponentBoard,
        opponentShips,
        dispatch,
        handleCellClick,
        isGameOver,
        verdict,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("GameContext was called outside its provider");
  }
  return context;
}

export { GameProvider, useGame };
