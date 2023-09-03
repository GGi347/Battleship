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

const GameContext = createContext();

const initialState = {
  userBoard: [],
  userShips: [],
  opponentShips: [],
  opponentBoard: [],
  verdict: "",
  numOfHits: 0,
  userShipsHit: 0,
  opponentShipsHit: 0,
};

function GameProvider({ children }) {
  const numShips = numOfShips;
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

        //checkIfWon(newUserShipsHit, newOpponentShipsHit);

        console.log(state.userShips === state.opponentShips);

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
        console.log(action.payload);
        return { ...state };
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

  useEffect(function () {
    dispatch({ type: "game/setup" });
  }, []);

  useEffect(
    function () {
      if (numOfHits === 100) dispatch({ type: "game/ends", payload: "Draw" });
    },
    [numOfHits]
  );

  useEffect(
    function () {
      if (verdict !== "") {
        dispatch({ type: "game/ends", payload: "user wins" });
      }
    },
    [verdict]
  );

  useEffect(
    function () {
      console.log(numOfShips, userShipsHit, opponentShipsHit);
      if (numOfShips === 0) return;
      if (userShipsHit === numOfShips && opponentShipsHit === numOfShips) {
        dispatch({ type: "game/ends", payload: "DRAW" });
      } else if (userShipsHit === numOfShips) {
        dispatch({ type: "game/ends", payload: "User wins" });
      } else if (opponentShipsHit === numOfShips) {
        dispatch({ type: "game/ends", payload: "Computer wins" });
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
