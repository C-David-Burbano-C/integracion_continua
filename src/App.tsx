import { BrowserRouter } from "react-router-dom";
import { ScoreProvider } from "./context/ScoreContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <ScoreProvider>
        <AppRoutes />
      </ScoreProvider>
    </BrowserRouter>
  );
}

export default App;
