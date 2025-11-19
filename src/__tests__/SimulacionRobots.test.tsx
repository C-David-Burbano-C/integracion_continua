import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ScoreProvider } from '../context/ScoreContext';
import SimulacionRobots from '../views/SimulacionRobots';

// Wrapper para proporcionar el contexto de enrutamiento y puntuación necesario
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ScoreProvider>
      {children}
    </ScoreProvider>
  </BrowserRouter>
);

describe('SimulacionRobots - Component Tests', () => {
  test('renderiza el componente SimulacionRobots', () => {
    render(
      <TestWrapper>
        <SimulacionRobots />
      </TestWrapper>
    );

    // El componente renderiza sin errores
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  test('contiene la sección principal con clases correctas', () => {
    render(
      <TestWrapper>
        <SimulacionRobots />
      </TestWrapper>
    );

    const section = document.querySelector('section');
    expect(section).toHaveClass('min-h-screen', 'bg-gradient-to-br');
  });

  test('renderiza el contenedor principal', () => {
    render(
      <TestWrapper>
        <SimulacionRobots />
      </TestWrapper>
    );

    expect(document.querySelector('.container')).toBeInTheDocument();
  });

  test('contiene el componente RobotSimulator', () => {
    render(
      <TestWrapper>
        <SimulacionRobots />
      </TestWrapper>
    );

    // Verifica que se renderiza el componente hijo
    expect(document.querySelector('.container .mx-auto')).toBeTruthy();
  });
});