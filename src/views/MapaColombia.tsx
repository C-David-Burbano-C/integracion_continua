import { MapIcon } from '../components/icons';

export default function MapaColombia() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <MapIcon size={32} className="text-green-600" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Mapa Interactivo de Colombia
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Explora Colombia con Google Earth
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
            Vista Satelital de Colombia
          </h3>
          <div className="h-[600px] rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16308341.36384882!2d-82.31524843749997!3d4.101778799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e15a43aae1594a3%3A0x9a0d9a04eff2a340!2sColombia!5e0!3m2!1ses!2sco!4v1699999999999!5m2!1ses!2sco"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Colombia"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
            Sobre Colombia
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">6 Regiones</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Caribe, Andina, Pacífica, Orinoquía, Amazonía, Insular</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">32 Departamentos</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Capital: Bogotá D.C.</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100">Biodiversidad</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Segundo país más biodiverso del mundo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
