import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface Planet {
  name: string;
  radius: number;
  distance: number;
  color: string;
  rotationSpeed: number;
  orbitSpeed: number;
  info: {
    diameter: string;
    distanceFromSun: string;
    dayLength: string;
    yearLength: string;
    moons: number;
    temperature: string;
    atmosphere: string;
  };
}

const planets: Planet[] = [
  {
    name: 'Mercurio',
    radius: 0.4,
    distance: 4,
    color: '#8c7853',
    rotationSpeed: 0.02,
    orbitSpeed: 0.04,
    info: {
      diameter: '4,879 km',
      distanceFromSun: '58 millones km',
      dayLength: '59 días terrestres',
      yearLength: '88 días terrestres',
      moons: 0,
      temperature: '-173°C a 427°C',
      atmosphere: 'Muy tenue'
    }
  },
  {
    name: 'Venus',
    radius: 0.6,
    distance: 6,
    color: '#ffc649',
    rotationSpeed: 0.015,
    orbitSpeed: 0.03,
    info: {
      diameter: '12,104 km',
      distanceFromSun: '108 millones km',
      dayLength: '243 días terrestres',
      yearLength: '225 días terrestres',
      moons: 0,
      temperature: '462°C',
      atmosphere: 'Densa de CO2'
    }
  },
  {
    name: 'Tierra',
    radius: 0.8,
    distance: 8,
    color: '#6b93d6',
    rotationSpeed: 0.01,
    orbitSpeed: 0.02,
    info: {
      diameter: '12,756 km',
      distanceFromSun: '150 millones km',
      dayLength: '24 horas',
      yearLength: '365.25 días',
      moons: 1,
      temperature: '-89°C a 58°C',
      atmosphere: 'Nitrógeno y oxígeno'
    }
  },
  {
    name: 'Marte',
    radius: 0.7,
    distance: 10,
    color: '#c1440e',
    rotationSpeed: 0.012,
    orbitSpeed: 0.018,
    info: {
      diameter: '6,792 km',
      distanceFromSun: '228 millones km',
      dayLength: '24.6 horas',
      yearLength: '687 días terrestres',
      moons: 2,
      temperature: '-87°C a -5°C',
      atmosphere: 'Delgada de CO2'
    }
  },
  {
    name: 'Júpiter',
    radius: 2.5,
    distance: 15,
    color: '#d8ca9d',
    rotationSpeed: 0.008,
    orbitSpeed: 0.01,
    info: {
      diameter: '142,984 km',
      distanceFromSun: '778 millones km',
      dayLength: '9.9 horas',
      yearLength: '11.9 años terrestres',
      moons: 95,
      temperature: '-108°C',
      atmosphere: 'Hidrógeno y helio'
    }
  },
  {
    name: 'Saturno',
    radius: 2.2,
    distance: 20,
    color: '#fab27b',
    rotationSpeed: 0.009,
    orbitSpeed: 0.008,
    info: {
      diameter: '120,536 km',
      distanceFromSun: '1,427 millones km',
      dayLength: '10.7 horas',
      yearLength: '29.5 años terrestres',
      moons: 146,
      temperature: '-139°C',
      atmosphere: 'Hidrógeno y helio'
    }
  },
  {
    name: 'Urano',
    radius: 1.5,
    distance: 25,
    color: '#4fd0e7',
    rotationSpeed: 0.006,
    orbitSpeed: 0.006,
    info: {
      diameter: '51,118 km',
      distanceFromSun: '2,871 millones km',
      dayLength: '17.2 horas',
      yearLength: '84 años terrestres',
      moons: 28,
      temperature: '-197°C',
      atmosphere: 'Hidrógeno, helio y metano'
    }
  },
  {
    name: 'Neptuno',
    radius: 1.4,
    distance: 30,
    color: '#4b70dd',
    rotationSpeed: 0.007,
    orbitSpeed: 0.005,
    info: {
      diameter: '49,528 km',
      distanceFromSun: '4,498 millones km',
      dayLength: '16.1 horas',
      yearLength: '165 años terrestres',
      moons: 16,
      temperature: '-201°C',
      atmosphere: 'Hidrógeno, helio y metano'
    }
  }
];

interface PlanetComponentProps {
  planet: Planet;
  onSelect: (planet: Planet) => void;
  selectedPlanet: string | null;
  animationSpeed: number;
}

const PlanetComponent: React.FC<PlanetComponentProps> = ({
  planet,
  onSelect,
  selectedPlanet,
  animationSpeed
}) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += planet.orbitSpeed * animationSpeed;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += planet.rotationSpeed * animationSpeed;
    }
  });

  const isSelected = selectedPlanet === planet.name;

  return (
    <group ref={orbitRef}>
      <group position={[planet.distance, 0, 0]}>
        <mesh
          ref={planetRef}
          onClick={() => onSelect(planet)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered || isSelected ? 1.2 : 1}
        >
          <sphereGeometry args={[planet.radius, 32, 32]} />
          <meshStandardMaterial color={planet.color} />
        </mesh>

        {/* Planet label */}
        {(hovered || isSelected) && (
          <Html position={[0, planet.radius + 1, 0]} center>
            <div className="bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow-lg">
              <div className="font-bold text-slate-800 dark:text-slate-100">
                {planet.name}
              </div>
            </div>
          </Html>
        )}

        {/* Orbit line */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planet.distance - 0.02, planet.distance + 0.02, 64]} />
          <meshBasicMaterial color="#ffffff" opacity={0.3} transparent />
        </mesh>
      </group>
    </group>
  );
};

interface SolarSystemProps {
  onPlanetSelect?: (planet: Planet) => void;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ onPlanetSelect }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  const handlePlanetSelect = (planet: Planet) => {
    setSelectedPlanet(planet.name);
    onPlanetSelect?.(planet);
  };

  const selectedPlanetData = planets.find(p => p.name === selectedPlanet);

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Velocidad de animación:
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
            className="w-24"
          />
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {animationSpeed.toFixed(1)}x
          </span>
        </div>
      </div>

      {/* 3D Solar System */}
      <div className="w-full h-96 bg-black rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 20, 20], fov: 50 }}>
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 0]} intensity={2} />

          {/* Sun */}
          <mesh>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshBasicMaterial color="#ffd700" />
          </mesh>

          {/* Planets */}
          {planets.map((planet) => (
            <PlanetComponent
              key={planet.name}
              planet={planet}
              onSelect={handlePlanetSelect}
              selectedPlanet={selectedPlanet}
              animationSpeed={animationSpeed}
            />
          ))}
        </Canvas>
      </div>

      {/* Planet Information */}
      {selectedPlanetData && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            {selectedPlanetData.name}
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-slate-600 dark:text-slate-400">Diámetro:</span>
                <span className="text-slate-800 dark:text-slate-200">{selectedPlanetData.info.diameter}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-600 dark:text-slate-400">Distancia al Sol:</span>
                <span className="text-slate-800 dark:text-slate-200">{selectedPlanetData.info.distanceFromSun}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-600 dark:text-slate-400">Duración del día:</span>
                <span className="text-slate-800 dark:text-slate-200">{selectedPlanetData.info.dayLength}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-600 dark:text-slate-400">Duración del año:</span>
                <span className="text-slate-800 dark:text-slate-200">{selectedPlanetData.info.yearLength}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-slate-600 dark:text-slate-400">Lunas:</span>
                <span className="text-slate-800 dark:text-slate-200">{selectedPlanetData.info.moons}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-600 dark:text-slate-400">Temperatura:</span>
                <span className="text-slate-800 dark:text-slate-200">{selectedPlanetData.info.temperature}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-600 dark:text-slate-400">Atmósfera:</span>
                <span className="text-slate-800 dark:text-slate-200">{selectedPlanetData.info.atmosphere}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Planet selector */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
        <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">
          Selecciona un planeta:
        </h4>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {planets.map((planet) => (
            <button
              key={planet.name}
              onClick={() => handlePlanetSelect(planet)}
              className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPlanet === planet.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {planet.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolarSystem;