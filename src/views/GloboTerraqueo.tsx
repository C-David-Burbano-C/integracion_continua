import { GlobeIcon } from '../components/icons';
import CesiumGlobe from '../components/CesiumGlobe';

export default function GloboTerraqueo() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <GlobeIcon size={32} className="text-blue-600" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Globo Terráqueo Interactivo
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Explora el planeta Tierra con Google Earth
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Globo Terráqueo 3D - Visualización con CesiumJS
          </h3>
          <div className="w-full h-[700px] rounded-2xl overflow-hidden shadow-lg border border-sky-900">
            <CesiumGlobe />
          </div>
          <p className="text-sm text-slate-300 dark:text-slate-400 mt-4 text-center">
            Usa el mouse para rotar la Tierra, zoom con la rueda del ratón, y haz clic para explorar cualquier lugar del planeta
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
            Sobre la Tierra
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">7 Continentes</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">África, América, Antártida, Asia, Europa, Oceanía</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">5 Océanos</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Atlántico, Pacífico, Índico, Ártico, Antártico</p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">Características</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Tercer planeta del sistema solar, único con vida conocida</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
