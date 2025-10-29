import { motion } from "framer-motion";
import { useScore } from "../context/ScoreContext";
import { Link } from "react-router-dom";

export default function HomeContent() {
  const { totalScore } = useScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Logo del Colegio */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 mb-6 shadow-lg">
              <span className="text-3xl font-bold text-white">🎓</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Colegio Mentes Creativas
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Aprendizaje lúdico y multimedia para estudiantes de 4° y 5° grado
            </p>

            {/* Puntaje Total */}
            <div className="inline-flex items-center gap-3 bg-white dark:bg-slate-800 px-6 py-3 rounded-full shadow-md mb-8">
              <span className="text-2xl">🏆</span>
              <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                Puntaje Total: {totalScore} puntos
              </span>
            </div>
          </motion.div>
        </div>

        {/* Áreas de Aprendizaje */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link to="/matematicas">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-6xl mb-4">🧮</div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                  Matemáticas
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Explora números, geometría y operaciones matemáticas con ejercicios interactivos.
                </p>
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  Comenzar lección →
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/ciencias-naturales">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-6xl mb-4">🌿</div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                  Ciencias Naturales
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Descubre el fascinante mundo de la naturaleza, plantas, animales y el universo.
                </p>
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  Comenzar lección →
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/pensamiento-logico">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-6xl mb-4">🧠</div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                  Pensamiento Lógico
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Desarrolla tu capacidad de razonamiento con acertijos y problemas lógicos.
                </p>
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  Comenzar lección →
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Información del Colegio */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Sobre Nuestro Colegio
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-6">
            El Colegio Mentes Creativas se dedica a formar estudiantes curiosos y capaces mediante
            el uso de tecnología educativa innovadora. Nuestros recursos multimedia están diseñados
            para hacer el aprendizaje divertido y efectivo, combinando teoría con práctica interactiva.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Objetivos</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Desarrollar habilidades cognitivas y fomentar el amor por el aprendizaje
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📚</div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Metodología</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Aprendizaje lúdico con recursos multimedia interactivos
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🌟</div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Resultados</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Estudiantes motivados y preparados para los desafíos del futuro
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
