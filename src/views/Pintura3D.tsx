import { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { PaintbrushIcon } from '../components/icons';
import * as THREE from 'three';

interface PaintPoint {
  position: [number, number, number];
  color: string;
  size: number;
}

function PaintableCanvas({ points, onPaint, currentColor, brushSize }: { 
  points: PaintPoint[]; 
  onPaint: (point: PaintPoint) => void;
  currentColor: string;
  brushSize: number;
}) {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    const point = event.point;
    onPaint({
      position: [point.x, point.y, point.z],
      color: currentColor,
      size: brushSize,
    });
  };

  return (
    <group>
      {/* Lienzo 3D (plano donde se pinta) */}
      <mesh rotation={[-Math.PI / 6, 0, 0]} position={[0, 0, 0]} onClick={handleClick}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>

      {/* Puntos de pintura */}
      {points.map((point, index) => (
        <mesh key={index} position={point.position}>
          <sphereGeometry args={[point.size, 16, 16]} />
          <meshStandardMaterial color={point.color} emissive={point.color} emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function RotatingBrush({ color }: { color: string }) {
  const brushRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (brushRef.current) {
      brushRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2;
      brushRef.current.position.y = 3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group ref={brushRef} position={[-3, 3, 2]}>
      {/* Mango del pincel */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.08, 0.08, 1.5, 16]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      {/* Cerdas */}
      <mesh position={[0.6, 0.6, 0]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[0.15, 0.4, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export default function Pintura3D() {
  const [paintPoints, setPaintPoints] = useState<PaintPoint[]>([]);
  const [currentColor, setCurrentColor] = useState('#ef4444');
  const [brushSize, setBrushSize] = useState(0.15);

  const colors = [
    { name: 'Rojo', value: '#ef4444' },
    { name: 'Azul', value: '#3b82f6' },
    { name: 'Verde', value: '#22c55e' },
    { name: 'Amarillo', value: '#eab308' },
    { name: 'Morado', value: '#a855f7' },
    { name: 'Naranja', value: '#f97316' },
    { name: 'Rosa', value: '#ec4899' },
    { name: 'Negro', value: '#1f2937' },
  ];

  const handlePaint = (point: PaintPoint) => {
    setPaintPoints([...paintPoints, point]);
  };

  const clearCanvas = () => {
    setPaintPoints([]);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <PaintbrushIcon size={32} className="text-pink-600" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Pintura 3D Interactiva
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Crea arte en un lienzo tridimensional
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Lienzo 3D
            </h3>
            <div className="h-[500px] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden">
              <Canvas camera={{ position: [0, 4, 8], fov: 50 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 8, 5]} intensity={0.8} />
                <directionalLight position={[-3, -3, -3]} intensity={0.3} />
                <PaintableCanvas 
                  points={paintPoints} 
                  onPaint={handlePaint}
                  currentColor={currentColor}
                  brushSize={brushSize}
                />
                <RotatingBrush color={currentColor} />
                <OrbitControls enableZoom={true} enablePan={false} target={[0, 0, 0]} />
                <gridHelper args={[10, 10, '#94a3b8', '#cbd5e1']} position={[0, -1, 0]} />
              </Canvas>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={clearCanvas}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
              >
                🗑️ Limpiar Lienzo
              </button>
              <div className="flex-1 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-center">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Puntos pintados: {paintPoints.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Colores
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
                  style={{ 
                    backgroundColor: color.value,
                  }}
                >
                  <div className="text-white font-semibold text-xs text-center drop-shadow-lg">
                    {color.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Tamaño del Pincel
            </h3>
            <input
              type="range"
              min="0.05"
              max="0.4"
              step="0.05"
              value={brushSize}
              onChange={(e) => setBrushSize(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="mt-2 text-center">
              <div 
                className="mx-auto rounded-full"
                style={{ 
                  width: `${brushSize * 100}px`, 
                  height: `${brushSize * 100}px`,
                  backgroundColor: currentColor,
                }}
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">Instrucciones</h3>
            <ul className="space-y-2 text-sm">
              <li>• Haz clic en el lienzo para pintar</li>
              <li>• Elige un color de la paleta</li>
              <li>• Ajusta el tamaño del pincel</li>
              <li>• Rota la vista con el mouse</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
          Sobre la Pintura 3D
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-slate-700 dark:text-slate-300">
          <div>
            <h4 className="font-semibold mb-2">Expresión Artística</h4>
            <p className="text-sm">La pintura 3D agrega profundidad y dimensión a las obras de arte digitales.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Creatividad Digital</h4>
            <p className="text-sm">Herramientas modernas permiten crear arte en espacios tridimensionales.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Realidad Virtual</h4>
            <p className="text-sm">La RV ha llevado la pintura 3D a nuevos niveles de inmersión.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
