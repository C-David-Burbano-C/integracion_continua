import { render, screen, fireEvent } from '@testing-library/react';
import { ScoreProvider, useScore } from '../context/ScoreContext';

// Componente de prueba para acceder al contexto
const TestComponent = () => {
  const { totalScore, addScore, resetScore } = useScore();

  return (
    <div>
      <div data-testid="score-display">Puntaje: {totalScore}</div>
      <button onClick={() => addScore(10)} data-testid="add-score-btn">
        Agregar 10 puntos
      </button>
      <button onClick={() => addScore(20)} data-testid="add-score-20-btn">
        Agregar 20 puntos
      </button>
      <button onClick={resetScore} data-testid="reset-score-btn">
        Reiniciar puntaje
      </button>
    </div>
  );
};

describe('ScoreContext', () => {
  test('debe inicializar con puntaje 0', () => {
    render(
      <ScoreProvider>
        <TestComponent />
      </ScoreProvider>
    );

    const scoreDisplay = screen.getByTestId('score-display');
    expect(scoreDisplay).toHaveTextContent('Puntaje: 0');
  });

  test('debe agregar puntos correctamente', () => {
    render(
      <ScoreProvider>
        <TestComponent />
      </ScoreProvider>
    );

    const addScoreBtn = screen.getByTestId('add-score-btn');
    const scoreDisplay = screen.getByTestId('score-display');

    // Verificar puntaje inicial
    expect(scoreDisplay).toHaveTextContent('Puntaje: 0');

    // Agregar 10 puntos
    fireEvent.click(addScoreBtn);
    expect(scoreDisplay).toHaveTextContent('Puntaje: 10');

    // Agregar 20 puntos más
    const addScore20Btn = screen.getByTestId('add-score-20-btn');
    fireEvent.click(addScore20Btn);
    expect(scoreDisplay).toHaveTextContent('Puntaje: 30');
  });

  test('debe reiniciar el puntaje correctamente', () => {
    render(
      <ScoreProvider>
        <TestComponent />
      </ScoreProvider>
    );

    const addScoreBtn = screen.getByTestId('add-score-btn');
    const resetScoreBtn = screen.getByTestId('reset-score-btn');
    const scoreDisplay = screen.getByTestId('score-display');

    // Agregar puntos
    fireEvent.click(addScoreBtn);
    expect(scoreDisplay).toHaveTextContent('Puntaje: 10');

    // Reiniciar puntaje
    fireEvent.click(resetScoreBtn);
    expect(scoreDisplay).toHaveTextContent('Puntaje: 0');
  });

  test('debe lanzar error cuando useScore se usa fuera del provider', () => {
    // Silenciar el error de consola para esta prueba
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useScore must be used within a ScoreProvider');

    consoleSpy.mockRestore();
  });
});