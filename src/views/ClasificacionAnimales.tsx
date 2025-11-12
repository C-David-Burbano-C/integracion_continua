import AnimalClassifier from "../components/AnimalClassifier";import { useState } from 'react';

import { Canvas } from '@react-three/fiber';

export default function ClasificacionAnimales() {import { OrbitControls, Box, Sphere, Cone, Cylinder } from '@react-three/drei';

  return (import { PawIcon } from '../components/icons';

    <div className="space-y-8">

      <section className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">interface Animal {

        <div className="container mx-auto px-4 py-6">  name: string;

          <AnimalClassifier />  category: string;

        </div>  color: string;

      </section>  shape: 'box' | 'sphere' | 'cone' | 'cylinder';

    </div>  characteristics: string[];

  );}

}

const animals: Animal[] = [
  {
    name: 'León',
    category: 'Mamífero',
    color: '#f59e0b',
    shape: 'sphere',
    characteristics: ['Carnívoro', 'Vivíparo', 'Terrestre', 'Pelaje'],
  },
  {
    name: 'Águila',
    category: 'Ave',
    color: '#78350f',
    shape: 'cone',
    characteristics: ['Carnívoro', 'Ovíparo', 'Aéreo', 'Plumas'],
  },
  {
    name: 'Delfín',
    category: 'Mamífero',
    color: '#3b82f6',
    shape: 'cylinder',
    characteristics: ['Carnívoro', 'Vivíparo', 'Acuático', 'Piel lisa'],
  },
  {
    name: 'Serpiente',
    category: 'Reptil',
    color: '#84cc16',
    shape: 'cylinder',
    characteristics: ['Carnívoro', 'Ovíparo', 'Terrestre', 'Escamas'],
  },
  {
    name: 'Rana',
    category: 'Anfibio',
    color: '#22c55e',
    shape: 'box',
    characteristics: ['Carnívoro', 'Ovíparo', 'Acuático/Terrestre', 'Piel húmeda'],
  },
  {
    name: 'Tiburón',
    category: 'Pez',
    color: '#64748b',
    shape: 'cylinder',
    characteristics: ['Carnívoro', 'Ovíparo', 'Acuático', 'Escamas'],
  },
];

function AnimalModel({ animal }: { animal: Animal }) {
  const props = { args: [1, 1, 1.5] as [number, number, number] };

  switch (animal.shape) {
    case 'sphere':
      return (
        <Sphere args={[1, 32, 32]}>
          <meshStandardMaterial color={animal.color} />
        </Sphere>
      );
    case 'cone':
      return (
        <Cone {...props} args={[0.8, 1.5, 32]}>
          <meshStandardMaterial color={animal.color} />
        </Cone>
      );
    case 'cylinder':
      return (
        <Cylinder {...props} args={[0.4, 0.4, 2, 32]}>
          <meshStandardMaterial color={animal.color} />
        </Cylinder>
      );
    default:
      return (
        <Box args={[1, 1, 1.5]}>
          <meshStandardMaterial color={animal.color} />
        </Box>
      );
  }
}

export default function ClasificacionAnimales() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>(animals[0]);
  const [filterCategory, setFilterCategory] = useState<string>('Todos');

  const categories = ['Todos', ...Array.from(new Set(animals.map((a) => a.category)))];
  const filteredAnimals = filterCategory === 'Todos' 
    ? animals 
    : animals.filter((a) => a.category === filterCategory);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <PawIcon size={32} className="text-orange-600" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Clasificación de Animales
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Explora las diferentes categorías de animales y sus características
        </p>
      </div>

      <div className="mb-4">
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              {selectedAnimal.name} - {selectedAnimal.category}
            </h3>
            <div className="h-[400px] bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
              <Canvas camera={{ position: [4, 3, 4], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 8, 5]} intensity={0.8} />
                <directionalLight position={[-3, -3, -3]} intensity={0.3} />
                <AnimalModel animal={selectedAnimal} />
                <OrbitControls enableZoom={true} enablePan={false} target={[0, 0, 0]} />
                <gridHelper args={[10, 10, '#94a3b8', '#cbd5e1']} position={[0, -2, 0]} />
              </Canvas>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {selectedAnimal.characteristics.map((char, index) => (
                <div key={index} className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {char}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Animales ({filteredAnimals.length})
            </h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredAnimals.map((animal, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnimal(animal)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedAnimal.name === animal.name
                      ? 'bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-500'
                      : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: animal.color }}
                    />
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">
                        {animal.name}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {animal.category}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">
          Clasificación de los Animales
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-slate-700 dark:text-slate-300">
          <div>
            <h4 className="font-semibold mb-2">Mamíferos</h4>
            <p className="text-sm">Animales de sangre caliente que amamantan a sus crías y tienen pelo.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Aves</h4>
            <p className="text-sm">Animales con plumas, pico y que ponen huevos. La mayoría puede volar.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Reptiles</h4>
            <p className="text-sm">Animales de sangre fría con escamas que ponen huevos.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Anfibios</h4>
            <p className="text-sm">Viven tanto en agua como en tierra. Piel húmeda y metamorfosis.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Peces</h4>
            <p className="text-sm">Animales acuáticos que respiran por branquias y tienen escamas.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Invertebrados</h4>
            <p className="text-sm">Animales sin columna vertebral, como insectos y moluscos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
