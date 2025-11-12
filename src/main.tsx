import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Configurar el path base para Cesium
(window as any).CESIUM_BASE_URL = '/assets/cesium';

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
