import EnergySourcesViewer from "../components/EnergySourcesViewer";import EnergySourcesViewer from "../components/EnergySourcesViewer";



export default function EnergiaEnAccion() {export default function EnergiaEnAccion() {

  return (  return (

    <div className="space-y-8">    <div className="space-y-8">

      <section className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">      <section className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">

        <div className="container mx-auto px-4 py-6">        <div className="container mx-auto px-4 py-6">

          <EnergySourcesViewer />          <EnergySourcesViewer />

        </div>        </div>

      </section>      </section>

    </div>    </div>

  );  );

}}


interface EnergySource {
  name: string;
  type: string;
  color: string;
  description: string;
  benefits: string[];
  shape: 'solar' | 'wind' | 'hydro' | 'nuclear';
}

const energySources: EnergySource[] = [
  {
    name: 'Energía Solar',
    type: 'Renovable',
    color: '#fbbf24',
    description: 'Energía obtenida del sol mediante paneles fotovoltaicos',
    benefits: ['Limpia', 'Inagotable', 'Reduce emisiones', 'Bajo mantenimiento'],
    shape: 'solar',
  },
  {
    name: 'Energía Eólica',
    type: 'Renovable',
    color: '#60a5fa',
    description: 'Energía generada por el viento usando turbinas',
    benefits: ['Renovable', 'Sin emisiones', 'Económica', 'Abundante'],
    shape: 'wind',
  },
  {
    name: 'Energía Hidráulica',
    type: 'Renovable',
    color: '#3b82f6',
    description: 'Energía producida por el movimiento del agua',
    benefits: ['Limpia', 'Confiable', 'Almacenable', 'Eficiente'],
    shape: 'hydro',
  },
  {
    name: 'Energía Nuclear',
    type: 'No Renovable',
    color: '#a855f7',
    description: 'Energía liberada de reacciones nucleares',
    benefits: ['Alta potencia', 'Sin CO2', 'Eficiente', 'Constante'],
    shape: 'nuclear',
  },
];

function EnergyModel({ source }: { source: EnergySource }) {
  switch (source.shape) {
    case 'solar':
      return (
        <group>
          <Sphere args={[0.5, 32, 32]}>
            <meshStandardMaterial color={source.color} emissive={source.color} emissiveIntensity={0.5} />
          </Sphere>
          {Array.from({ length: 8 }).map((_, i) => (
            <Box
              key={i}
              position={[
                Math.cos((i * Math.PI) / 4) * 1.2,
                0,
                Math.sin((i * Math.PI) / 4) * 1.2,
              ]}
              args={[0.6, 0.05, 0.4]}
              rotation={[0, (i * Math.PI) / 4, 0]}
            >
              <meshStandardMaterial color="#1e293b" />
            </Box>
          ))}
        </group>
      );
    case 'wind':
      return (
        <group>
          <Cylinder args={[0.1, 0.1, 2, 16]}>
            <meshStandardMaterial color="#475569" />
          </Cylinder>
          {Array.from({ length: 3 }).map((_, i) => (
            <Box
              key={i}
              position={[0, 1.5, 0]}
              args={[0.2, 1.5, 0.1]}
              rotation={[0, 0, (i * Math.PI * 2) / 3]}
            >
              <meshStandardMaterial color={source.color} />
            </Box>
          ))}
        </group>
      );
    case 'hydro':
      return (
        <group>
          <Box args={[2, 1, 1]}>
            <meshStandardMaterial color="#475569" />
          </Box>
          <Cylinder args={[0.3, 0.3, 0.8, 16]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color={source.color} />
          </Cylinder>
          <Box position={[0, -0.8, 0]} args={[2.5, 0.2, 1.5]}>
            <meshStandardMaterial color="#3b82f6" transparent opacity={0.6} />
          </Box>
        </group>
      );
    case 'nuclear':
      return (
        <group>
          <Cylinder args={[0.5, 0.5, 2, 32]}>
            <meshStandardMaterial color="#475569" />
          </Cylinder>
          <Torus args={[0.8, 0.1, 16, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color={source.color} emissive={source.color} emissiveIntensity={0.3} />
          </Torus>
          <Torus args={[0.8, 0.1, 16, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, Math.PI / 3, 0]}>
            <meshStandardMaterial color={source.color} emissive={source.color} emissiveIntensity={0.3} />
          </Torus>
          <Torus args={[0.8, 0.1, 16, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, (Math.PI * 2) / 3, 0]}>
            <meshStandardMaterial color={source.color} emissive={source.color} emissiveIntensity={0.3} />
          </Torus>
        </group>
      );
  }
}

export default function EnergiaEnAccion() {
  const [selectedEnergy, setSelectedEnergy] = useState<EnergySource>(energySources[0]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <LightningIcon size={32} className="text-yellow-500" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Energía en Acción
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Descubre los diferentes tipos de energía y cómo se generan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              {selectedEnergy.name}
            </h3>
            <div className="h-[400px] bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
              <Canvas camera={{ position: [5, 4, 5], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 8, 5]} intensity={0.8} />
                <directionalLight position={[-3, -3, -3]} intensity={0.3} />
                <EnergyModel source={selectedEnergy} />
                <OrbitControls enableZoom={true} enablePan={false} target={[0, 0, 0]} />
                <gridHelper args={[10, 10, '#94a3b8', '#cbd5e1']} position={[0, -2, 0]} />
              </Canvas>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-slate-700 dark:text-slate-300">{selectedEnergy.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Fuentes de Energía
            </h3>
            <div className="space-y-2">
              {energySources.map((energy, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedEnergy(energy)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedEnergy.name === energy.name
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-500'
                      : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: energy.color }}
                    />
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">
                        {energy.name}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {energy.type}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">Beneficios</h3>
            <div className="space-y-2">
              {selectedEnergy.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
          Sobre la Energía
        </h3>
        <div className="grid md:grid-cols-4 gap-4 text-slate-700 dark:text-slate-300">
          <div>
            <h4 className="font-semibold mb-2">Renovables</h4>
            <p className="text-sm">Fuentes que no se agotan: solar, eólica, hidráulica.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">No Renovables</h4>
            <p className="text-sm">Recursos limitados: petróleo, carbón, gas natural.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Limpias</h4>
            <p className="text-sm">Generan poca o ninguna contaminación ambiental.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Futuro</h4>
            <p className="text-sm">Transición hacia energías más sostenibles y limpias.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
