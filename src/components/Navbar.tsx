// src/components/Navbar.tsx
import React from "react";
import ScoreDisplay from "./ScoreDisplay";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
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
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 text-white">U</div>
          <span>UCC : Prácticas Desarrollo</span>
        </div>

        {/* Lado derecho: puntaje acumulado */}
        <div className="flex items-center gap-2">
          <ScoreDisplay />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
