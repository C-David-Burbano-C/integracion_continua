import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Views existentes
import HomePage from "../views/HomePage";
import Matematicas from "../pages/Matematicas";
import CienciasNaturales from "../pages/CienciasNaturales";
import PensamientoLogico from "../pages/PensamientoLogico";

// Vistas 3D existentes
import ThreeDemoView from "../views/ThreeDemoView";
import GeometryExplorer from "../views/GeometryExplorer";

// Nuevas vistas temáticas
import Geometria3D from "../views/Geometria3D";
import DescomposicionFiguras from "../views/DescomposicionFiguras";
import Simetria from "../views/Simetria";
import Fracciones3D from "../views/Fracciones3D";
import Anatomia3D from "../views/Anatomia3D";
import SistemaSolar from "../views/SistemaSolar";
import CicloDelAgua from "../views/CicloDelAgua";
import ClasificacionAnimales from "../views/ClasificacionAnimales";
import EnergiaEnAccion from "../views/EnergiaEnAccion";
import MapaColombia from "../views/MapaColombia";
import GloboTerraqueo from "../views/GloboTerraqueo";
import SimulacionRobots from "../views/SimulacionRobots";
import Pintura3D from "../views/Pintura3D";
import EsculturaDigital from "../views/EsculturaDigital";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        
        {/* Rutas existentes */}
        <Route path="matematicas" element={<Matematicas />} />
        <Route path="ciencias-naturales" element={<CienciasNaturales />} />
        <Route path="pensamiento-logico" element={<PensamientoLogico />} />
        
        {/* Vistas 3D existentes */}
        <Route path="geometria-3d" element={<ThreeDemoView />} />
        <Route path="geometry-explorer" element={<GeometryExplorer />} />
        
        {/* Nuevas rutas temáticas */}
        <Route path="matematicas/geometria-3d" element={<Geometria3D />} />
        <Route path="matematicas/descomposicion" element={<DescomposicionFiguras />} />
        <Route path="matematicas/simetría" element={<Simetria />} />
        <Route path="matematicas/fracciones-3d" element={<Fracciones3D />} />
        
        <Route path="ciencias-naturales/anatomia-3d" element={<Anatomia3D />} />
        <Route path="ciencias-naturales/sistema-solar" element={<SistemaSolar />} />
        <Route path="ciencias-naturales/ciclo-agua" element={<CicloDelAgua />} />
        <Route path="ciencias-naturales/animales" element={<ClasificacionAnimales />} />
        <Route path="ciencias-naturales/energia" element={<EnergiaEnAccion />} />
        
        <Route path="ciencias-sociales/mapa-colombia" element={<MapaColombia />} />
        <Route path="ciencias-sociales/globo-terraqueo" element={<GloboTerraqueo />} />
        
        <Route path="tecnologia/robots" element={<SimulacionRobots />} />
        
        <Route path="arte/pintura-3d" element={<Pintura3D />} />
        <Route path="arte/escultura" element={<EsculturaDigital />} />
      </Route>
    </Routes>
  );
}