import { createContext, useContext, useEffect, useReducer } from "react";
import { getBoardWithShips } from "../features/board";
import { getShips } from "../features/ships";

const GameContext = createContext();

function GameProvider({ children }) {
  const initialState = {
    userBoard: [],
    userShips: [],
    opponentShips: [],
    opponentBoard: [],
  };

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
        console.log("currShips", currShips);
        console.log("board ", board);
        return {
          ...state,
          opponentBoard: board,
          opponentShips: currShips,
        };
      }

      case "game/ongoing":
        return;
      case "game/Ends":
        return;
      default:
        return "";
    }
  }

  const [{ userBoard, userShips, opponentBoard, opponentShips }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(function () {
    dispatch({ type: "game/setup" });
    console.table("BOARD", userBoard);
  }, []);

  return (
    <GameContext.Provider
      value={{ userBoard, userShips, opponentBoard, opponentShips, dispatch }}
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
