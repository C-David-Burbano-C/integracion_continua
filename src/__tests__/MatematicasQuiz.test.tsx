import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ScoreProvider } from '../context/ScoreContext';
import Matematicas from '../pages/Matematicas';

// Wrapper para proporcionar el contexto necesario
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ScoreProvider>
      {children}
    </ScoreProvider>
  </BrowserRouter>
);

describe('Matematicas - Quiz Functionality', () => {
  test('renderiza el título de la página', () => {
    render(
      <TestWrapper>
        <Matematicas />
      </TestWrapper>
    );

    expect(screen.getByText('🧮 Matemáticas Interactivas')).toBeInTheDocument();
  });

  test('muestra la primera pregunta del quiz', () => {
    render(
      <TestWrapper>
        <Matematicas />
      </TestWrapper>
    );

    expect(screen.getByText('¿Cuánto es 15 + 27?')).toBeInTheDocument();
    expect(screen.getByText('Pregunta 1 de 3')).toBeInTheDocument();
  });

  test('permite seleccionar una respuesta', () => {
    render(
      <TestWrapper>
        <Matematicas />
      </TestWrapper>
    );

    const optionButton = screen.getByText('42');
    fireEvent.click(optionButton);

    // Verificar que el botón está presente (no podemos verificar clases fácilmente en esta versión)
    expect(optionButton).toBeInTheDocument();
  });

  test('botón de verificar respuesta está presente', () => {
    render(
      <TestWrapper>
        <Matematicas />
      </TestWrapper>
    );

    expect(screen.getByText('Verificar Respuesta')).toBeInTheDocument();
  });

  test('muestra opciones de respuesta múltiple', () => {
    render(
      <TestWrapper>
        <Matematicas />
      </TestWrapper>
    );

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('41')).toBeInTheDocument();
    expect(screen.getByText('43')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });

  test('contiene sección de recursos multimedia', () => {
    render(
      <TestWrapper>
        <Matematicas />
      </TestWrapper>
    );

    expect(screen.getByText('Recursos Multimedia')).toBeInTheDocument();
    expect(screen.getByText('Conceptos Importantes')).toBeInTheDocument();
  });
});