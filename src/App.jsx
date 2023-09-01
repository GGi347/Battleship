import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import PrepareBoard from "./pages/PrepareBoard";
import ResetBoard from "./pages/ResetBoard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Demo from "./pages/Demo";
import { GameProvider } from "./contexts/GameContext";

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

      { path: "/resetBoard", element: <ResetBoard /> },
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
