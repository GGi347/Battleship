import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import PrepareBoard from "./pages/PrepareBoard";
import GameInstruction from "./pages/GameInstruction";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GameProvider } from "./contexts/GameContext";
import Game from "./pages/Game";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/prepareBoard",
        element: <PrepareBoard />,
      },
      {
        path: "/game",
        element: <Game />,
      },

      {
        path: "/howToPlay",
        element: <GameInstruction />,
      },
    ],
  },
]);

function App() {
  return (
    <GameProvider>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
      </DndProvider>
    </GameProvider>
  );
}

export default App;
