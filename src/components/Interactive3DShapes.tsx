import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Shape3DProps {
  shape: string;
  position: [number, number, number];
  onSelect?: (shape: string) => void;
}

const Shape3D: React.FC<Shape3DProps> = ({ shape, position, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  useFrame(() => {
    if (meshRef.current && !hovered && !selected) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  const getGeometry = () => {
    switch (shape) {
      case 'cube':
        return <boxGeometry args={[2, 2, 2]} />;
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'cylinder':
        return <cylinderGeometry args={[1, 1, 2, 32]} />;
      case 'cone':
        return <coneGeometry args={[1, 2, 32]} />;
      case 'pyramid':
        return <coneGeometry args={[1, 2, 4]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 100]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1]} />;
      default:
        return <boxGeometry args={[2, 2, 2]} />;
    }
  };

  const getShapeInfo = () => {
    const info: { [key: string]: { name: string; properties: string[] } } = {
      cube: {
        name: 'Cubo',
        properties: ['6 caras cuadradas', '8 vértices', '12 aristas', 'Volumen = lado³']
      },
      sphere: {
        name: 'Esfera',
        properties: ['Superficie curva', 'Volumen = (4/3)πr³', 'Área = 4πr²', 'Sin vértices ni aristas']
      },
      cylinder: {
        name: 'Cilindro',
        properties: ['2 bases circulares', 'Superficie lateral curva', 'Volumen = πr²h', 'Área = 2πr² + 2πrh']
      },
      cone: {
        name: 'Cono',
        properties: ['1 base circular', 'Superficie lateral curva', 'Volumen = (1/3)πr²h', '1 vértice']
      },
      pyramid: {
        name: 'Pirámide',
        properties: ['Base cuadrada', '4 caras triangulares', '5 vértices', 'Volumen = (1/3)Abh']
      },
      torus: {
        name: 'Toro',
        properties: ['Forma de dona', 'Superficie cerrada', 'Volumen = 2π²Rr²', 'Sin vértices']
      },
      octahedron: {
        name: 'Octaedro',
        properties: ['8 caras triangulares', '6 vértices', '12 aristas', 'Poliedro regular']
      },
      dodecahedron: {
        name: 'Dodecaedro',
        properties: ['12 caras pentagonales', '20 vértices', '30 aristas', 'Poliedro regular']
      }
    };
    return info[shape] || { name: shape, properties: [] };
  };

  const handleClick = () => {
    setSelected(!selected);
    onSelect?.(shape);
  };

  const shapeInfo = getShapeInfo();

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered || selected ? 1.2 : 1}
      >
        {getGeometry()}
        <meshStandardMaterial
          color={selected ? '#10b981' : hovered ? '#3b82f6' : '#6b7280'}
          wireframe={false}
        />
      </mesh>

      {(hovered || selected) && (
        <Html position={[0, 2.5, 0]} center>
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg max-w-xs">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
              {shapeInfo.name}
            </h3>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
              {shapeInfo.properties.map((prop, index) => (
                <li key={index}>• {prop}</li>
              ))}
            </ul>
          </div>
        </Html>
      )}
    </group>
  );
};

interface Interactive3DShapesProps {
  onShapeSelect?: (shape: string) => void;
}

const Interactive3DShapes: React.FC<Interactive3DShapesProps> = ({ onShapeSelect }) => {
  const shapes = [
    'cube', 'sphere', 'cylinder', 'cone',
    'pyramid', 'torus', 'octahedron', 'dodecahedron'
  ];

  return (
    <div className="w-full h-96 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />

        {shapes.map((shape, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;
          const x = (col - 1.5) * 4;
          const z = (row - 0.5) * 4;

          return (
            <Shape3D
              key={shape}
              shape={shape}
              position={[x, 0, z]}
              onSelect={onShapeSelect}
            />
          );
        })}
      </Canvas>
    </div>
  );
};

export default Interactive3DShapes;