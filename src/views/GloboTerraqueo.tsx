import { GlobeIcon } from '../components/icons';
import CesiumGlobe from '../components/CesiumGlobe';
import { useNarrator } from '../hooks/useNarrator';
import { getRandomEarthCuriosity, getCuriositiesByCategory, type EarthCuriosity } from '../data/earthCuriosities';
import { MicrophoneIcon, StarIcon, SpeakerIcon, DiceIcon, StopIcon, LightbulbIcon } from '../components/icons/NarratorIcons';
import { useState } from 'react';

export default function GloboTerraqueo() {
  const { speak, stop, isSpeaking, currentText } = useNarrator();
  const [selectedCategory, setSelectedCategory] = useState<EarthCuriosity['category'] | null>(null);

  const handleNarrateCuriosity = (curiosity: EarthCuriosity) => {
    speak(curiosity.text, {
      points: curiosity.points,
      onComplete: () => {
        console.log(`¡Narración completada! Ganaste ${curiosity.points} puntos por aprender sobre ${curiosity.title}`);
      }
    });
  };

  const handleRandomCuriosity = () => {
    const curiosity = getRandomEarthCuriosity();
    handleNarrateCuriosity(curiosity);
  };
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
          <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
            🌍 Datos Curiosos sobre la Tierra
          </h3>
          
          {/* Estadísticas principales */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">510.1</div>
              <div className="text-sm font-medium text-slate-800 dark:text-slate-100">Millones km²</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Superficie total</div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">8.04</div>
              <div className="text-sm font-medium text-slate-800 dark:text-slate-100">Mil millones</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Habitantes</div>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-center">
              <div className="text-2xl font-bold text-amber-600 mb-1">4.54</div>
              <div className="text-sm font-medium text-slate-800 dark:text-slate-100">Mil millones años</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Edad aproximada</div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">71%</div>
              <div className="text-sm font-medium text-slate-800 dark:text-slate-100">Superficie</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Cubierta por agua</div>
            </div>
          </div>

          {/* Información detallada */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                🌊 Océanos y Agua
              </h4>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• 97% del agua es salada</li>
                <li>• El océano Pacífico cubre 1/3 de la Tierra</li>
                <li>• La fosa más profunda: Mariana (11km)</li>
                <li>• 5 grandes giros oceánicos</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                🏔️ Geografía
              </h4>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Monte Everest: 8,848m sobre el nivel del mar</li>
                <li>• Punto más bajo: Valle de la Muerte (-86m)</li>
                <li>• Desierto más grande: Sáhara (9.2M km²)</li>
                <li>• 7 continentes, 195 países</li>
              </ul>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                🌡️ Clima y Atmósfera
              </h4>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Temperatura media: 15°C</li>
                <li>• Atmósfera: 78% Nitrógeno, 21% Oxígeno</li>
                <li>• 5 zonas climáticas principales</li>
                <li>• Cambio climático afecta el 97% de la superficie</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                🌱 Biodiversidad
              </h4>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Más de 8.7M especies conocidas</li>
                <li>• 1.7M especies en peligro de extinción</li>
                <li>• Amazonía: "Pulmón del mundo"</li>
                <li>• Gran Barrera de Coral: 2,300km</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                🌍 Hechos Curiosos
              </h4>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Gira a 1,670km/h en el ecuador</li>
                <li>• Un día tiene 24 horas, un año 365.25 días</li>
                <li>• La Luna se aleja 3.8cm al año</li>
                <li>• Tiene un gemelo invisible: Punto L5</li>
              </ul>
            </div>
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                🚀 Exploración Espacial
              </h4>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Primera órbita: Sputnik 1 (1957)</li>
                <li>• Primer hombre en la Luna: Neil Armstrong (1969)</li>
                <li>• Estación Espacial Internacional: 400km altura</li>
                <li>• Más de 5,000 satélites activos</li>
              </ul>
            </div>
          </div>

          {/* Sección de continentes y océanos */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">Continentes y Océanos</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-2 text-slate-700 dark:text-slate-300">7 Continentes</h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="text-slate-700 dark:text-slate-200">África (30.3M km²)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    <span className="text-slate-700 dark:text-slate-200">América (42.5M km²)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-white border border-slate-400 rounded-full"></span>
                    <span className="text-slate-700 dark:text-slate-200">Antártida (14.2M km²)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="text-slate-700 dark:text-slate-200">Asia (44.6M km²)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="text-slate-700 dark:text-slate-200">Europa (10.2M km²)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                    <span className="text-slate-700 dark:text-slate-200">Oceanía (8.5M km²)</span>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-medium mb-2 text-slate-700 dark:text-slate-300">5 Océanos</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-700 dark:text-slate-200">🌊 Pacífico</span>
                    <span className="text-slate-600 dark:text-slate-300">168.7M km²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700 dark:text-slate-200">🌊 Atlántico</span>
                    <span className="text-slate-600 dark:text-slate-300">85.1M km²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700 dark:text-slate-200">🌊 Índico</span>
                    <span className="text-slate-600 dark:text-slate-300">70.6M km²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700 dark:text-slate-200">🌊 Ártico</span>
                    <span className="text-slate-600 dark:text-slate-300">14.1M km²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700 dark:text-slate-200">🌊 Antártico</span>
                    <span className="text-slate-600 dark:text-slate-300">20.3M km²</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Narración con IA */}
      <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-teal-900/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-full flex items-center justify-center animate-bounce">
            <MicrophoneIcon size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              ¡Narrador Terrestre Mágico! 🌍
              <span className="text-3xl animate-pulse">✨</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
              ¡Descubre datos CHEVRES sobre la Tierra y gana puntos!
              <StarIcon size={16} className="text-yellow-500 animate-spin" />
            </p>
          </div>
        </div>

        {isSpeaking && (
          <div className="mb-6 p-4 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-lg border-l-4 border-cyan-500 animate-pulse">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
              <span className="font-bold text-cyan-800 dark:text-cyan-200 text-lg">¡Narrando...!</span>
            </div>
            <p className="text-sm text-cyan-700 dark:text-cyan-300 font-medium">{currentText}</p>
          </div>
        )}

        {/* Categorías */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            { id: 'oceano' as const, name: 'Océanos Profundos', color: 'from-blue-400 to-cyan-500', emoji: '🌊' },
            { id: 'continente' as const, name: 'Continentes', color: 'from-green-400 to-emerald-500', emoji: '🌍' },
            { id: 'clima' as const, name: 'Climas Extremos', color: 'from-orange-400 to-red-500', emoji: '🌡️' },
            { id: 'biodiversidad' as const, name: 'Biodiversidad', color: 'from-purple-400 to-pink-500', emoji: '🦋' },
            { id: 'historia' as const, name: 'Historia Geológica', color: 'from-yellow-400 to-amber-500', emoji: '⏳' },
            { id: 'geografia' as const, name: 'Geografía', color: 'from-indigo-400 to-blue-500', emoji: '🏔️' }
          ].map((category) => (
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
              {[
                { id: 'oceano', emoji: '🌊', name: 'Océanos Profundos' },
                { id: 'continente', emoji: '🌍', name: 'Continentes' },
                { id: 'clima', emoji: '🌡️', name: 'Climas Extremos' },
                { id: 'biodiversidad', emoji: '🦋', name: 'Biodiversidad' },
                { id: 'historia', emoji: '⏳', name: 'Historia Geológica' },
                { id: 'geografia', emoji: '🏔️', name: 'Geografía' }
              ].find(c => c.id === selectedCategory)?.emoji}
              {[
                { id: 'oceano', emoji: '🌊', name: 'Océanos Profundos' },
                { id: 'continente', emoji: '🌍', name: 'Continentes' },
                { id: 'clima', emoji: '🌡️', name: 'Climas Extremos' },
                { id: 'biodiversidad', emoji: '🦋', name: 'Biodiversidad' },
                { id: 'historia', emoji: '⏳', name: 'Historia Geológica' },
                { id: 'geografia', emoji: '🏔️', name: 'Geografía' }
              ].find(c => c.id === selectedCategory)?.name}
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {getCuriositiesByCategory(selectedCategory).map((curiosity) => (
                <button
                  key={curiosity.id}
                  onClick={() => handleNarrateCuriosity(curiosity)}
                  disabled={isSpeaking}
                  className="p-4 bg-white dark:bg-slate-800 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-102"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl">{curiosity.emoji}</div>
                    <div className="flex items-center gap-1 bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      <StarIcon size={12} className="text-white" />
                      +{curiosity.points}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1">
                      {curiosity.title}
                    </div>
                    <div className="flex items-center gap-1 text-cyan-500">
                      <SpeakerIcon size={14} className="text-cyan-500" />
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
            className="flex-1 p-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <div className="flex items-center justify-center gap-3">
              <DiceIcon size={28} className="text-white animate-spin" />
              <div className="text-left">
                <div className="font-bold text-lg">¡SORPRESA!</div>
                <div className="text-sm opacity-90">Curiosidad Aleatoria</div>
                <div className="text-xs opacity-75">+8-20 puntos</div>
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
            <strong className="text-cyan-600 dark:text-cyan-400">¡CONSEJO CHEVRE!</strong>
            <span>Escucha todas las curiosidades para convertirte en un experto de la Tierra y ganar montones de puntos. ¡Es como una aventura alrededor del mundo! 🌍✨</span>
          </p>
        </div>
      </div>
    </div>
  );
}
