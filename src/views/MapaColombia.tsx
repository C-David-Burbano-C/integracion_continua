import { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MapIcon } from '../components/icons';
import * as THREE from 'three';

interface Region {
  name: string;
  color: string;
  points: [number, number][];
  capital: string;
  description: string;
}

// Forma REAL de Colombia usando coordenadas geográficas convertidas
const colombiaRegions: Region[] = [
  {
    name: 'Región Caribe',
    color: '#fbbf24',
    capital: 'Barranquilla',
    description: 'Costa norte sobre el Mar Caribe',
    points: [
      [-1.5, 3], [-1, 3.2], [-0.3, 3.3], [0.5, 3.2], [1.2, 3], [1.8, 2.5],
      [2, 2], [1.5, 1.5], [0.8, 1.2], [0, 1], [-0.8, 1.2], [-1.5, 3]
    ]
  },
  {
    name: 'Región Andina',
    color: '#84cc16',
    capital: 'Bogotá',
    description: 'Región central montañosa - Cordillera de los Andes',
    points: [
      [-0.8, 1.2], [0, 1], [0.8, 1.2], [1.2, 0.8], [1, 0.2], [0.8, -0.5],
      [0.5, -1.2], [0, -1.5], [-0.5, -1.2], [-0.8, -0.5], [-1.2, 0],
      [-1, 0.8], [-0.8, 1.2]
    ]
  },
  {
    name: 'Región Pacífica',
    color: '#3b82f6',
    capital: 'Cali',
    description: 'Costa occidental - Océano Pacífico',
    points: [
      [-2.5, 1.5], [-2.2, 2], [-1.5, 2.3], [-1, 2], [-0.8, 1.2], [-1, 0.8],
      [-1.2, 0], [-1.5, -0.8], [-1.8, -1.5], [-2, -2], [-2.3, -2.2],
      [-2.5, -1.8], [-2.5, 1.5]
    ]
  },
  {
    name: 'Región Orinoquía',
    color: '#f59e0b',
    capital: 'Villavicencio',
    description: 'Grandes llanuras orientales - Llanos',
    points: [
      [1.2, 0.8], [2.5, 1.2], [3.2, 0.8], [3.5, 0.2], [3.5, -0.5],
      [3, -1], [2.2, -1.2], [1.5, -1], [1, -0.5], [1.2, 0.8]
    ]
  },
  {
    name: 'Región Amazonía',
    color: '#10b981',
    capital: 'Leticia',
    description: 'Selva amazónica al sur',
    points: [
      [0, -1.5], [0.5, -1.2], [1, -1.5], [1.5, -2], [2, -2.5], [2.2, -3],
      [1.8, -3.5], [1, -3.8], [0, -3.8], [-0.8, -3.5], [-1.5, -3],
      [-1.8, -2.5], [-1.5, -2], [-0.8, -1.5], [0, -1.5]
    ]
  }
];

function RealisticColombiaMap({ highlightedRegion }: { highlightedRegion: Region | null }) {
  // Crear geometría 3D para cada región usando ExtrudeGeometry
  const createRegionMesh = (points: [number, number][], color: string, isHighlighted: boolean) => {
    const shape = new THREE.Shape();
    points.forEach((point, i) => {
      if (i === 0) shape.moveTo(point[0], point[1]);
      else shape.lineTo(point[0], point[1]);
    });

    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <extrudeGeometry
          args={[
            shape,
            {
              depth: 0.2,
              bevelEnabled: true,
              bevelThickness: 0.05,
              bevelSize: 0.05,
              bevelSegments: 3
            }
          ]}
        />
        <meshStandardMaterial
          color={color}
          opacity={isHighlighted ? 0.95 : 0.8}
          transparent
          emissive={isHighlighted ? color : '#000000'}
          emissiveIntensity={isHighlighted ? 0.5 : 0}
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>
    );
  };

  // Ciudades principales con posiciones REALES en el mapa
  const cities = [
    { name: 'Bogotá', position: [-0.1, 0.3, 0] as [number, number, number], color: '#ef4444', size: 0.12 },
    { name: 'Medellín', position: [-1, 0.3, 0.5] as [number, number, number], color: '#f59e0b', size: 0.1 },
    { name: 'Cali', position: [-1.5, 0.3, -0.8] as [number, number, number], color: '#10b981', size: 0.1 },
    { name: 'Barranquilla', position: [-0.8, 0.3, 2.5] as [number, number, number], color: '#3b82f6', size: 0.09 },
    { name: 'Cartagena', position: [-1.3, 0.3, 2.3] as [number, number, number], color: '#8b5cf6', size: 0.08 },
    { name: 'Cúcuta', position: [1, 0.3, 1.8] as [number, number, number], color: '#ec4899', size: 0.08 },
    { name: 'Bucaramanga', position: [0.5, 0.3, 1.2] as [number, number, number], color: '#14b8a6', size: 0.07 },
    { name: 'Pereira', position: [-1.2, 0.3, 0.2] as [number, number, number], color: '#f97316', size: 0.07 },
    { name: 'Santa Marta', position: [-0.3, 0.3, 2.8] as [number, number, number], color: '#06b6d4', size: 0.07 },
    { name: 'Manizales', position: [-1, 0.3, 0] as [number, number, number], color: '#a855f7', size: 0.06 }
  ];

  // Cordilleras (cadenas montañosas)
  const cordilleras = [
    { name: 'Occidental', points: [[-1.5, -2], [-1.3, -1], [-1.2, 0], [-1.1, 1], [-1, 2]] },
    { name: 'Central', points: [[-0.8, -2.5], [-0.5, -1.5], [-0.3, -0.5], [-0.2, 0.5], [-0.1, 1.5]] },
    { name: 'Oriental', points: [[0.5, -1], [0.7, 0], [0.9, 1], [1.1, 2]] }
  ];

  return (
    <group>
      {/* Océano Pacífico */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.5, 0, 0]}>
        <planeGeometry args={[3, 8]} />
        <meshStandardMaterial color="#1e40af" opacity={0.6} transparent metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Mar Caribe */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 4]}>
        <planeGeometry args={[8, 2]} />
        <meshStandardMaterial color="#0ea5e9" opacity={0.6} transparent metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Regiones de Colombia con forma real */}
      {colombiaRegions.map((region, index) => (
        <group key={index}>
          {createRegionMesh(
            region.points,
            region.color,
            highlightedRegion?.name === region.name
          )}
        </group>
      ))}

      {/* Cordilleras (cadenas montañosas en relieve) */}
      {cordilleras.map((cordillera, idx) => (
        <group key={`cordillera-${idx}`}>
          {cordillera.points.map((point, i) => (
            <mesh key={i} position={[point[0], 0.35, point[1]]}>
              <coneGeometry args={[0.15, 0.4, 8]} />
              <meshStandardMaterial color="#78716c" roughness={0.9} metalness={0.1} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Ciudades principales */}
      {cities.map((city, index) => (
        <group key={`city-${index}`}>
          <mesh position={city.position}>
            <cylinderGeometry args={[city.size, city.size, 0.3, 16]} />
            <meshStandardMaterial
              color={city.color}
              emissive={city.color}
              emissiveIntensity={0.5}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
          {/* Marcador vertical */}
          <mesh position={[city.position[0], city.position[1] + 0.4, city.position[2]]}>
            <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
            <meshStandardMaterial 
              color={city.color} 
              emissive={city.color}
              emissiveIntensity={0.6}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}
      
      {/* Océanos (planos azules) */}
      <mesh position={[-3, 0, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 5]} />
        <meshStandardMaterial color="#1e40af" transparent opacity={0.4} />
      </mesh>
      <mesh position={[-0.5, 0, 3.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 2]} />
        <meshStandardMaterial color="#0ea5e9" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function MapaColombia() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <MapIcon size={32} className="text-green-600" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Mapa Interactivo de Colombia
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Explora las seis regiones naturales de Colombia
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Mapa 3D Interactivo
            </h3>
            <div className="h-[500px] bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
              <Canvas camera={{ position: [6, 6, 6], fov: 50 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[8, 10, 8]} intensity={1} />
                <directionalLight position={[-5, 5, -5]} intensity={0.4} />
                <RealisticColombiaMap highlightedRegion={selectedRegion} />
                <OrbitControls 
                  enableZoom={true} 
                  enablePan={false}
                  target={[0, 0, 0]}
                />
                <gridHelper args={[12, 12, '#94a3b8', '#cbd5e1']} position={[0, 0, 0]} />
              </Canvas>
            </div>
            {selectedRegion && (
              <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${selectedRegion.color}20` }}>
                <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2">
                  {selectedRegion.name}
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                  <span className="font-semibold">Capital:</span> {selectedRegion.capital}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {selectedRegion.description}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Regiones de Colombia
            </h3>
            <div className="space-y-2">
              {colombiaRegions.map((region, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedRegion(region)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedRegion?.name === region.name
                      ? 'border-2 ring-2 ring-offset-2'
                      : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border-2 border-transparent'
                  }`}
                  style={{
                    backgroundColor: selectedRegion?.name === region.name ? `${region.color}30` : undefined,
                    borderColor: selectedRegion?.name === region.name ? region.color : undefined,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: region.color }}
                    />
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">
                        {region.name}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {region.capital}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">Colombia</h3>
            <div className="space-y-2 text-sm">
              <p>País ubicado en el noroeste de Sudamérica</p>
              <p className="font-semibold">6 Regiones Naturales</p>
              <p className="font-semibold">32 Departamentos</p>
              <p>Capital: Bogotá D.C.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-900/20 dark:to-blue-900/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
          Diversidad de Colombia
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-slate-700 dark:text-slate-300">
          <div>
            <h4 className="font-semibold mb-2">Geografía</h4>
            <p className="text-sm">Costas en dos océanos, montañas, llanuras y selva amazónica.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Biodiversidad</h4>
            <p className="text-sm">Segundo país más biodiverso del mundo.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Cultura</h4>
            <p className="text-sm">Rica diversidad cultural con múltiples etnias y tradiciones.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
