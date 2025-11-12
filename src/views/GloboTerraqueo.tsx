import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GlobeIcon } from '../components/icons';
import * as THREE from 'three';

function UltraRealisticEarth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.001;
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0012;
    if (atmosphereRef.current) atmosphereRef.current.rotation.y -= 0.0005;
  });

  // Crear textura ultra-realista de la Tierra
  const earthTexture = useMemo(() => {
    const size = 4096;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size / 2;
    const ctx = canvas.getContext('2d')!;

    // Océano con gradiente profundo
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    oceanGradient.addColorStop(0, '#0a2540');
    oceanGradient.addColorStop(0.5, '#1e40af');
    oceanGradient.addColorStop(1, '#0a2540');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawContinent = (x: number, y: number, w: number, h: number, color: string, points: number = 50) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(w, h));
      gradient.addColorStop(0, adjustBrightness(color, 30));
      gradient.addColorStop(0.5, color);
      gradient.addColorStop(1, adjustBrightness(color, -20));
      ctx.fillStyle = gradient;
      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const noise = Math.sin(i * 0.3) * 0.3 + Math.cos(i * 0.7) * 0.2 + 0.5;
        const rx = (w / 2) * (0.7 + noise * 0.6);
        const ry = (h / 2) * (0.7 + noise * 0.6);
        const px = x + Math.cos(angle) * rx;
        const py = y + Math.sin(angle) * ry;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();

      // Montañas
      ctx.fillStyle = adjustBrightness(color, -40);
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.arc(x + (Math.random() - 0.5) * w * 0.6, y + (Math.random() - 0.5) * h * 0.6, Math.random() * 30 + 10, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const adjustBrightness = (hex: string, amt: number): string => {
      const num = parseInt(hex.replace('#', ''), 16);
      const r = Math.min(255, Math.max(0, (num >> 16) + amt));
      const g = Math.min(255, Math.max(0, ((num >> 8) & 0xFF) + amt));
      const b = Math.min(255, Math.max(0, (num & 0xFF) + amt));
      return `rgb(${r},${g},${b})`;
    };

    // Continentes
    drawContinent(650, 350, 600, 500, '#2d5016', 80);
    drawContinent(750, 1000, 450, 700, '#2d6b1c', 70);
    drawContinent(2000, 280, 480, 380, '#4a7a2a', 75);
    drawContinent(2100, 600, 550, 800, '#5a6a1a', 85);
    drawContinent(2700, 300, 900, 650, '#3a6a2a', 95);
    drawContinent(3300, 950, 480, 420, '#8a6a1a', 65);

    // Polos
    const drawPolarCap = (y: number, h: number) => {
      for (let i = 0; i < h; i += 2) {
        const alpha = 1 - (i / h) * 0.7;
        const bright = 240 - Math.random() * 20;
        ctx.fillStyle = `rgba(${bright}, ${bright + 10}, 255, ${alpha})`;
        ctx.fillRect(0, y + i, canvas.width, 2);
      }
    };
    drawPolarCap(0, 180);
    drawPolarCap(canvas.height - 180, 180);

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Nubes realistas
  const cloudsTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 4096;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 300; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const w = Math.random() * 200 + 100;
      const h = Math.random() * 80 + 40;
      const opacity = Math.random() * 0.7 + 0.3;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(w, h) / 2);
      gradient.addColorStop(0, `rgba(255,255,255,${opacity})`);
      gradient.addColorStop(0.7, `rgba(255,255,255,${opacity * 0.3})`);
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(x, y, w / 2, h / 2, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group>
      {/* Atmósfera */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.5, 128, 128]} />
        <meshBasicMaterial color="#88ccff" transparent opacity={0.12} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Tierra */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 256, 256]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.9}
          metalness={0.1}
          emissive="#0a1530"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Nubes */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.03, 128, 128]} />
        <meshStandardMaterial map={cloudsTexture} transparent opacity={0.5} depthWrite={false} />
      </mesh>

      {/* Luces */}
      <directionalLight position={[10, 5, 5]} intensity={2.5} color="#ffeedd" />
      <directionalLight position={[-8, -3, -5]} intensity={0.4} color="#6699ff" />
      <ambientLight intensity={0.15} />
    </group>
  );
}

export default function GloboTerraqueo() {
  const continents = [
    { name: 'América', facts: ['Dos continentes conectados', '35 países', 'Desde el Ártico hasta la Antártida'] },
    { name: 'Europa', facts: ['44 países', 'Rica historia y cultura', 'Unión Europea'] },
    { name: 'Asia', facts: ['El continente más grande', '48 países', 'Más de 4 mil millones de habitantes'] },
    { name: 'África', facts: ['54 países', 'Cuna de la humanidad', 'Gran diversidad de vida silvestre'] },
    { name: 'Oceanía', facts: ['14 países', 'Miles de islas', 'Australia es el país más grande'] },
    { name: 'Antártida', facts: ['Sin población permanente', 'Cubierta de hielo', 'Investigación científica'] },
  ];

  const earthFacts = [
    { label: 'Diámetro', value: '12,742 km' },
    { label: 'Superficie', value: '510 millones km²' },
    { label: 'Océanos', value: '71% del planeta' },
    { label: 'Continentes', value: '29% del planeta' },
    { label: 'Población', value: '~8 mil millones' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <GlobeIcon size={32} className="text-blue-600" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Globo Terráqueo Interactivo
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Explora nuestro planeta Tierra en 3D
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Planeta Tierra
            </h3>
            <div className="h-[500px] bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 rounded-lg overflow-hidden">
              <Canvas camera={{ position: [7, 2, 7], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[8, 4, 6]} intensity={1.5} color="#fbbf24" />
                <directionalLight position={[-5, -2, -5]} intensity={0.3} color="#60a5fa" />
                <UltraRealisticEarth />
                <OrbitControls 
                  enableZoom={true} 
                  enablePan={false} 
                  minDistance={4} 
                  maxDistance={15}
                  target={[0, 0, 0]}
                />
              </Canvas>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {earthFacts.slice(0, 3).map((fact, index) => (
                <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                  <div className="text-xs text-slate-600 dark:text-slate-400">{fact.label}</div>
                  <div className="font-bold text-sm text-slate-800 dark:text-slate-100">{fact.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Continentes
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {continents.map((continent, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700"
                >
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    {continent.name}
                  </h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    {continent.facts.map((fact, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">Datos de la Tierra</h3>
            <div className="space-y-2">
              {earthFacts.slice(3).map((fact, index) => (
                <div key={index} className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                  <div className="text-xs opacity-90">{fact.label}</div>
                  <div className="font-bold text-sm">{fact.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
          Nuestro Planeta
        </h3>
        <div className="grid md:grid-cols-4 gap-4 text-slate-700 dark:text-slate-300">
          <div>
            <h4 className="font-semibold mb-2">El Tercer Planeta</h4>
            <p className="text-sm">Tercer planeta desde el Sol en nuestro sistema solar.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Agua Líquida</h4>
            <p className="text-sm">El único planeta conocido con agua líquida en su superficie.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Atmósfera</h4>
            <p className="text-sm">Protege la vida del espacio y mantiene la temperatura.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Biodiversidad</h4>
            <p className="text-sm">Millones de especies de plantas y animales.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
