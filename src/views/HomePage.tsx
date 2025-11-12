import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaSun, FaMap, FaGlobe, FaRobot } from "react-icons/fa";

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Exploradores del Conocimiento
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Descubre el universo, la Tierra y la tecnología con visualizaciones interactivas
            </p>
          </motion.div>
        </div>

        {/* 4 Secciones Principales */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link to="/sistema-solar">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaSun className="text-yellow-500 mb-4" size={60} />
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                  Sistema Solar
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Explora los planetas, el Sol y la inmensidad del espacio en 3D
                </p>
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  Explorar →
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/mapa-colombia">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaMap className="text-green-500 mb-4" size={60} />
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                  Mapa de Colombia
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Descubre Colombia con vistas satelitales de Google Earth
                </p>
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  Explorar →
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/globo-terraqueo">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaGlobe className="text-blue-500 mb-4" size={60} />
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                  Globo Terráqueo
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Navega por el planeta Tierra con Google Earth interactivo
                </p>
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  Explorar →
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/simulacion-robots">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaRobot className="text-purple-500 mb-4" size={60} />
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                  Simulación de Robots
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Interactúa con 4 tipos de robots en 3D: explorador, brazo, humanoide y dron
                </p>
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  Explorar →
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
