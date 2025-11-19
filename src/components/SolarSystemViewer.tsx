import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { SaturnIcon } from './icons';
import { useNarrator } from '../hooks/useNarrator';
import { getCuriosityByPlanet, getRandomCuriosity, type Curiosity } from '../data/solarSystemCuriosities';
import { MicrophoneIcon, StarIcon, SpeakerIcon, DiceIcon, StopIcon, LightbulbIcon } from './icons/NarratorIcons';
import * as THREE from 'three';

interface Planet {
  name: string;
  color: string;
  size: number;
  distance: number;
  speed: number;
  info: string;
}

const planets: Planet[] = [
  { name: 'Mercurio', color: '#9ca3af', size: 0.15, distance: 2, speed: 4.7, info: 'El planeta más cercano al Sol' },
  { name: 'Venus', color: '#fbbf24', size: 0.25, distance: 3, speed: 3.5, info: 'El planeta más caliente' },
  { name: 'Tierra', color: '#3b82f6', size: 0.25, distance: 4, speed: 3.0, info: 'Nuestro hogar' },
  { name: 'Marte', color: '#ef4444', size: 0.2, distance: 5, speed: 2.4, info: 'El planeta rojo' },
  { name: 'Júpiter', color: '#fb923c', size: 0.5, distance: 7, speed: 1.3, info: 'El planeta más grande' },
  { name: 'Saturno', color: '#fde047', size: 0.45, distance: 9, speed: 0.9, info: 'Famoso por sus anillos' },
  { name: 'Urano', color: '#22d3ee', size: 0.35, distance: 11, speed: 0.7, info: 'Gira de lado' },
  { name: 'Neptuno', color: '#3b82f6', size: 0.35, distance: 12.5, speed: 0.5, info: 'El planeta más lejano' },
];

function OrbitingPlanet({ planet }: { planet: Planet }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * planet.speed * 0.1;
    }
  });

  return (
    <group ref={orbitRef}>
      <Sphere ref={meshRef} position={[planet.distance, 0, 0]} args={[planet.size, 32, 32]}>
        <meshStandardMaterial color={planet.color} />
      </Sphere>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[planet.distance, 0.01, 16, 100]} />
        <meshBasicMaterial color="#475569" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function SolarSystemViewer() {
  const { speak, stop, isSpeaking, currentText } = useNarrator();

  const handleNarrateCuriosity = (curiosity: Curiosity) => {
    speak(curiosity.text, {
      points: curiosity.points,
      onComplete: () => {
        console.log(`¡Narración completada! Ganaste ${curiosity.points} puntos por aprender sobre ${curiosity.title}`);
      }
    });
  };

  const handleRandomCuriosity = () => {
    const curiosity = getRandomCuriosity();
    handleNarrateCuriosity(curiosity);
  };
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <SaturnIcon size={32} className="text-yellow-500" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Sistema Solar Interactivo
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Explora los planetas de nuestro sistema solar
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Vista 3D del Sistema Solar
            </h3>
            <div className="h-[600px] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-lg overflow-hidden">
              <Canvas camera={{ position: [0, 20, 25], fov: 60 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[0, 0, 0]} intensity={3} color="#fbbf24" />
                
                <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
                  <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} />
                </Sphere>

                {planets.map((planet, index) => (
                  <OrbitingPlanet key={index} planet={planet} />
                ))}

                <OrbitControls enableZoom={true} enablePan={false} maxDistance={50} minDistance={8} target={[0, 0, 0]} />
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                  <planeGeometry args={[100, 100]} />
                  <meshStandardMaterial color="#0f172a" transparent opacity={0.3} />
                </mesh>
              </Canvas>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Planetas
            </h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {planets.map((planet, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: planet.color }}
                    />
                    <div className="font-semibold text-slate-800 dark:text-slate-100">
                      {planet.name}
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {planet.info}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    Distancia: {planet.distance} UA
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Narración con IA */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <MicrophoneIcon size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              Narrador Espacial
              <SaturnIcon size={24} className="text-yellow-500" />
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
              ¡Escucha datos curiosos y gana puntos!
              <StarIcon size={16} className="text-yellow-500" />
            </p>
          </div>
        </div>

        {isSpeaking && (
          <div className="mb-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-blue-800 dark:text-blue-200">Narrando...</span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">{currentText}</p>
          </div>
        )}

        <div className="grid md:grid-cols-1 gap-4 mb-4">
          <div>
            <h4 className="font-semibold mb-3 text-slate-800 dark:text-slate-100">Curiosidades por Planeta</h4>
            <div className="space-y-2">
              {planets.map((planet, index) => {
                const curiosity = getCuriosityByPlanet(planet.name);
                return curiosity ? (
                  <button
                    key={index}
                    onClick={() => handleNarrateCuriosity(curiosity)}
                    disabled={isSpeaking}
                    className="w-full p-3 text-left bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: planet.color }}
                        />
                        <span className="font-medium text-slate-800 dark:text-slate-100">{planet.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-500 dark:text-slate-400">+{curiosity.points} pts</span>
                        <SpeakerIcon size={16} className="text-blue-500" />
                      </div>
                    </div>
                  </button>
                ) : null;
              })}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-slate-800 dark:text-slate-100">Otras Curiosidades</h4>
          <div className="space-y-2">
            <button
              onClick={handleRandomCuriosity}
              disabled={isSpeaking}
              className="w-full p-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <div className="flex items-center justify-center gap-2">
                <DiceIcon size={24} className="text-white" />
                <div className="text-left">
                  <div className="font-semibold">¡Curiosidad Aleatoria!</div>
                  <div className="text-sm opacity-90">+8-15 puntos</div>
                </div>
              </div>
            </button>

            {isSpeaking && (
              <button
                onClick={stop}
                className="w-full p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
              >
                <div className="flex items-center justify-center gap-2">
                  <StopIcon size={16} className="text-white" />
                  <span className="font-semibold">Detener Narración</span>
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="text-center text-sm text-slate-600 dark:text-slate-400">
          <p className="flex items-center justify-center gap-2">
            <LightbulbIcon size={16} className="text-yellow-500" />
            <strong>¡Consejo!</strong> Escucha todas las narraciones para aprender datos fascinantes sobre el espacio y ganar más puntos.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
          Datos del Sistema Solar
        </h3>
        <div className="grid md:grid-cols-4 gap-4 text-slate-700 dark:text-slate-300">
          <div>
            <h4 className="font-semibold mb-2">El Sol</h4>
            <p className="text-sm">Contiene el 99.86% de la masa del sistema solar.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">8 Planetas</h4>
            <p className="text-sm">4 rocosos internos y 4 gigantes gaseosos externos.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Cinturón de Asteroides</h4>
            <p className="text-sm">Entre Marte y Júpiter, millones de rocas espaciales.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">La Tierra</h4>
            <p className="text-sm">El único planeta conocido con vida.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
