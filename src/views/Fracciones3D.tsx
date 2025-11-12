import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { PieChartIcon } from '../components/icons';

interface Fraction {
  numerator: number;
  denominator: number;
  label: string;
}

const commonFractions: Fraction[] = [
  { numerator: 1, denominator: 2, label: '1/2 (Un medio)' },
  { numerator: 1, denominator: 3, label: '1/3 (Un tercio)' },
  { numerator: 1, denominator: 4, label: '1/4 (Un cuarto)' },
  { numerator: 2, denominator: 3, label: '2/3 (Dos tercios)' },
  { numerator: 3, denominator: 4, label: '3/4 (Tres cuartos)' },
];

function FractionCylinder({ fraction }: { fraction: Fraction }) {
  const { numerator, denominator } = fraction;
  const segmentHeight = 2 / denominator;
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <group>
      {Array.from({ length: denominator }).map((_, index) => (
        <mesh
          key={index}
          position={[0, -1 + segmentHeight * index + segmentHeight / 2, 0]}
          rotation={[0, 0, 0]}
        >
          <cylinderGeometry args={[1, 1, segmentHeight, 32]} />
          <meshStandardMaterial
            color={index < numerator ? colors[index % colors.length] : '#94a3b8'}
            opacity={index < numerator ? 1 : 0.3}
            transparent
          />
        </mesh>
      ))}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 1, 32]} />
        <meshBasicMaterial color="#1e293b" side={2} />
      </mesh>
      <mesh position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 1, 32]} />
        <meshBasicMaterial color="#1e293b" side={2} />
      </mesh>
    </group>
  );
}

function FractionPie({ fraction }: { fraction: Fraction }) {
  const { numerator, denominator } = fraction;
  const anglePerSegment = (Math.PI * 2) / denominator;
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {Array.from({ length: denominator }).map((_, index) => {
        const startAngle = anglePerSegment * index;
        const isFilled = index < numerator;

        return (
          <mesh key={index} position={[0, 0, 0.05]} rotation={[0, 0, startAngle]}>
            <cylinderGeometry args={[1, 1, 0.2, 32, 1, false, 0, anglePerSegment]} />
            <meshStandardMaterial
              color={isFilled ? colors[index % colors.length] : '#94a3b8'}
              opacity={isFilled ? 1 : 0.3}
              transparent
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Fracciones3D() {
  const [selectedFraction, setSelectedFraction] = useState<Fraction>(commonFractions[0]);
  const [viewMode, setViewMode] = useState<'cylinder' | 'pie'>('cylinder');

  const percentage = ((selectedFraction.numerator / selectedFraction.denominator) * 100).toFixed(1);
  const decimal = (selectedFraction.numerator / selectedFraction.denominator).toFixed(3);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <PieChartIcon size={32} className="text-blue-600" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Fracciones y Proporciones en 3D
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Visualiza y comprende las fracciones de manera interactiva
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                Visualización 3D
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('cylinder')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'cylinder'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Cilindro
                </button>
                <button
                  onClick={() => setViewMode('pie')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'pie'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Circular
                </button>
              </div>
            </div>
            <div className="h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
              <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 8, 5]} intensity={0.8} />
                <directionalLight position={[-3, -3, -3]} intensity={0.3} />
                {viewMode === 'cylinder' ? (
                  <FractionCylinder fraction={selectedFraction} />
                ) : (
                  <FractionPie fraction={selectedFraction} />
                )}
                <OrbitControls enableZoom={true} enablePan={false} target={[0, 0, 0]} />
                <gridHelper args={[10, 10, '#94a3b8', '#cbd5e1']} position={[0, -2, 0]} />
              </Canvas>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Seleccionar Fracción
            </h3>
            <div className="space-y-2">
              {commonFractions.map((frac, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFraction(frac)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedFraction.label === frac.label
                      ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                      : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border-2 border-transparent'
                  }`}
                >
                  <div className="font-mono font-bold text-lg text-slate-800 dark:text-slate-100">
                    {frac.numerator}/{frac.denominator}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{frac.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Representaciones</h3>
            <div className="space-y-3">
              <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                <div className="text-sm opacity-90">Fracción</div>
                <div className="text-2xl font-bold font-mono">
                  {selectedFraction.numerator}/{selectedFraction.denominator}
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                <div className="text-sm opacity-90">Decimal</div>
                <div className="text-2xl font-bold font-mono">{decimal}</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                <div className="text-sm opacity-90">Porcentaje</div>
                <div className="text-2xl font-bold font-mono">{percentage}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
          Conceptos Clave
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-slate-700 dark:text-slate-300">
          <div>
            <h4 className="font-semibold mb-2">Numerador</h4>
            <p className="text-sm">El número superior indica cuántas partes tomamos del total.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Denominador</h4>
            <p className="text-sm">El número inferior indica en cuántas partes dividimos el total.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Proporción</h4>
            <p className="text-sm">Relación entre la parte y el todo, expresada de diferentes formas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
