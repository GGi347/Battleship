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
  function reducer(state, action) {
    switch (action.type) {
      case "game/randomSetup":
        return {};
      case "game/setup": {
        const currShips = getShips();
        const board = getBoardWithShips(currShips);

        return {
          ...state,
          userBoard: board,
          userShips: currShips,
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
        console.log(state.userShips);
        const newUserObj = shipAttacked(
          [...state.userBoard],
          [...state.userShips],
          action.payload.colIndex,
          action.payload.rowIndex,
          state.userShipsHit
        );

        const newUserBoard = newUserObj.newArr;
        const newUserShips = newUserObj.newShips;
        const newUserShipsHit = newUserObj.shipsHit;

        const { opponentCol, opponentRow } = checkCellAvailable(
          state.opponentBoard
        );

        const newOpponentObj = shipAttacked(
          [...state.opponentBoard],
          [...state.opponentShips],
          opponentCol,
          opponentRow,
          state.opponentShipsHit
        );

        const newOpponentBoard = newOpponentObj.newArr;
        const newOpponentShips = newOpponentObj.newShips;
        const newOpponentShipsHit = newOpponentObj.shipsHit;

        newUserBoard[action.payload.rowIndex][
          action.payload.colIndex
        ].isHit = true;
        newOpponentBoard[opponentRow][opponentCol].isHit = true;

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
        dispatch({ type: "game/ends", payload: VERDICTS.userWon });
      } else if (opponentShipsHit === numOfShips) {
        dispatch({ type: "game/ends", payload: VERDICTS.opponentWon });
      }
    },
    [userShipsHit, opponentShipsHit]
  );

  function shipAttacked(newArr, newShips, colIndex, rowIndex, shipsHit) {
    if (newArr[rowIndex][colIndex].value !== "") {
      const ship = newShips.find(
        (ship) => ship.numOfTiles === newArr[rowIndex][colIndex].value
      );
      ship.hits += 1;

      if (ship.hits === ship.numOfTiles) {
        // console.log("SHIP HIT ", shipsHit, ship.hits, ship.numOfTiles, ship);
        shipsHit += 1;
      }
    }
    return { newArr, newShips, shipsHit };
  }

  function checkCellAvailable(board = []) {
    const opponentCol = getRandomNumber();
    const opponentRow = getRandomNumber();

    if (board[opponentRow][opponentCol].isHit) {
      return checkCellAvailable(board);
    }

    return { opponentCol, opponentRow };
  }

  function handleCellClick(rowIndex, colIndex) {
    if (!userBoard[rowIndex][colIndex].isHit) {
      dispatch({ type: "game/ongoing", payload: { rowIndex, colIndex } });
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
