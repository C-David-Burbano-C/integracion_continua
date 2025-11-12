import React, { useState, useEffect } from 'react';
import { useScore } from '../context/ScoreContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: '¿Cuánto es 15 + 27?',
    options: ['42', '41', '43', '40'],
    correctAnswer: 0,
    explanation: '15 + 27 = 42'
  },
  {
    id: 2,
    question: '¿Cuál es el resultado de 8 × 7?',
    options: ['56', '54', '58', '52'],
    correctAnswer: 0,
    explanation: '8 × 7 = 56'
  },
  {
    id: 3,
    question: '¿Cuánto es 144 ÷ 12?',
    options: ['12', '14', '16', '18'],
    correctAnswer: 0,
    explanation: '144 ÷ 12 = 12'
  }
];

const Matematicas: React.FC = () => {
  const { addScore, markModuleAsRead } = useScore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    markModuleAsRead('matematicas');
  }, [markModuleAsRead]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleVerifyAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    setShowResult(true);

    if (isCorrect) {
      const points = 20;
      setScore((prev: number) => prev + points);
      addScore(points);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev: number) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
            Matemáticas Interactivas
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              ¡Quiz Completado!
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Tu puntuación final: {score} puntos
            </p>
            <p className="text-lg text-gray-600 mb-8">
              ¡Excelente trabajo! Has completado todas las preguntas del quiz de matemáticas.
            </p>
            <button
              onClick={handleRestartQuiz}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Repetir Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          Matemáticas Interactivas
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-700">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-lg font-semibold text-indigo-600">
                Puntuación: {score} puntos
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {question.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-4 rounded-lg border-2 text-left font-semibold transition-all ${
                    selectedAnswer === index
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                  disabled={showResult}
                >
                  {option}
                </button>
              ))}
            </div>

            {!showResult ? (
              <button
                onClick={handleVerifyAnswer}
                disabled={selectedAnswer === null}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Verificar Respuesta
              </button>
            ) : (
              <div className="text-center">
                <div className={`text-xl font-bold mb-2 ${
                  selectedAnswer === question.correctAnswer
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {selectedAnswer === question.correctAnswer ? '¡Correcto!' : 'Incorrecto'}
                </div>
                <p className="text-gray-700 mb-4">{question.explanation}</p>
                <button
                  onClick={handleNextQuestion}
                  className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  {currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Quiz'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">
              Recursos Multimedia
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Video Tutorial</h4>
                <p className="text-gray-600 text-sm">
                  Aprende operaciones básicas con este video interactivo
                </p>
                <div className="mt-2 bg-gray-200 h-32 rounded flex items-center justify-center">
                  <span className="text-gray-500">🎥 Video Tutorial</span>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Ejercicios Prácticos</h4>
                <p className="text-gray-600 text-sm">
                  Practica con problemas resueltos paso a paso
                </p>
                <div className="mt-2 bg-gray-200 h-24 rounded flex items-center justify-center">
                  <span className="text-gray-500">📚 Ejercicios</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">
              Conceptos Importantes
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold text-gray-800">Suma</h4>
                <p className="text-gray-600 text-sm">
                  Operación básica que combina cantidades
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800">Multiplicación</h4>
                <p className="text-gray-600 text-sm">
                  Repetición de sumas de manera abreviada
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-800">División</h4>
                <p className="text-gray-600 text-sm">
                  Distribución equitativa de una cantidad
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matematicas;