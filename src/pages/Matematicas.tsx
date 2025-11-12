import React, { useState } from 'react';
import { useScore } from '../context/ScoreContext';
import Interactive3DShapes from '../components/Interactive3DShapes';
import GeometricDecomposition from '../components/GeometricDecomposition';
import {
  AbacusIcon,
  MemoIcon,
  TriangleIcon,
  PuzzleIcon,
  RulerIcon,
  NumbersIcon,
  PartyIcon,
  ConfettiIcon
} from '../components/icons';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const mathQuestions: Question[] = [
  {
    id: 1,
    question: "¿Cuánto es 15 + 27?",
    options: ["42", "41", "43", "40"],
    correctAnswer: 0,
    explanation: "15 + 27 = 42. ¡Excelente cálculo!"
  },
  {
    id: 2,
    question: "¿Cuál es el área de un cuadrado de lado 6 cm?",
    options: ["24 cm²", "36 cm²", "30 cm²", "18 cm²"],
    correctAnswer: 1,
    explanation: "El área de un cuadrado es lado × lado = 6 × 6 = 36 cm²"
  },
  {
    id: 3,
    question: "¿Cuántos grados tiene un ángulo recto?",
    options: ["45°", "90°", "180°", "360°"],
    correctAnswer: 1,
    explanation: "Un ángulo recto mide exactamente 90 grados"
  }
];

const Matematicas: React.FC = () => {
  const { markModuleAsRead } = useScore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [activeModule, setActiveModule] = useState<'quiz' | '3dshapes' | 'decomposition'>('quiz');
  const [selectedShape, setSelectedShape] = useState<string>('');

  const handleModuleChange = (module: 'quiz' | '3dshapes' | 'decomposition') => {
    setActiveModule(module);
    markModuleAsRead(`matematicas-${module}`);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mathQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              <AbacusIcon className="inline mr-2 text-blue-500" size={36} />
              Matemáticas Interactivas
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Aprende matemáticas de manera divertida con ejercicios y juegos
            </p>
          </div>

          {/* Module Navigation */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Módulos Interactivos
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleModuleChange('quiz')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeModule === 'quiz'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                <MemoIcon className="inline mr-2" size={16} />
                Quiz Interactivo
              </button>
              <button
                onClick={() => handleModuleChange('3dshapes')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeModule === '3dshapes'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                <TriangleIcon className="inline mr-2" size={16} />
                Formas 3D Interactivas
              </button>
              <button
                onClick={() => handleModuleChange('decomposition')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeModule === 'decomposition'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                <PuzzleIcon className="inline mr-2" size={16} />
                Descomposición Geométrica
              </button>
            </div>
          </div>

          {/* Interactive Modules */}
          {activeModule === '3dshapes' && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                <TriangleIcon className="inline mr-2 text-blue-500" size={24} />
                Formas 3D Interactivas
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Explora diferentes formas geométricas 3D. Haz clic en cualquier forma para ver sus propiedades.
              </p>
              <Interactive3DShapes onShapeSelect={(shape) => setSelectedShape(shape)} />
              {selectedShape && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200">
                    Forma seleccionada: <strong>{selectedShape}</strong>
                  </p>
                </div>
              )}
            </div>
          )}

          {activeModule === 'decomposition' && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                <PuzzleIcon className="inline mr-2 text-purple-500" size={24} />
                Descomposición Geométrica
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Aprende cómo descomponer figuras complejas en componentes más simples.
              </p>
              <GeometricDecomposition figure="cube" />
            </div>
          )}

          {/* Multimedia Content */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Recursos Multimedia
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <RulerIcon className="text-blue-500 mb-2" size={60} />
                    <p className="text-slate-600 dark:text-slate-300">Video: Geometría Básica</p>
                  </div>
                </div>
                <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <NumbersIcon className="text-green-500 mb-2" size={60} />
                    <p className="text-slate-600 dark:text-slate-300">Animación: Números</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    Conceptos Importantes
                  </h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                    <li>• Suma y resta de números naturales</li>
                    <li>• Multiplicación y división básica</li>
                    <li>• Figuras geométricas y sus propiedades</li>
                    <li>• Medidas de longitud, área y volumen</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                    ¡Practica con Juegos!
                  </h3>
                  <p className="text-emerald-700 dark:text-emerald-300">
                    Resuelve problemas matemáticos mientras juegas y gana puntos por cada respuesta correcta.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Section */}
          {activeModule === 'quiz' && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
              Quiz Interactivo
            </h2>

            {!quizCompleted ? (
              <div>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Pregunta {currentQuestion + 1} de {mathQuestions.length}
                    </span>
                    <div className="w-full max-w-xs bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / mathQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <h3 className="text-xl font-medium text-slate-800 dark:text-slate-100 mb-4">
                    {mathQuestions[currentQuestion].question}
                  </h3>

                  <div className="space-y-3">
                    {mathQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                          selectedAnswer === index
                            ? showResult
                              ? index === mathQuestions[currentQuestion].correctAnswer
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                                : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                              : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : showResult && index === mathQuestions[currentQuestion].correctAnswer
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                            : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                        }`}
                      >
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {showResult && (
                  <div className={`p-4 rounded-lg mb-6 ${
                    selectedAnswer === mathQuestions[currentQuestion].correctAnswer
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                  }`}>
                    <p className={`font-medium ${
                      selectedAnswer === mathQuestions[currentQuestion].correctAnswer
                        ? 'text-emerald-800 dark:text-emerald-200'
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {selectedAnswer === mathQuestions[currentQuestion].correctAnswer
                        ? <>
                            <PartyIcon className="inline mr-2 text-emerald-500" size={20} />
                            ¡Correcto!
                          </>
                        : 'Incorrecto'}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                      {mathQuestions[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                <div className="flex justify-end">
                  {!showResult ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200"
                    >
                      Verificar Respuesta
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200"
                    >
                      {currentQuestion < mathQuestions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Quiz'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <ConfettiIcon className="text-yellow-500 mb-4" size={60} />
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                  ¡Quiz Completado!
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Has terminado todas las preguntas del quiz de matemáticas.
                </p>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Repetir Quiz
                </button>
              </div>
            )}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matematicas;