import { useCallback } from "react";
import SolarSystemViewer from "../components/SolarSystemViewer";

export default function SistemaSolar() {
  const scrollToPoints = useCallback(() => {
    const target = document.getElementById("puntos-sistema-solar");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="space-y-8">
      <section className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">Misión especial</p>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Exploración del Sistema Solar</h1>
            </div>
            <button
              onClick={scrollToPoints}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:scale-105 transition"
            >
              Ir a puntos
            </button>
          </div>
          <SolarSystemViewer />
        </div>
      </section>
    </div>
  );
}
