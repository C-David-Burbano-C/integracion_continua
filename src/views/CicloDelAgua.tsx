import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { DropletIcon } from '../components/icons';
import * as THREE from 'three';

function WaterCycle() {
  const cloudRef = useRef<THREE.Group>(null);
  const rainRef = useRef<THREE.Group>(null);
  const evaporationRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (cloudRef.current) {
      cloudRef.current.position.x = Math.sin(time * 0.5) * 2;
    }

    if (rainRef.current) {
      rainRef.current.children.forEach((drop, i) => {
        drop.position.y = 3 - ((time * 2 + i * 0.5) % 4);
      });
    }

    if (evaporationRef.current) {
      evaporationRef.current.children.forEach((particle, i) => {
        particle.position.y = -1 + ((time + i * 0.3) % 3);
        particle.scale.setScalar(0.1 + Math.sin(time + i) * 0.05);
      });
    }
  });

  return (
    <group>
      <Sphere position={[-3, -1, 0]} args={[2, 32, 32]}>
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.7} />
      </Sphere>

      <group ref={cloudRef} position={[0, 3, 0]}>
        <Sphere position={[0, 0, 0]} args={[0.5, 16, 16]}>
          <meshStandardMaterial color="#e2e8f0" />
        </Sphere>
        <Sphere position={[0.4, 0.2, 0]} args={[0.4, 16, 16]}>
          <meshStandardMaterial color="#cbd5e1" />
        </Sphere>
        <Sphere position={[-0.4, 0.1, 0]} args={[0.4, 16, 16]}>
          <meshStandardMaterial color="#cbd5e1" />
        </Sphere>
      </group>

      <group ref={rainRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <Sphere key={i} position={[Math.random() * 2 - 1, 3, Math.random() * 2 - 1]} args={[0.05, 8, 8]}>
            <meshStandardMaterial color="#3b82f6" transparent opacity={0.6} />
          </Sphere>
        ))}
      </group>

      <group ref={evaporationRef}>
        {Array.from({ length: 15 }).map((_, i) => (
          <Sphere key={i} position={[-3 + Math.random() * 2, -1, Math.random() * 2 - 1]} args={[0.1, 8, 8]}>
            <meshStandardMaterial color="#e0f2fe" transparent opacity={0.4} />
          </Sphere>
        ))}
      </group>

      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#84cc16" />
      </mesh>
    </group>
  );
}

export default function CicloDelAgua() {
  const stages = [
    { name: 'Evaporación', description: 'El agua se calienta y se convierte en vapor', color: '#3b82f6' },
    { name: 'Condensación', description: 'El vapor se enfría y forma nubes', color: '#cbd5e1' },
    { name: 'Precipitación', description: 'El agua cae como lluvia, nieve o granizo', color: '#60a5fa' },
    { name: 'Escorrentía', description: 'El agua fluye por la superficie', color: '#0ea5e9' },
    { name: 'Infiltración', description: 'El agua se filtra en el suelo', color: '#0c4a6e' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <DropletIcon size={32} className="text-blue-600" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            El Ciclo del Agua
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Observa cómo el agua se mueve constantemente en la naturaleza
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Simulación Animada
            </h3>
            <div className="h-[500px] bg-gradient-to-b from-sky-200 via-sky-100 to-green-100 dark:from-sky-900 dark:via-slate-800 dark:to-green-900 rounded-lg overflow-hidden">
              <Canvas camera={{ position: [10, 8, 10], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 15, 5]} intensity={1.2} />
                <pointLight position={[-8, 12, -8]} intensity={0.6} color="#fbbf24" />
                <WaterCycle />
                <OrbitControls enableZoom={true} enablePan={false} target={[0, 2, 0]} />
                <gridHelper args={[20, 20, '#94a3b8', '#cbd5e1']} position={[0, -1, 0]} />
              </Canvas>
            </div>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                El ciclo del agua es un proceso continuo donde el agua circula entre la tierra, la atmósfera y los océanos.
                La energía del sol impulsa este ciclo vital.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Etapas del Ciclo
            </h3>
            <div className="space-y-3">
              {stages.map((stage, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: stage.color }}
                    />
                    <div className="font-semibold text-slate-800 dark:text-slate-100">
                      {index + 1}. {stage.name}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">Dato Importante</h3>
            <p className="text-sm">
              El 97% del agua en la Tierra es salada. Solo el 3% es agua dulce, y la mayor parte está
              congelada en los polos.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
          Importancia del Ciclo del Agua
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-slate-700 dark:text-slate-300">
          <div>
            <h4 className="font-semibold mb-2">Para la Vida</h4>
            <p className="text-sm">Esencial para todos los seres vivos en el planeta.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Para el Clima</h4>
            <p className="text-sm">Regula la temperatura y los patrones climáticos.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Purificación Natural</h4>
            <p className="text-sm">El ciclo ayuda a limpiar y renovar el agua.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
