import { useState } from "react";
import ThreeDemoView from "./ThreeDemoView";
import { CubeIcon, SphereIcon, CylinderIcon, ConeIcon } from "../components/icons";

export default function Geometria3D() {
  const [currentShape, setCurrentShape] = useState<'cube' | 'sphere' | 'cylinder' | 'cone'>('cube');

  const shapes = [
    { id: 'cube' as const, name: 'Cubo', description: '6 caras cuadradas', Icon: CubeIcon },
    { id: 'sphere' as const, name: 'Esfera', description: 'Superficie curva perfecta', Icon: SphereIcon },
    { id: 'cylinder' as const, name: 'Cilindro', description: '2 círculos paralelos conectados', Icon: CylinderIcon },
    { id: 'cone' as const, name: 'Cono', description: 'Base circular con punta', Icon: ConeIcon },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Exploración de Formas 3D
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Explora diferentes figuras geométricas en 3D con rotación, escala y colores
        </p>
      </div>

      {/* Selector de formas */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
          Selecciona una forma:
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {shapes.map((shape) => {
            const Icon = shape.Icon;
            return (
              <button
                key={shape.id}
                onClick={() => setCurrentShape(shape.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  currentShape === shape.id
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Icon size={48} />
                  </div>
                  <div className="font-medium">{shape.name}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {shape.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Información de la forma actual */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Propiedades de {shapes.find(s => s.id === currentShape)?.name}:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white dark:bg-slate-600 p-3 rounded">
            <strong>Caras:</strong> {currentShape === 'cube' ? '6' : currentShape === 'sphere' ? '1' : currentShape === 'cylinder' ? '3' : '2'}
          </div>
          <div className="bg-white dark:bg-slate-600 p-3 rounded">
            <strong>Aristas:</strong> {currentShape === 'cube' ? '12' : currentShape === 'sphere' ? '0' : currentShape === 'cylinder' ? '2' : '1'}
          </div>
          <div className="bg-white dark:bg-slate-600 p-3 rounded">
            <strong>Vértices:</strong> {currentShape === 'cube' ? '8' : currentShape === 'sphere' ? '0' : currentShape === 'cylinder' ? '0' : '1'}
          </div>
        </div>
      </div>

      {/* Vista 3D */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
          Vista Interactiva 3D
        </h2>
        <ThreeDemoView />
      </div>

      {/* Información educativa */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
          ¿Qué puedes hacer?
        </h3>
        <ul className="space-y-2 text-blue-700 dark:text-blue-300">
          <li>• <strong>Rotar:</strong> La figura gira automáticamente en X e Y</li>
          <li>• <strong>Cambiar color:</strong> Usa los botones para cambiar el color de la figura</li>
          <li>• <strong>Color aleatorio:</strong> Genera colores aleatorios</li>
          <li>• <strong>Explorar propiedades:</strong> Observa cómo cambian las caras, aristas y vértices</li>
        </ul>
      </div>
    </div>
  );
}