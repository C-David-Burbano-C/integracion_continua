import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Cone } from '@react-three/drei';
import { ReflectIcon, CubeIcon, SphereIcon, ConeIcon } from '../components/icons';

type SymmetryType = 'reflexion' | 'rotacion' | 'traslacion';

interface Shape {
  name: string;
  Icon: React.FC<{ className?: string; size?: number }>;
  type: 'box' | 'sphere' | 'cone';
}

const shapes: Shape[] = [
  { name: 'Cubo', Icon: CubeIcon, type: 'box' },
  { name: 'Esfera', Icon: SphereIcon, type: 'sphere' },
  { name: 'Cono', Icon: ConeIcon, type: 'cone' },
];

function SymmetricShape({ shapeType, symmetryType }: { shapeType: string; symmetryType: SymmetryType }) {
  const renderShape = (position: [number, number, number], rotation: [number, number, number] = [0, 0, 0]) => {
    const props = { position, rotation, args: [1, 1, 1] as [number, number, number] };
    
    switch (shapeType) {
      case 'sphere':
        return <Sphere {...props} args={[0.7, 32, 32]}>
          <meshStandardMaterial color="#3b82f6" />
        </Sphere>;
      case 'cone':
        return <Cone {...props} args={[0.7, 1.5, 32]}>
          <meshStandardMaterial color="#8b5cf6" />
        </Cone>;
      default:
        return <Box {...props}>
          <meshStandardMaterial color="#10b981" />
        </Box>;
    }
  };

  if (symmetryType === 'reflexion') {
    return (
      <>
        {renderShape([-1.5, 0, 0])}
        {renderShape([1.5, 0, 0])}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.05, 3]} />
          <meshStandardMaterial color="#64748b" transparent opacity={0.5} />
        </mesh>
      </>
    );
  }

  if (symmetryType === 'rotacion') {
    return (
      <>
        {renderShape([0, 0, 0], [0, 0, 0])}
        {renderShape([0, 0, 0], [0, Math.PI / 2, 0])}
        {renderShape([0, 0, 0], [0, Math.PI, 0])}
        {renderShape([0, 0, 0], [0, (3 * Math.PI) / 2, 0])}
      </>
    );
  }

  // traslacion
  return (
    <>
      {renderShape([-2, 0, 0])}
      {renderShape([0, 0, 0])}
      {renderShape([2, 0, 0])}
    </>
  );
}

export default function Simetria() {
  const [selectedShape, setSelectedShape] = useState<Shape>(shapes[0]);
  const [symmetryType, setSymmetryType] = useState<SymmetryType>('reflexion');

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <ReflectIcon size={32} className="text-purple-600" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Explorador de Simetría
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Descubre los diferentes tipos de simetría explorando objetos en 3D
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Visualización 3D
            </h3>
            <div className="h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
              <Canvas camera={{ position: [6, 4, 6], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 8, 5]} intensity={0.8} />
                <directionalLight position={[-3, -3, -3]} intensity={0.3} />
                <SymmetricShape shapeType={selectedShape.type} symmetryType={symmetryType} />
                <OrbitControls enableZoom={true} enablePan={false} target={[0, 0, 0]} />
                <gridHelper args={[12, 12, '#94a3b8', '#cbd5e1']} position={[0, -2.5, 0]} />
              </Canvas>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Tipo de Simetría
            </h3>
            <div className="space-y-2">
              {[
                { value: 'reflexion' as SymmetryType, label: 'Reflexión (Espejo)', desc: 'Imagen reflejada' },
                { value: 'rotacion' as SymmetryType, label: 'Rotación', desc: 'Giro alrededor del centro' },
                { value: 'traslacion' as SymmetryType, label: 'Traslación', desc: 'Movimiento lineal' },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSymmetryType(type.value)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    symmetryType === type.value
                      ? 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500'
                      : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border-2 border-transparent'
                  }`}
                >
                  <div className="font-semibold text-slate-800 dark:text-slate-100">{type.label}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{type.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Seleccionar Forma
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {shapes.map((shape) => (
                <button
                  key={shape.name}
                  onClick={() => setSelectedShape(shape)}
                  className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-all ${
                    selectedShape.name === shape.name
                      ? 'bg-purple-100 dark:bg-purple-900/30 ring-2 ring-purple-500'
                      : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  <shape.Icon size={32} className="text-slate-700 dark:text-slate-300" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {shape.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
          ¿Qué es la Simetría?
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-slate-700 dark:text-slate-300">
          <div>
            <h4 className="font-semibold mb-2">Reflexión</h4>
            <p className="text-sm">Una figura se refleja como en un espejo. Ambos lados son idénticos.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Rotación</h4>
            <p className="text-sm">La figura gira alrededor de un punto central y se ve igual en ciertos ángulos.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Traslación</h4>
            <p className="text-sm">La figura se mueve en línea recta manteniendo su forma y orientación.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
