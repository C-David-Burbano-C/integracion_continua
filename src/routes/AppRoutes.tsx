import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Views
import HomePage from "../views/HomePage";
import Matematicas from "../pages/Matematicas";
import CienciasNaturales from "../pages/CienciasNaturales";
import PensamientoLogico from "../pages/PensamientoLogico";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="matematicas" element={<Matematicas />} />
        <Route path="ciencias-naturales" element={<CienciasNaturales />} />
        <Route path="pensamiento-logico" element={<PensamientoLogico />} />
      </Route>
    </Routes>
  );
}