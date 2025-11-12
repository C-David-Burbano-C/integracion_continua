import React, { useState } from 'react';
import { useScore } from '../context/ScoreContext';
import SolarSystem from '../components/SolarSystem';
import {
  LeafIcon,
  EarthIcon,
  LionIcon,
  PartyIcon,
  ConfettiIcon,
  QuestionIcon,
  SaturnIcon
} from '../components/icons';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const scienceQuestions: Question[] = [
  {
    id: 1,
    question: "¿Cuál de estos es un mamífero?",
    options: ["Tiburón", "Delfín", "Tortuga", "Pez dorado"],
    correctAnswer: 1,
    explanation: "El delfín es un mamífero porque respira aire, tiene sangre caliente y amamanta a sus crías."
  },
  {
    id: 2,
    question: "¿Qué necesitan las plantas para hacer la fotosíntesis?",
    options: ["Solo agua", "Agua, luz y dióxido de carbono", "Solo luz solar", "Solo tierra"],
    correctAnswer: 1,
    explanation: "Las plantas necesitan agua (de las raíces), luz solar y dióxido de carbono del aire para hacer fotosíntesis."
  },
  {
    id: 3,
    question: "¿Cuál es el planeta más cercano al Sol?",
    options: ["Venus", "Tierra", "Mercurio", "Marte"],
    correctAnswer: 2,
    explanation: "Mercurio es el planeta más cercano al Sol en nuestro sistema solar."
  }
];

const CienciasNaturales: React.FC = () => {
  const { markModuleAsRead } = useScore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [activeModule, setActiveModule] = useState<'quiz' | 'solarsystem'>('quiz');

  const handleModuleChange = (module: 'quiz' | 'solarsystem') => {
    setActiveModule(module);
    markModuleAsRead(`ciencias-${module}`);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < scienceQuestions.length - 1) {
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              <LeafIcon className="inline mr-2 text-green-500" size={36} />
              Ciencias Naturales
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Explora el maravilloso mundo de la naturaleza y sus secretos
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
                <QuestionIcon className="inline mr-2" size={16} />
                Quiz Interactivo
              </button>
              <button
                onClick={() => handleModuleChange('solarsystem')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeModule === 'solarsystem'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                <SaturnIcon className="inline mr-2" size={16} />
                Sistema Solar Interactivo
              </button>
            </div>
          </div>

          {/* Interactive Modules */}
          {activeModule === 'solarsystem' && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                <SaturnIcon className="inline mr-2 text-blue-500" size={24} />
                Sistema Solar Interactivo
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Explora nuestro sistema solar. Haz clic en cualquier planeta para conocer sus características.
              </p>
              <SolarSystem />
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
                    <EarthIcon className="text-blue-500 mb-2" size={60} />
                    <p className="text-slate-600 dark:text-slate-300">Video: Nuestro Planeta</p>
                  </div>
                </div>
                <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <LionIcon className="text-orange-500 mb-2" size={60} />
                    <p className="text-slate-600 dark:text-slate-300">Documental: Animales</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    Temas que Exploraremos
                  </h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                    <li>• Los seres vivos y su clasificación</li>
                    <li>• El ciclo de la vida de plantas y animales</li>
                    <li>• El sistema solar y los planetas</li>
                    <li>• El cuidado del medio ambiente</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                    ¡Aprende Jugando!
                  </h3>
                  <p className="text-emerald-700 dark:text-emerald-300">
                    Descubre los secretos de la naturaleza mientras respondes preguntas y ganas puntos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Section */}
          {activeModule === 'quiz' && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
              Quiz de Ciencias
            </h2>

            {!quizCompleted ? (
              <div>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Pregunta {currentQuestion + 1} de {scienceQuestions.length}
                    </span>
                    <div className="w-full max-w-xs bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / scienceQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <h3 className="text-xl font-medium text-slate-800 dark:text-slate-100 mb-4">
                    {scienceQuestions[currentQuestion].question}
                  </h3>

                  <div className="space-y-3">
                    {scienceQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                          selectedAnswer === index
                            ? showResult
                              ? index === scienceQuestions[currentQuestion].correctAnswer
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                                : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                              : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : showResult && index === scienceQuestions[currentQuestion].correctAnswer
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                            : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 bg-white dark:bg-slate-700 text-slate-800 dark:text-white'
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
                    selectedAnswer === scienceQuestions[currentQuestion].correctAnswer
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                  }`}>
                    <p className={`font-medium ${
                      selectedAnswer === scienceQuestions[currentQuestion].correctAnswer
                        ? 'text-emerald-800 dark:text-emerald-200'
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {selectedAnswer === scienceQuestions[currentQuestion].correctAnswer
                        ? <>
                            <PartyIcon className="inline mr-2 text-emerald-500" size={20} />
                            ¡Correcto!
                          </>
                        : 'Incorrecto'}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                      {scienceQuestions[currentQuestion].explanation}
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
                      {currentQuestion < scienceQuestions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Quiz'}
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
                  Has terminado todas las preguntas del quiz de ciencias naturales.
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

export default CienciasNaturales;