import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Cylinder } from '@react-three/drei';
import { RobotIcon } from '../components/icons';
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

// Robot Explorador con ruedas
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
      {/* Cuerpo */}
      <Box args={[1, 0.6, 0.8]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </Box>
      {/* Cabeza */}
      <Box args={[0.6, 0.5, 0.6]} position={[0, 1.05, 0]}>
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </Box>
      {/* Ojos */}
      <Sphere args={[0.08, 16, 16]} position={[-0.15, 1.1, 0.31]}>
        <meshStandardMaterial color="#ffffff" emissive="#00ff00" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0.15, 1.1, 0.31]}>
        <meshStandardMaterial color="#ffffff" emissive="#00ff00" emissiveIntensity={0.5} />
      </Sphere>
      {/* Ruedas */}
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

// Brazo Robótico
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
      {/* Base */}
      <Cylinder args={[0.5, 0.6, 0.3, 16]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Cylinder>
      {/* Articulación 1 */}
      <group ref={joint1Ref} position={[0, 0.3, 0]}>
        <Cylinder args={[0.15, 0.15, 1.2, 16]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
        </Cylinder>
        {/* Articulación 2 */}
        <group ref={joint2Ref} position={[0, 1.2, 0]}>
          <Cylinder args={[0.12, 0.12, 1, 16]} position={[0, 0.5, 0]}>
            <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
          </Cylinder>
          {/* Pinza */}
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

// Robot Humanoide
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
      {/* Cuerpo */}
      <Box args={[0.8, 1.2, 0.5]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </Box>
      {/* Cabeza */}
      <Sphere args={[0.35, 32, 32]} position={[0, 2.15, 0]}>
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </Sphere>
      {/* Ojos */}
      <Sphere args={[0.08, 16, 16]} position={[-0.15, 2.2, 0.35]}>
        <meshStandardMaterial color="#ffffff" emissive="#00bfff" emissiveIntensity={0.6} />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0.15, 2.2, 0.35]}>
        <meshStandardMaterial color="#ffffff" emissive="#00bfff" emissiveIntensity={0.6} />
      </Sphere>
      {/* Brazo izquierdo */}
      <group ref={leftArmRef} position={[-0.55, 1.6, 0]}>
        <Cylinder args={[0.12, 0.12, 0.9, 16]} position={[0, -0.45, 0]}>
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </Cylinder>
      </group>
      {/* Brazo derecho */}
      <group ref={rightArmRef} position={[0.55, 1.6, 0]}>
        <Cylinder args={[0.12, 0.12, 0.9, 16]} position={[0, -0.45, 0]}>
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </Cylinder>
      </group>
      {/* Piernas */}
      <Cylinder args={[0.15, 0.15, 1, 16]} position={[-0.25, 0.5, 0]}>
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </Cylinder>
      <Cylinder args={[0.15, 0.15, 1, 16]} position={[0.25, 0.5, 0]}>
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </Cylinder>
    </group>
  );
}

// Dron con hélices
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
      {/* Cuerpo central */}
      <Sphere args={[0.3, 16, 16]}>
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </Sphere>
      {/* Brazos del dron */}
      <Box args={[1.5, 0.08, 0.08]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.08, 0.08, 1.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </Box>
      {/* Hélices */}
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
      {/* Luces LED */}
      <Sphere args={[0.05, 8, 8]} position={[0, -0.2, 0.25]}>
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1} />
      </Sphere>
    </group>
  );
}

export default function SimulacionRobots() {
  const [selectedRobot, setSelectedRobot] = useState<RobotConfig>(robotTypes[0]);
  const [isActive, setIsActive] = useState(true);

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
    </div>
  );
}
