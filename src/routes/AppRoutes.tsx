import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Views
import HomePage from "../views/HomePage";
import SistemaSolar from "../views/SistemaSolar";
import MapaColombia from "../views/MapaColombia";
import GloboTerraqueo from "../views/GloboTerraqueo";
import SimulacionRobots from "../views/SimulacionRobots";
import InsigniasView from "../views/InsigniasView";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        
        {/* 4 componentes principales */}
        <Route path="sistema-solar" element={<SistemaSolar />} />
        <Route path="mapa-colombia" element={<MapaColombia />} />
        <Route path="globo-terraqueo" element={<GloboTerraqueo />} />
        <Route path="simulacion-robots" element={<SimulacionRobots />} />
        <Route path="insignias" element={<InsigniasView />} />
      </Route>
    </Routes>
  );
}