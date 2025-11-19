import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Cylinder } from '@react-three/drei';
import { RobotIcon } from './icons';
import { useNarrator } from '../hooks/useNarrator';
import { getRandomRobotCuriosity, getCuriositiesByCategory, type RobotCuriosity } from '../data/robotCuriosities';
import { MicrophoneIcon, StarIcon, SpeakerIcon, DiceIcon, StopIcon, LightbulbIcon } from './icons/NarratorIcons';
import * as THREE from 'three';

interface RobotConfig {
  name: string;
  description: string;
  color: string;
  speed: number;
}

const robotTypes: RobotConfig[] = [
  {
    name: 'Robot Explorador',
    description: 'Robot móvil con ruedas para exploración de terrenos',
    color: '#3b82f6',
    speed: 1,
  },
  {
    name: 'Robot Brazo',
    description: 'Brazo robótico industrial para manufactura',
    color: '#f59e0b',
    speed: 0.5,
  },
  {
    name: 'Robot Humanoide',
    description: 'Robot con forma humana para interacción social',
    color: '#10b981',
    speed: 0.7,
  },
  {
    name: 'Dron Volador',
    description: 'Robot aéreo con 4 hélices para vigilancia',
    color: '#8b5cf6',
    speed: 1.5,
  },
];

function ExplorerRobot({ color, isActive }: { color: string; isActive: boolean }) {
  const robotRef = useRef<THREE.Group>(null);
  const wheelRef1 = useRef<THREE.Mesh>(null);
  const wheelRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (robotRef.current && isActive) {
      robotRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2;
      robotRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * Math.PI;
    }
    if (wheelRef1.current && isActive) {
      wheelRef1.current.rotation.x += 0.1;
    }
    if (wheelRef2.current && isActive) {
      wheelRef2.current.rotation.x += 0.1;
    }
  });

  return (
    <group ref={robotRef}>
      <Box args={[1, 0.6, 0.8]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </Box>
      <Box args={[0.6, 0.5, 0.6]} position={[0, 1.05, 0]}>
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </Box>
      <Sphere args={[0.08, 16, 16]} position={[-0.15, 1.1, 0.31]}>
        <meshStandardMaterial color="#ffffff" emissive="#00ff00" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0.15, 1.1, 0.31]}>
        <meshStandardMaterial color="#ffffff" emissive="#00ff00" emissiveIntensity={0.5} />
      </Sphere>
      <Cylinder ref={wheelRef1} args={[0.25, 0.25, 0.15, 16]} position={[-0.6, 0.25, 0.5]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#1f2937" />
      </Cylinder>
      <Cylinder ref={wheelRef2} args={[0.25, 0.25, 0.15, 16]} position={[-0.6, 0.25, -0.5]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#1f2937" />
      </Cylinder>
      <Cylinder args={[0.25, 0.25, 0.15, 16]} position={[0.6, 0.25, 0.5]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#1f2937" />
      </Cylinder>
      <Cylinder args={[0.25, 0.25, 0.15, 16]} position={[0.6, 0.25, -0.5]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#1f2937" />
      </Cylinder>
    </group>
  );
}

function RobotArm({ color, isActive }: { color: string; isActive: boolean }) {
  const armRef = useRef<THREE.Group>(null);
  const joint1Ref = useRef<THREE.Group>(null);
  const joint2Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (armRef.current && isActive) {
      armRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.8;
    }
    if (joint1Ref.current && isActive) {
      joint1Ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.7) * 0.5;
    }
    if (joint2Ref.current && isActive) {
      joint2Ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.9) * 0.4;
    }
  });

  return (
    <group ref={armRef}>
      <Cylinder args={[0.5, 0.6, 0.3, 16]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Cylinder>
      <group ref={joint1Ref} position={[0, 0.3, 0]}>
        <Cylinder args={[0.15, 0.15, 1.2, 16]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
        </Cylinder>
        <group ref={joint2Ref} position={[0, 1.2, 0]}>
          <Cylinder args={[0.12, 0.12, 1, 16]} position={[0, 0.5, 0]}>
            <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
          </Cylinder>
          <Box args={[0.25, 0.15, 0.08]} position={[-0.1, 1, 0]}>
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
          </Box>
          <Box args={[0.25, 0.15, 0.08]} position={[0.1, 1, 0]}>
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
          </Box>
        </group>
      </group>
    </group>
  );
}

function HumanoidRobot({ color, isActive }: { color: string; isActive: boolean }) {
  const robotRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (robotRef.current && isActive) {
      robotRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.8) * 1.5;
    }
    if (leftArmRef.current && isActive) {
      leftArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
    if (rightArmRef.current && isActive) {
      rightArmRef.current.rotation.x = -Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <group ref={robotRef}>
      <Box args={[0.8, 1.2, 0.5]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </Box>
      <Sphere args={[0.35, 32, 32]} position={[0, 2.15, 0]}>
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[-0.15, 2.2, 0.35]}>
        <meshStandardMaterial color="#ffffff" emissive="#00bfff" emissiveIntensity={0.6} />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0.15, 2.2, 0.35]}>
        <meshStandardMaterial color="#ffffff" emissive="#00bfff" emissiveIntensity={0.6} />
      </Sphere>
      <group ref={leftArmRef} position={[-0.55, 1.6, 0]}>
        <Cylinder args={[0.12, 0.12, 0.9, 16]} position={[0, -0.45, 0]}>
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </Cylinder>
      </group>
      <group ref={rightArmRef} position={[0.55, 1.6, 0]}>
        <Cylinder args={[0.12, 0.12, 0.9, 16]} position={[0, -0.45, 0]}>
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </Cylinder>
      </group>
      <Cylinder args={[0.15, 0.15, 1, 16]} position={[-0.25, 0.5, 0]}>
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </Cylinder>
      <Cylinder args={[0.15, 0.15, 1, 16]} position={[0.25, 0.5, 0]}>
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </Cylinder>
    </group>
  );
}

function DroneRobot({ color, isActive }: { color: string; isActive: boolean }) {
  const droneRef = useRef<THREE.Group>(null);
  const propeller1 = useRef<THREE.Mesh>(null);
  const propeller2 = useRef<THREE.Mesh>(null);
  const propeller3 = useRef<THREE.Mesh>(null);
  const propeller4 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (droneRef.current && isActive) {
      droneRef.current.position.y = 2 + Math.sin(state.clock.elapsedTime) * 0.3;
      droneRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 1.5;
    }
    if (isActive) {
      [propeller1, propeller2, propeller3, propeller4].forEach(prop => {
        if (prop.current) prop.current.rotation.y += 0.5;
      });
    }
  });

  return (
    <group ref={droneRef} position={[0, 2, 0]}>
      <Sphere args={[0.3, 16, 16]}>
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </Sphere>
      <Box args={[1.5, 0.08, 0.08]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.08, 0.08, 1.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </Box>
      <Box ref={propeller1} args={[0.4, 0.02, 0.08]} position={[0.75, 0.1, 0.75]}>
        <meshStandardMaterial color="#64748b" transparent opacity={0.7} />
      </Box>
      <Box ref={propeller2} args={[0.4, 0.02, 0.08]} position={[-0.75, 0.1, 0.75]}>
        <meshStandardMaterial color="#64748b" transparent opacity={0.7} />
      </Box>
      <Box ref={propeller3} args={[0.4, 0.02, 0.08]} position={[0.75, 0.1, -0.75]}>
        <meshStandardMaterial color="#64748b" transparent opacity={0.7} />
      </Box>
      <Box ref={propeller4} args={[0.4, 0.02, 0.08]} position={[-0.75, 0.1, -0.75]}>
        <meshStandardMaterial color="#64748b" transparent opacity={0.7} />
      </Box>
      <Sphere args={[0.05, 8, 8]} position={[0, -0.2, 0.25]}>
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1} />
      </Sphere>
    </group>
  );
}

export default function RobotSimulator() {
  const [selectedRobot, setSelectedRobot] = useState<RobotConfig>(robotTypes[0]);
  const [isActive, setIsActive] = useState(true);
  const { speak, stop, isSpeaking, currentText } = useNarrator();
  const [selectedCategory, setSelectedCategory] = useState<RobotCuriosity['category'] | null>(null);

  const handleNarrateCuriosity = (curiosity: RobotCuriosity) => {
    speak(curiosity.text, {
      points: curiosity.points,
      onComplete: () => {
        console.log(`¡Narración completada! Ganaste ${curiosity.points} puntos por aprender sobre ${curiosity.title}`);
      }
    });
  };

  const handleRandomCuriosity = () => {
    const curiosity = getRandomRobotCuriosity();
    handleNarrateCuriosity(curiosity);
  };

  const renderRobot = () => {
    switch (selectedRobot.name) {
      case 'Robot Explorador':
        return <ExplorerRobot color={selectedRobot.color} isActive={isActive} />;
      case 'Robot Brazo':
        return <RobotArm color={selectedRobot.color} isActive={isActive} />;
      case 'Robot Humanoide':
        return <HumanoidRobot color={selectedRobot.color} isActive={isActive} />;
      case 'Dron Volador':
        return <DroneRobot color={selectedRobot.color} isActive={isActive} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <RobotIcon size={32} className="text-purple-600" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Simulación de Robots
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Explora diferentes tipos de robots y sus movimientos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              {selectedRobot.name}
            </h3>
            <div className="h-[500px] bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
              <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 8, 5]} intensity={0.8} />
                <directionalLight position={[-3, -3, -3]} intensity={0.3} />
                {renderRobot()}
                <OrbitControls enableZoom={true} enablePan={false} target={[0, 1, 0]} />
                <gridHelper args={[10, 10, '#94a3b8', '#cbd5e1']} position={[0, 0, 0]} />
              </Canvas>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setIsActive(!isActive)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  isActive
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isActive ? '⏸ Pausar' : '▶ Activar'}
              </button>
              <div className="flex-1 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {selectedRobot.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Tipos de Robots
            </h3>
            <div className="space-y-2">
              {robotTypes.map((robot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedRobot(robot)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedRobot.name === robot.name
                      ? 'ring-2 ring-offset-2'
                      : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                  style={{
                    backgroundColor: selectedRobot.name === robot.name ? `${robot.color}20` : undefined,
                    borderColor: selectedRobot.name === robot.name ? robot.color : undefined,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: robot.color }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 dark:text-slate-100">
                        {robot.name}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Velocidad: {robot.speed}x
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">Robótica</h3>
            <div className="space-y-2 text-sm">
              <p>• Diseño de máquinas programables</p>
              <p>• Sensores y actuadores</p>
              <p>• Inteligencia artificial</p>
              <p>• Automatización industrial</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
          Aplicaciones de la Robótica
        </h3>
        <div className="grid md:grid-cols-4 gap-4 text-slate-700 dark:text-slate-300">
          <div>
            <h4 className="font-semibold mb-2">Industria</h4>
            <p className="text-sm">Manufactura, ensamblaje y control de calidad automatizado.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Medicina</h4>
            <p className="text-sm">Cirugías de precisión y rehabilitación asistida.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Exploración</h4>
            <p className="text-sm">Drones, rovers espaciales y robots submarinos.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Hogar</h4>
            <p className="text-sm">Aspiradoras, asistentes y robots de compañía.</p>
          </div>
        </div>
      </div>

      {/* Sección de Narración con IA */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce">
            <MicrophoneIcon size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              ¡Narrador Robótico Inteligente! 🤖
              <span className="text-3xl animate-pulse">⚡</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
              ¡Descubre datos CHEVRES sobre robots y gana puntos!
              <StarIcon size={16} className="text-yellow-500 animate-spin" />
            </p>
          </div>
        </div>

        {isSpeaking && (
          <div className="mb-6 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg border-l-4 border-indigo-500 animate-pulse">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
              <span className="font-bold text-indigo-800 dark:text-indigo-200 text-lg">¡Narrando...!</span>
            </div>
            <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">{currentText}</p>
          </div>
        )}

        {/* Categorías */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            { id: 'explorador' as const, name: 'Robots Exploradores', color: 'from-blue-400 to-cyan-500', emoji: '🚗' },
            { id: 'industrial' as const, name: 'Robots Industriales', color: 'from-orange-400 to-red-500', emoji: '🏭' },
            { id: 'humanoide' as const, name: 'Robots Humanoides', color: 'from-green-400 to-emerald-500', emoji: '🤖' },
            { id: 'dron' as const, name: 'Drones y Voladores', color: 'from-purple-400 to-pink-500', emoji: '🚁' },
            { id: 'historia' as const, name: 'Historia de Robots', color: 'from-yellow-400 to-amber-500', emoji: '📚' },
            { id: 'futuro' as const, name: 'Futuro Robótico', color: 'from-indigo-400 to-blue-500', emoji: '🔮' }
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
                { id: 'explorador', emoji: '🚗', name: 'Robots Exploradores' },
                { id: 'industrial', emoji: '🏭', name: 'Robots Industriales' },
                { id: 'humanoide', emoji: '🤖', name: 'Robots Humanoides' },
                { id: 'dron', emoji: '🚁', name: 'Drones y Voladores' },
                { id: 'historia', emoji: '📚', name: 'Historia de Robots' },
                { id: 'futuro', emoji: '🔮', name: 'Futuro Robótico' }
              ].find(c => c.id === selectedCategory)?.emoji}
              {[
                { id: 'explorador', emoji: '🚗', name: 'Robots Exploradores' },
                { id: 'industrial', emoji: '🏭', name: 'Robots Industriales' },
                { id: 'humanoide', emoji: '🤖', name: 'Robots Humanoides' },
                { id: 'dron', emoji: '🚁', name: 'Drones y Voladores' },
                { id: 'historia', emoji: '📚', name: 'Historia de Robots' },
                { id: 'futuro', emoji: '🔮', name: 'Futuro Robótico' }
              ].find(c => c.id === selectedCategory)?.name}
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {getCuriositiesByCategory(selectedCategory).map((curiosity) => (
                <button
                  key={curiosity.id}
                  onClick={() => handleNarrateCuriosity(curiosity)}
                  disabled={isSpeaking}
                  className="p-4 bg-white dark:bg-slate-800 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-900/20 dark:hover:to-indigo-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-102"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl">{curiosity.emoji}</div>
                    <div className="flex items-center gap-1 bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      <StarIcon size={12} className="text-white" />
                      +{curiosity.points}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1">
                      {curiosity.title}
                    </div>
                    <div className="flex items-center gap-1 text-indigo-500">
                      <SpeakerIcon size={14} className="text-indigo-500" />
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
            className="flex-1 p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
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
            <strong className="text-indigo-600 dark:text-indigo-400">¡CONSEJO CHEVRE!</strong>
            <span>Escucha todas las curiosidades para convertirte en un experto en robótica y ganar montones de puntos. ¡El futuro está en tus manos! 🤖⚡</span>
          </p>
        </div>
      </div>
    </div>
  );
}
