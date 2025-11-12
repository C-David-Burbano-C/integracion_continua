import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SculptureIcon } from '../components/icons';
import * as THREE from 'three';

type Tool = 'add' | 'remove' | 'smooth';

interface Voxel {
  position: [number, number, number];
  color: string;
}

function VoxelGrid({ voxels, onVoxelClick }: { 
  voxels: Voxel[]; 
  onVoxelClick: (x: number, y: number, z: number) => void;
}) {
  const voxelSize = 0.5;

  return (
    <group>
      {voxels.map((voxel, index) => (
        <mesh
          key={index}
          position={voxel.position}
          onClick={() => onVoxelClick(voxel.position[0], voxel.position[1], voxel.position[2])}
        >
          <boxGeometry args={[voxelSize, voxelSize, voxelSize]} />
          <meshStandardMaterial color={voxel.color} metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function RotatingTools({ tool }: { tool: Tool }) {
  const toolRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (toolRef.current) {
      toolRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      toolRef.current.position.y = 3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const getToolColor = () => {
    switch (tool) {
      case 'add': return '#22c55e';
      case 'remove': return '#ef4444';
      case 'smooth': return '#3b82f6';
    }
  };

  return (
    <group ref={toolRef} position={[-4, 3, 0]}>
      {tool === 'add' && (
        <mesh>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color={getToolColor()} emissive={getToolColor()} emissiveIntensity={0.4} />
        </mesh>
      )}
      {tool === 'remove' && (
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color={getToolColor()} emissive={getToolColor()} emissiveIntensity={0.4} />
        </mesh>
      )}
      {tool === 'smooth' && (
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
          <meshStandardMaterial color={getToolColor()} emissive={getToolColor()} emissiveIntensity={0.4} />
        </mesh>
      )}
    </group>
  );
}

export default function EsculturaDigital() {
  const [voxels, setVoxels] = useState<Voxel[]>([
    { position: [0, 0, 0], color: '#94a3b8' },
    { position: [0.5, 0, 0], color: '#94a3b8' },
    { position: [-0.5, 0, 0], color: '#94a3b8' },
    { position: [0, 0.5, 0], color: '#94a3b8' },
  ]);
  const [currentTool, setCurrentTool] = useState<Tool>('add');
  const [currentColor, setCurrentColor] = useState('#94a3b8');

  const colors = [
    { name: 'Gris', value: '#94a3b8' },
    { name: 'Marrón', value: '#92400e' },
    { name: 'Blanco', value: '#f1f5f9' },
    { name: 'Verde', value: '#22c55e' },
    { name: 'Azul', value: '#3b82f6' },
    { name: 'Rojo', value: '#ef4444' },
  ];

  const tools: { name: string; value: Tool; icon: string; description: string }[] = [
    { name: 'Agregar', value: 'add', icon: '➕', description: 'Agregar vóxeles' },
    { name: 'Remover', value: 'remove', icon: '➖', description: 'Quitar vóxeles' },
    { name: 'Suavizar', value: 'smooth', icon: '✨', description: 'Suavizar superficie' },
  ];

  const handleVoxelClick = (x: number, y: number, z: number) => {
    if (currentTool === 'add') {
      const newPosition: [number, number, number] = [x, y + 0.5, z];
      const exists = voxels.some(v => 
        v.position[0] === newPosition[0] && 
        v.position[1] === newPosition[1] && 
        v.position[2] === newPosition[2]
      );
      if (!exists) {
        setVoxels([...voxels, { position: newPosition, color: currentColor }]);
      }
    } else if (currentTool === 'remove') {
      setVoxels(voxels.filter(v => 
        !(v.position[0] === x && v.position[1] === y && v.position[2] === z)
      ));
    }
  };

  const clearSculpture = () => {
    setVoxels([{ position: [0, 0, 0], color: currentColor }]);
  };

  const createPreset = (preset: string) => {
    let newVoxels: Voxel[] = [];
    
    if (preset === 'pyramid') {
      for (let y = 0; y < 4; y++) {
        const size = 4 - y;
        for (let x = -size; x <= size; x += 0.5) {
          for (let z = -size; z <= size; z += 0.5) {
            newVoxels.push({ position: [x, y * 0.5, z], color: currentColor });
          }
        }
      }
    } else if (preset === 'tower') {
      for (let y = 0; y < 6; y++) {
        for (let x = -0.5; x <= 0.5; x += 0.5) {
          for (let z = -0.5; z <= 0.5; z += 0.5) {
            newVoxels.push({ position: [x, y * 0.5, z], color: currentColor });
          }
        }
      }
    }
    
    setVoxels(newVoxels);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <SculptureIcon size={32} className="text-amber-600" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Escultura Digital con Vóxeles
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Crea esculturas 3D usando bloques vóxel
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Espacio de Escultura
            </h3>
            <div className="h-[500px] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-amber-950 rounded-lg overflow-hidden">
              <Canvas camera={{ position: [6, 5, 6], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[8, 10, 5]} intensity={0.8} />
                <directionalLight position={[-3, -3, -3]} intensity={0.3} />
                <VoxelGrid 
                  voxels={voxels} 
                  onVoxelClick={handleVoxelClick}
                />
                <RotatingTools tool={currentTool} />
                <OrbitControls enableZoom={true} enablePan={false} target={[0, 1, 0]} />
                <gridHelper args={[12, 12, '#94a3b8', '#cbd5e1']} position={[0, -0.5, 0]} />
              </Canvas>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={clearSculpture}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
              >
                🗑️ Limpiar
              </button>
              <button
                onClick={() => createPreset('pyramid')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition"
              >
                🔺 Pirámide
              </button>
              <button
                onClick={() => createPreset('tower')}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
              >
                🏢 Torre
              </button>
              <div className="flex-1 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-center">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Vóxeles: {voxels.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Herramientas
            </h3>
            <div className="space-y-2">
              {tools.map((tool) => (
                <button
                  key={tool.value}
                  onClick={() => setCurrentTool(tool.value)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    currentTool === tool.value
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 ring-2 ring-emerald-500'
                      : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">
                        {tool.name}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {tool.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Material
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setCurrentColor(color.value)}
                  className={`p-3 rounded-lg transition-all ${
                    currentColor === color.value
                      ? 'ring-4 ring-offset-2 scale-105'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                >
                  <div className="text-white font-semibold text-xs text-center drop-shadow-lg">
                    {color.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">Instrucciones</h3>
            <ul className="space-y-2 text-sm">
              <li>• Selecciona una herramienta</li>
              <li>• Haz clic en vóxeles para editar</li>
              <li>• Usa presets para comenzar</li>
              <li>• Rota con el mouse</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
          Sobre la Escultura Vóxel
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-slate-700 dark:text-slate-300">
          <div>
            <h4 className="font-semibold mb-2">Arte Digital</h4>
            <p className="text-sm">Los vóxeles son cubos 3D que forman estructuras tridimensionales.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Videojuegos</h4>
            <p className="text-sm">Minecraft popularizó el arte vóxel en videojuegos.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Modelado 3D</h4>
            <p className="text-sm">Una forma intuitiva de crear modelos tridimensionales.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
