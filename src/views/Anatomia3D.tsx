import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { HeartIcon } from '../components/icons';
import * as THREE from 'three';

interface BodySystem {
  name: string;
  color: string;
  parts: { name: string; position: [number, number, number]; size: number }[];
  info: string;
}

const bodySystems: BodySystem[] = [
  {
    name: 'Sistema Circulatorio',
    color: '#ef4444',
    parts: [
      { name: 'Corazón', position: [0, 0.5, 0], size: 0.4 },
      { name: 'Arteria principal', position: [0, 1, 0], size: 0.15 },
      { name: 'Vena principal', position: [0.3, 0.5, 0], size: 0.15 },
    ],
    info: 'Transporta sangre, oxígeno y nutrientes por todo el cuerpo',
  },
  {
    name: 'Sistema Óseo',
    color: '#f5f5f5',
    parts: [
      { name: 'Cráneo', position: [0, 2, 0], size: 0.5 },
      { name: 'Columna', position: [0, 0.5, 0], size: 0.2 },
      { name: 'Costillas', position: [0, 0.8, 0], size: 0.6 },
      { name: 'Pelvis', position: [0, -0.5, 0], size: 0.5 },
    ],
    info: 'Proporciona estructura, protección y permite el movimiento',
  },
  {
    name: 'Sistema Nervioso',
    color: '#facc15',
    parts: [
      { name: 'Cerebro', position: [0, 2, 0], size: 0.4 },
      { name: 'Médula', position: [0, 0.5, 0], size: 0.15 },
      { name: 'Nervios', position: [0.4, 0.5, 0], size: 0.1 },
    ],
    info: 'Controla y coordina todas las funciones del cuerpo',
  },
  {
    name: 'Sistema Digestivo',
    color: '#84cc16',
    parts: [
      { name: 'Estómago', position: [0, 0.3, 0], size: 0.35 },
      { name: 'Intestinos', position: [0, -0.5, 0], size: 0.5 },
    ],
    info: 'Procesa los alimentos y extrae nutrientes',
  },
];

function BodyModel({ system }: { system: BodySystem }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {system.parts.map((part, index) => (
        <Sphere key={index} position={part.position} args={[part.size, 32, 32]}>
          <meshStandardMaterial color={system.color} metalness={0.2} roughness={0.8} />
        </Sphere>
      ))}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.5, 2, 16, 32]} />
        <meshStandardMaterial color="#fbbf24" transparent opacity={0.1} wireframe />
      </mesh>
    </group>
  );
}

export default function Anatomia3D() {
  const [selectedSystem, setSelectedSystem] = useState<BodySystem>(bodySystems[0]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <HeartIcon size={32} className="text-red-600" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Anatomía Humana 3D
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Explora los principales sistemas del cuerpo humano en 3D
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              {selectedSystem.name}
            </h3>
            <div className="h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
              <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 8, 5]} intensity={0.8} />
                <directionalLight position={[-3, -3, -3]} intensity={0.3} />
                <BodyModel system={selectedSystem} />
                <OrbitControls enableZoom={true} enablePan={false} target={[0, 0, 0]} />
                <gridHelper args={[10, 10, '#94a3b8', '#cbd5e1']} position={[0, -2, 0]} />
              </Canvas>
            </div>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-slate-700 dark:text-slate-300">{selectedSystem.info}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Sistemas del Cuerpo
            </h3>
            <div className="space-y-2">
              {bodySystems.map((system, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSystem(system)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedSystem.name === system.name
                      ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500'
                      : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: system.color }}
                    />
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">
                        {system.name}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {system.parts.length} componentes
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">Componentes</h3>
            <div className="space-y-2">
              {selectedSystem.parts.map((part, index) => (
                <div key={index} className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <div className="font-medium">{part.name}</div>
                  <div className="text-xs opacity-80">Tamaño relativo: {part.size.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
          Datos Curiosos del Cuerpo Humano
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-slate-700 dark:text-slate-300">
          <div>
            <h4 className="font-semibold mb-2">El Corazón</h4>
            <p className="text-sm">Late aproximadamente 100,000 veces al día bombeando 7,500 litros de sangre.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Los Huesos</h4>
            <p className="text-sm">Un adulto tiene 206 huesos. El fémur es el más fuerte del cuerpo.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">El Cerebro</h4>
            <p className="text-sm">Contiene aproximadamente 86 mil millones de neuronas trabajando constantemente.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
