import { MapIcon } from '../components/icons';
import { useNarrator } from '../hooks/useNarrator';
import { getRandomColombiaCuriosity, getCuriositiesByCategory, type ColombiaCuriosity } from '../data/colombiaCuriosities';
import { MicrophoneIcon, StarIcon, SpeakerIcon, DiceIcon, StopIcon, LightbulbIcon } from '../components/icons/NarratorIcons';
import { useState } from 'react';
import { useScore } from '../context/ScoreContext';

export default function MapaColombia() {
  const { speak, stop, isSpeaking, currentText } = useNarrator();
  const [selectedCategory, setSelectedCategory] = useState<ColombiaCuriosity['category'] | null>(null);
  const { totalScore } = useScore();

  const handleNarrateCuriosity = (curiosity: ColombiaCuriosity) => {
    speak(curiosity.text, {
      points: curiosity.points,
      onComplete: () => {
        console.log(`¡Narración completada! Ganaste ${curiosity.points} puntos por aprender sobre ${curiosity.title}`);
      }
    });
  };

  const handleRandomCuriosity = () => {
    const curiosity = getRandomColombiaCuriosity();
    handleNarrateCuriosity(curiosity);
  };

  const categories = [
    { id: 'animales' as const, name: 'Animales Fantásticos', color: 'from-green-400 to-emerald-500', emoji: '🦜' },
    { id: 'lugares' as const, name: 'Lugares Mágicos', color: 'from-blue-400 to-cyan-500', emoji: '🏔️' },
    { id: 'comida' as const, name: 'Comidas Deliciosas', color: 'from-orange-400 to-red-500', emoji: '🍌' },
    { id: 'tradiciones' as const, name: 'Fiestas y Tradiciones', color: 'from-purple-400 to-pink-500', emoji: '🎉' },
    { id: 'biodiversidad' as const, name: 'Biodiversidad Increíble', color: 'from-teal-400 to-green-500', emoji: '🌿' },
    { id: 'historia' as const, name: 'Historia Divertida', color: 'from-yellow-400 to-orange-500', emoji: '📚' }
  ];

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

        {/* Sección de Narración con IA */}
        <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-full flex items-center justify-center animate-bounce">
              <MicrophoneIcon size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                ¡Narrador Colombiano Mágico! 🇨🇴
                <span className="text-3xl animate-pulse">✨</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                ¡Descubre datos CHEVRES sobre Colombia y gana puntos!
                <StarIcon size={16} className="text-yellow-500 animate-spin" />
                <span className="font-bold text-orange-600">SCORE ACTUAL: {totalScore}</span>
              </p>
            </div>
          </div>

          {isSpeaking && (
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border-l-4 border-blue-500 animate-pulse">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                <span className="font-bold text-blue-800 dark:text-blue-200 text-lg">¡Narrando...!</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">{currentText}</p>
            </div>
          )}

          {/* Categorías */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className={`p-4 bg-gradient-to-r ${category.color} hover:scale-105 transition-all duration-300 rounded-xl shadow-lg text-white font-bold text-center transform hover:shadow-xl`}
              >
                <div className="text-3xl mb-2">{category.emoji}</div>
                <div className="text-sm">{category.name}</div>
              </button>
            ))}
          </div>

          {/* Curiosidades por categoría */}
          {selectedCategory && (
            <div className="mb-6">
              <h4 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                {categories.find(c => c.id === selectedCategory)?.emoji}
                {categories.find(c => c.id === selectedCategory)?.name}
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                {getCuriositiesByCategory(selectedCategory).map((curiosity) => (
                  <button
                    key={curiosity.id}
                    onClick={() => handleNarrateCuriosity(curiosity)}
                    disabled={isSpeaking}
                    className="p-4 bg-white dark:bg-slate-800 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 dark:hover:from-yellow-900/20 dark:hover:to-orange-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-102"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-2xl">{curiosity.emoji}</div>
                      <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        <StarIcon size={12} className="text-white" />
                        +{curiosity.points}
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1">
                        {curiosity.title}
                      </div>
                      <div className="flex items-center gap-1 text-blue-500">
                        <SpeakerIcon size={14} className="text-blue-500" />
                        <span className="text-xs font-medium">¡Escuchar!</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Curiosidad aleatoria */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleRandomCuriosity}
              disabled={isSpeaking}
              className="flex-1 p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="flex items-center justify-center gap-3">
                <DiceIcon size={28} className="text-white animate-spin" />
                <div className="text-left">
                  <div className="font-bold text-lg">¡SORPRESA!</div>
                  <div className="text-sm opacity-90">Curiosidad Aleatoria</div>
                  <div className="text-xs opacity-75">+8-18 puntos</div>
                </div>
              </div>
            </button>

            {isSpeaking && (
              <button
                onClick={stop}
                className="p-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <div className="flex items-center justify-center gap-2">
                  <StopIcon size={20} className="text-white" />
                  <span className="font-bold">¡Detener!</span>
                </div>
              </button>
            )}
          </div>

          <div className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
            <p className="flex items-center justify-center gap-2">
              <LightbulbIcon size={16} className="text-yellow-500 animate-pulse" />
              <strong className="text-orange-600 dark:text-orange-400">¡CONSEJO CHEVRE!</strong>
              <span>Escucha todas las curiosidades para convertirte en un experto de Colombia y ganar montones de puntos. ¡Es como una aventura mágica! 🌟</span>
            </p>
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
