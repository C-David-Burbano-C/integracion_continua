import React, { useState } from 'react';
import { useScore } from '../context/ScoreContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const logicQuestions: Question[] = [
  {
    id: 1,
    question: "Si todos los gatos son mamíferos y algunos mamíferos son mascotas, ¿qué podemos concluir?",
    options: ["Todos los gatos son mascotas", "Algunos gatos son mascotas", "Ningún gato es mascota", "Todos los mamíferos son gatos"],
    correctAnswer: 1,
    explanation: "Podemos concluir que algunos gatos son mascotas, pero no todos los gatos necesariamente lo son."
  },
  {
    id: 2,
    question: "¿Cuál de estas figuras continúa la secuencia: ▲, ■, ●, ▲, ■, ●, ...?",
    options: ["▲", "■", "●", "★"],
    correctAnswer: 0,
    explanation: "La secuencia se repite cada tres figuras: ▲, ■, ●, y luego vuelve a empezar con ▲."
  },
  {
    id: 3,
    question: "Si 3 manzanas cuestan $6, ¿cuánto cuestan 9 manzanas?",
    options: ["$12", "$18", "$24", "$9"],
    correctAnswer: 1,
    explanation: "Si 3 manzanas cuestan $6, entonces 1 manzana cuesta $2. Por lo tanto, 9 manzanas cuestan $18."
  }
];

const PensamientoLogico: React.FC = () => {
  const { addScore } = useScore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === logicQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      addScore(10); // 10 puntos por respuesta correcta
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < logicQuestions.length - 1) {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              🧠 Pensamiento Lógico
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Desarrolla tu capacidad de razonamiento y resolución de problemas
            </p>
          </div>

          {/* Multimedia Content */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Recursos Multimedia
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2">🔍</div>
                    <p className="text-slate-600 dark:text-slate-300">Video: Razonamiento Lógico</p>
                  </div>
                </div>
                <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2">🧩</div>
                    <p className="text-slate-600 dark:text-slate-300">Juegos: Rompecabezas</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    Habilidades que Desarrollarás
                  </h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                    <li>• Identificación de patrones y secuencias</li>
                    <li>• Razonamiento deductivo e inductivo</li>
                    <li>• Resolución de problemas matemáticos</li>
                    <li>• Pensamiento crítico y análisis</li>
                  </ul>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    ¡Piensa y Juega!
                  </h3>
                  <p className="text-purple-700 dark:text-purple-300">
                    Pon a prueba tu lógica con acertijos y rompecabezas que desafiarán tu mente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
              Quiz de Lógica
            </h2>

            {!quizCompleted ? (
              <div>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Pregunta {currentQuestion + 1} de {logicQuestions.length}
                    </span>
                    <div className="w-full max-w-xs bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / logicQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <h3 className="text-xl font-medium text-slate-800 dark:text-slate-100 mb-4">
                    {logicQuestions[currentQuestion].question}
                  </h3>

                  <div className="space-y-3">
                    {logicQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                          selectedAnswer === index
                            ? showResult
                              ? index === logicQuestions[currentQuestion].correctAnswer
                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                                : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                              : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : showResult && index === logicQuestions[currentQuestion].correctAnswer
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
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
                    selectedAnswer === logicQuestions[currentQuestion].correctAnswer
                      ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'
                      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                  }`}>
                    <p className={`font-medium ${
                      selectedAnswer === logicQuestions[currentQuestion].correctAnswer
                        ? 'text-purple-800 dark:text-purple-200'
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {selectedAnswer === logicQuestions[currentQuestion].correctAnswer
                        ? '¡Correcto! 🎉'
                        : 'Incorrecto'}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                      {logicQuestions[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                <div className="flex justify-end">
                  {!showResult ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className="px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200"
                    >
                      Verificar Respuesta
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200"
                    >
                      {currentQuestion < logicQuestions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Quiz'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎊</div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                  ¡Quiz Completado!
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Has terminado todas las preguntas del quiz de pensamiento lógico.
                </p>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Repetir Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PensamientoLogico;