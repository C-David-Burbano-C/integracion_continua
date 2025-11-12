import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

interface DecompositionStep {
  id: number;
  title: string;
  description: string;
  components: Array<{
    type: string;
    position: [number, number, number];
    color: string;
    label: string;
  }>;
}

interface GeometricDecompositionProps {
  figure: string;
  onStepChange?: (step: number) => void;
}

const GeometricDecomposition: React.FC<GeometricDecompositionProps> = ({
  figure,
  onStepChange
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const decompositionSteps: { [key: string]: DecompositionStep[] } = {
    cube: [
      {
        id: 1,
        title: 'Cubo Completo',
        description: 'Esta es la figura original: un cubo sólido.',
        components: [{
          type: 'box',
          position: [0, 0, 0],
          color: '#6b7280',
          label: 'Cubo completo'
        }]
      },
      {
        id: 2,
        title: 'Descomposición en Capas',
        description: 'Dividimos el cubo en 3 capas horizontales.',
        components: [
          { type: 'box', position: [0, -1, 0], color: '#ef4444', label: 'Capa inferior' },
          { type: 'box', position: [0, 0, 0], color: '#10b981', label: 'Capa media' },
          { type: 'box', position: [0, 1, 0], color: '#3b82f6', label: 'Capa superior' }
        ]
      },
      {
        id: 3,
        title: 'Descomposición en Prismas Rectangulares',
        description: 'Cada capa se divide en prismas rectangulares más pequeños.',
        components: [
          // Capa inferior
          { type: 'box', position: [-0.75, -1, -0.75], color: '#ef4444', label: 'Prisma 1' },
          { type: 'box', position: [0.75, -1, -0.75], color: '#ef4444', label: 'Prisma 2' },
          { type: 'box', position: [-0.75, -1, 0.75], color: '#ef4444', label: 'Prisma 3' },
          { type: 'box', position: [0.75, -1, 0.75], color: '#ef4444', label: 'Prisma 4' },
          // Capa media
          { type: 'box', position: [-0.75, 0, -0.75], color: '#10b981', label: 'Prisma 5' },
          { type: 'box', position: [0.75, 0, -0.75], color: '#10b981', label: 'Prisma 6' },
          { type: 'box', position: [-0.75, 0, 0.75], color: '#10b981', label: 'Prisma 7' },
          { type: 'box', position: [0.75, 0, 0.75], color: '#10b981', label: 'Prisma 8' },
          // Capa superior
          { type: 'box', position: [-0.75, 1, -0.75], color: '#3b82f6', label: 'Prisma 9' },
          { type: 'box', position: [0.75, 1, -0.75], color: '#3b82f6', label: 'Prisma 10' },
          { type: 'box', position: [-0.75, 1, 0.75], color: '#3b82f6', label: 'Prisma 11' },
          { type: 'box', position: [0.75, 1, 0.75], color: '#3b82f6', label: 'Prisma 12' }
        ]
      },
      {
        id: 4,
        title: 'Unidad Básica: Cubo Unitario',
        description: 'Cada prisma se puede dividir en cubos unitarios de 1x1x1.',
        components: Array.from({ length: 64 }, (_, i) => {
          const x = (i % 4 - 1.5) * 0.5;
          const y = (Math.floor(i / 16) - 1.5) * 0.5;
          const z = (Math.floor((i % 16) / 4) - 1.5) * 0.5;
          return {
            type: 'box',
            position: [x, y, z] as [number, number, number],
            color: ['#ef4444', '#10b981', '#3b82f6'][Math.floor(i / 16)] || '#6b7280',
            label: `Cubo ${i + 1}`
          };
        })
      }
    ],
    prism: [
      {
        id: 1,
        title: 'Prisma Rectangular Completo',
        description: 'Esta es la figura original: un prisma rectangular.',
        components: [{
          type: 'box',
          position: [0, 0, 0],
          color: '#6b7280',
          label: 'Prisma completo'
        }]
      },
      {
        id: 2,
        title: 'Descomposición en Capas',
        description: 'Dividimos el prisma en capas horizontales.',
        components: [
          { type: 'box', position: [0, -0.75, 0], color: '#ef4444', label: 'Capa inferior' },
          { type: 'box', position: [0, 0, 0], color: '#10b981', label: 'Capa media' },
          { type: 'box', position: [0, 0.75, 0], color: '#3b82f6', label: 'Capa superior' }
        ]
      }
    ]
  };

  const steps = decompositionSteps[figure] || decompositionSteps.cube;

  const handleStepChange = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
    onStepChange?.(stepIndex);
  };

  const handleReverse = () => {
    if (currentStep > 0) {
      handleStepChange(currentStep - 1);
    }
  };

  const handleForward = () => {
    if (currentStep < steps.length - 1) {
      handleStepChange(currentStep + 1);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-lg">
        <button
          onClick={handleReverse}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200"
        >
          ← Anterior
        </button>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Paso {currentStep + 1} de {steps.length}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {steps[currentStep].title}
          </p>
        </div>

        <button
          onClick={handleForward}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200"
        >
          Siguiente →
        </button>
      </div>

      {/* Description */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
        <p className="text-emerald-800 dark:text-emerald-200">
          {steps[currentStep].description}
        </p>
      </div>

      {/* 3D Visualization */}
      <div className="w-full h-96 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />

          {steps[currentStep].components.map((component, index) => (
            <DecompositionComponent
              key={`${currentStep}-${index}`}
              component={component}
              isAnimating={isAnimating}
              delay={index * 0.1}
            />
          ))}
        </Canvas>
      </div>

      {/* Component List */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
        <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">
          Componentes identificados:
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {steps[currentStep].components.map((component, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: component.color }}
              ></div>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {component.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface DecompositionComponentProps {
  component: {
    type: string;
    position: [number, number, number];
    color: string;
    label: string;
  };
  isAnimating: boolean;
  delay: number;
}

const DecompositionComponent: React.FC<DecompositionComponentProps> = ({
  component,
  isAnimating,
  delay
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [visible, setVisible] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      if (isAnimating) {
        meshRef.current.scale.setScalar(0.1 + Math.sin(state.clock.elapsedTime * 5 + delay) * 0.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <group position={component.position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={component.color} />
      </mesh>
      <Html position={[0, 1, 0]} center>
        <div className="bg-white dark:bg-slate-800 px-2 py-1 rounded text-xs font-medium shadow">
          {component.label}
        </div>
      </Html>
    </group>
  );
};

export default GeometricDecomposition;