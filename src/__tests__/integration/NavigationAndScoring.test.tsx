import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ScoreProvider } from '../../context/ScoreContext';
import App from '../../App';

// Mock para fetch si fuera necesario en el futuro
global.fetch = jest.fn();

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ScoreProvider>
      {children}
    </ScoreProvider>
  </BrowserRouter>
);

describe('Integration Tests - Complete User Flow', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada test
    jest.clearAllMocks();
  });

  test('navegación completa desde home hasta matemáticas', async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Verificar que estamos en la página de inicio
    expect(screen.getByText('Colegio Mentes Creativas')).toBeInTheDocument();

    // Navegar a Matemáticas desde el sidebar
    const matematicasLink = screen.getByText('Matemáticas');
    fireEvent.click(matematicasLink);

    // Verificar que llegamos a la página de matemáticas
    await waitFor(() => {
      expect(screen.getByText('🧮 Matemáticas Interactivas')).toBeInTheDocument();
    });

    // Verificar que el quiz está presente
    expect(screen.getByText('¿Cuánto es 15 + 27?')).toBeInTheDocument();
    expect(screen.getByText('Pregunta 1 de 3')).toBeInTheDocument();
  });

  test('flujo completo de quiz con scoring global', async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Ir a la página de matemáticas
    const matematicasLink = screen.getByText('Matemáticas');
    fireEvent.click(matematicasLink);

    await waitFor(() => {
      expect(screen.getByText('🧮 Matemáticas Interactivas')).toBeInTheDocument();
    });

    // Verificar que el score inicial es 0
    const scoreElement = screen.getByText(/Puntuación:/);
    expect(scoreElement).toHaveTextContent('Puntuación: 0');

    // Responder la primera pregunta correctamente
    const correctOption = screen.getByText('42');
    fireEvent.click(correctOption);

    const submitButton = screen.getByText('Verificar Respuesta');
    fireEvent.click(submitButton);

    // Verificar que el score se actualizó (asumiendo 10 puntos por respuesta correcta)
    await waitFor(() => {
      const updatedScoreElement = screen.getByText(/Puntuación:/);
      expect(updatedScoreElement).toHaveTextContent('Puntuación: 10');
    });
  });

  test('navegación entre diferentes áreas de aprendizaje', async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Verificar página inicial
    expect(screen.getByText('Colegio Mentes Creativas')).toBeInTheDocument();

    // Ir a Matemáticas
    const matematicasLink = screen.getByText('Matemáticas');
    fireEvent.click(matematicasLink);

    await waitFor(() => {
      expect(screen.getByText('🧮 Matemáticas Interactivas')).toBeInTheDocument();
    });

    // Ir a Ciencias Naturales
    const cienciasLink = screen.getByText('Ciencias Naturales');
    fireEvent.click(cienciasLink);

    await waitFor(() => {
      expect(screen.getByText('🧪 Ciencias Naturales')).toBeInTheDocument();
    });

    // Ir a Pensamiento Lógico
    const pensamientoLink = screen.getByText('Pensamiento Lógico');
    fireEvent.click(pensamientoLink);

    await waitFor(() => {
      expect(screen.getByText('🧩 Pensamiento Lógico')).toBeInTheDocument();
    });

    // Volver al inicio
    const inicioLink = screen.getByText('Inicio');
    fireEvent.click(inicioLink);

    await waitFor(() => {
      expect(screen.getByText('Colegio Mentes Creativas')).toBeInTheDocument();
    });
  });

  test('persistencia del score entre navegación', async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Ir a matemáticas y responder una pregunta
    const matematicasLink = screen.getByText('Matemáticas');
    fireEvent.click(matematicasLink);

    await waitFor(() => {
      expect(screen.getByText('🧮 Matemáticas Interactivas')).toBeInTheDocument();
    });

    // Responder correctamente
    const correctOption = screen.getByText('42');
    fireEvent.click(correctOption);

    const submitButton = screen.getByText('Verificar Respuesta');
    fireEvent.click(submitButton);

    // Verificar score actualizado
    await waitFor(() => {
      const scoreElement = screen.getByText(/Puntuación:/);
      expect(scoreElement).toHaveTextContent('Puntuación: 10');
    });

    // Navegar a otra página
    const cienciasLink = screen.getByText('Ciencias Naturales');
    fireEvent.click(cienciasLink);

    await waitFor(() => {
      expect(screen.getByText('🧪 Ciencias Naturales')).toBeInTheDocument();
    });

    // Verificar que el score se mantiene
    const scoreElementCiencias = screen.getByText(/Puntuación:/);
    expect(scoreElementCiencias).toHaveTextContent('Puntuación: 10');
  });

  test('funcionalidad del sidebar responsive', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // En desktop, el sidebar debería estar visible
    const sidebar = screen.getByText('Áreas de Aprendizaje').closest('aside');
    expect(sidebar).toBeInTheDocument();

    // Verificar que los enlaces de navegación están presentes
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Matemáticas')).toBeInTheDocument();
    expect(screen.getByText('Ciencias Naturales')).toBeInTheDocument();
    expect(screen.getByText('Pensamiento Lógico')).toBeInTheDocument();
  });
});