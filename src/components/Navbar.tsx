// src/components/Navbar.tsx
import React, { useEffect } from "react";
import { useScore } from "../context/ScoreContext";
import { GraduationIcon } from "./icons";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  // Inicializa el tema al cargar
  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");

    if (saved) {
      root.classList.toggle("dark", saved === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.classList.toggle("dark") ? "dark" : "light";
    localStorage.setItem("theme", next);
    // Notifica a la app para que vistas activas reaccionen en vivo
    document.dispatchEvent(new CustomEvent("theme:changed", { detail: { theme: next } }));
  };

  const { totalScore } = useScore();

  return (
    <header className="h-14 sticky top-0 z-10 bg-white/70 dark:bg-slate-900/60 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Lado izquierdo: botón menú mobile + logo + marca */}
        <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 text-white">
            <GraduationIcon size={16} />
          </div>
          <span className="hidden sm:inline">Colegio Mentes Creativas</span>
          <span className="sm:hidden">Mentes Creativas</span>
        </div>

        {/* Centro: Puntaje */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs sm:text-sm font-medium">
            <span className="hidden sm:inline">Puntaje: </span>{totalScore}
          </div>
        </div>

        {/* Lado derecho: botón de tema */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="px-2 sm:px-3 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition text-sm"
          >
            <span className="hidden sm:inline">Tema</span>
            <span className="sm:hidden">🌓</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
