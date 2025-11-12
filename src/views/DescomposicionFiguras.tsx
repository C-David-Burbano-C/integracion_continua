import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CubeIcon, PyramidIcon, BoxIcon, DiamondIcon, HexagonIcon } from "../components/icons";
import * as THREE from "three";

interface SolidProperties {
  name: string;
  faces: number;
  edges: number;
  vertices: number;
  description: string;
  Icon: React.FC<{ size?: number; className?: string }>;
}

const solids: SolidProperties[] = [
  {
    name: "Cubo",
    faces: 6,
    edges: 12,
    vertices: 8,
    description: "Todos los lados son cuadrados iguales. Tiene 6 caras cuadradas.",
    Icon: CubeIcon
  },
  {
    name: "Pirámide Cuadrangular",
    faces: 5,
    edges: 8,
    vertices: 5,
    description: "Base cuadrada con 4 caras triangulares que convergen en un vértice.",
    Icon: PyramidIcon
  },
  {
    name: "Prisma Rectangular",
    faces: 6,
    edges: 12,
    vertices: 8,
    description: "Dos bases rectangulares paralelas conectadas por rectángulos.",
    Icon: BoxIcon
  },
  {
    name: "Octaedro",
    faces: 8,
    edges: 12,
    vertices: 6,
    description: "8 caras triangulares equiláteras que se unen en 6 vértices.",
    Icon: DiamondIcon
  },
  {
    name: "Dodecaedro",
    faces: 12,
    edges: 30,
    vertices: 20,
    description: "12 caras pentagonales regulares.",
    Icon: HexagonIcon
  }
];

// Componente 3D animado para cada sólido
function RotatingSolid({ solidName, showNet }: { solidName: string; showNet: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && !showNet) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  const renderSolid = () => {
    const material = <meshStandardMaterial color="#10b981" metalness={0.3} roughness={0.4} />;
    
    switch (solidName) {
      case "Cubo":
        return (
          <mesh ref={meshRef}>
            <boxGeometry args={[2, 2, 2]} />
            {material}
          </mesh>
        );
      case "Pirámide Cuadrangular":
        return (
          <mesh ref={meshRef} position={[0, -0.5, 0]}>
            <coneGeometry args={[1.5, 2.5, 4]} />
            {material}
          </mesh>
        );
      case "Prisma Rectangular":
        return (
          <mesh ref={meshRef}>
            <boxGeometry args={[2.5, 1.5, 1.2]} />
            {material}
          </mesh>
        );
      case "Octaedro":
        return (
          <mesh ref={meshRef}>
            <octahedronGeometry args={[1.5]} />
            {material}
          </mesh>
        );
      case "Dodecaedro":
        return (
          <mesh ref={meshRef}>
            <dodecahedronGeometry args={[1.3]} />
            {material}
          </mesh>
        );
      default:
        return null;
    }
  };

  const renderNet = () => {
    // Versión desplegada simplificada
    const positions: [number, number, number][] = [];
    
    switch (solidName) {
      case "Cubo":
        // Cruz de cubo desplegado
        positions.push(
          [0, 1, 0], [0, 0, 0], [0, -1, 0], [0, -2, 0], // vertical
          [-1, 0, 0], [1, 0, 0] // horizontal
        );
        break;
      case "Pirámide Cuadrangular":
        positions.push([0, 0, 0], [1.2, 0, 0], [-1.2, 0, 0], [0, 1.2, 0], [0, -1.2, 0]);
        break;
      default:
        positions.push([0, 0, 0]);
    }

    return (
      <group>
        {positions.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <planeGeometry args={[0.9, 0.9]} />
            <meshStandardMaterial color="#10b981" side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    );
  };

  return showNet ? renderNet() : renderSolid();
}

export default function DescomposicionFiguras() {
  const [selectedSolid, setSelectedSolid] = useState<SolidProperties>(solids[0]);
  const [showNet, setShowNet] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Descomposición de Figuras
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Analiza las caras, aristas y vértices de los sólidos geométricos
        </p>
      </div>

      {/* Selector de sólidos */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
          Selecciona un sólido:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {solids.map((solid) => {
            const Icon = solid.Icon;
            return (
              <button
                key={solid.name}
                onClick={() => setSelectedSolid(solid)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedSolid.name === solid.name
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Icon size={40} />
                  </div>
                  <div className="font-medium text-sm">{solid.name}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Información detallada del sólido */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Propiedades */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
            Propiedades de {selectedSolid.name}
          </h3>

          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                {selectedSolid.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {selectedSolid.faces}
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                  Caras
                </div>
              </div>

              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {selectedSolid.edges}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300 font-medium">
                  Aristas
                </div>
              </div>

              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {selectedSolid.vertices}
                </div>
                <div className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                  Vértices
                </div>
              </div>
            </div>

            {/* Fórmula de Euler */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Fórmula de Euler
              </h4>
              <div className="text-center">
                <div className="text-lg font-mono text-yellow-700 dark:text-yellow-300">
                  V - A + C = 2
                </div>
                <div className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                  {selectedSolid.vertices} - {selectedSolid.edges} + {selectedSolid.faces} = {selectedSolid.vertices - selectedSolid.edges + selectedSolid.faces}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visualización */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              Visualización
            </h3>
            <button
              onClick={() => setShowNet(!showNet)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition"
            >
              {showNet ? 'Ver Sólido' : 'Ver Desplegado'}
            </button>
          </div>

          <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg overflow-hidden">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
              <directionalLight position={[-5, -5, -5]} intensity={0.3} />
              <RotatingSolid solidName={selectedSolid.name} showNet={showNet} />
              <OrbitControls enableZoom={true} enablePan={false} />
              <gridHelper args={[10, 10, '#94a3b8', '#cbd5e1']} position={[0, -2, 0]} />
            </Canvas>
          </div>
        </div>
      </div>

      {/* Información educativa */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
          Conceptos Importantes
        </h3>
        <ul className="space-y-2 text-blue-700 dark:text-blue-300">
          <li>• <strong>Cara:</strong> Cada superficie plana del sólido</li>
          <li>• <strong>Arista:</strong> Línea donde se unen dos caras</li>
          <li>• <strong>Vértice:</strong> Punto donde convergen tres o más aristas</li>
          <li>• <strong>Fórmula de Euler:</strong> Vértices - Aristas + Caras = 2 (para poliedros convexos)</li>
        </ul>
      </div>
    </div>
  );
}