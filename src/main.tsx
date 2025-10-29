import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ScoreProvider } from "./context/ScoreContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <ScoreProvider>
      <App />
    </ScoreProvider>
  </React.StrictMode>
);
