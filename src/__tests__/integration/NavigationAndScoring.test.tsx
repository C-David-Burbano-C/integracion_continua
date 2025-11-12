import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ScoreProvider } from '../../context/ScoreContext';
import App from '../../App';

// Mock para fetch si fuera necesario en el futuro
global.fetch = jest.fn();

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ScoreProvider>
    {children}
  </ScoreProvider>
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

    // Verificar que estamos en la página de inicio - usar role heading
    const heading = screen.getAllByText('Colegio Mentes Creativas')[1]; // Usar el h1 del contenido, no del navbar
    expect(heading).toBeInTheDocument();

    // Expandir el grupo de Matemáticas
    const matematicasButton = screen.getByRole('button', { name: /Matemáticas/i });
    fireEvent.click(matematicasButton);

    // Esperar a que aparezca el link de Geometría 3D
    await waitFor(() => {
      expect(screen.getByText('Geometría 3D')).toBeInTheDocument();
    });

    // Ahora hacer clic en Geometría 3D
    const geometriaLink = screen.getByText('Geometría 3D');
    fireEvent.click(geometriaLink);

    // Verificar que llegamos a la página de geometría 3D
    await waitFor(() => {
      expect(screen.getByText('Explorador de Formas 3D')).toBeInTheDocument();
    });
  });

  test('flujo completo de quiz con scoring global', async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Expandir el grupo de Matemáticas
    const matematicasButton = screen.getByRole('button', { name: /Matemáticas/i });
    fireEvent.click(matematicasButton);

    // Esperar a que aparezca el link
    await waitFor(() => {
      expect(screen.getByText('Geometría 3D')).toBeInTheDocument();
    });

    // Navegar a Geometría 3D
    const geometriaLink = screen.getByText('Geometría 3D');
    fireEvent.click(geometriaLink);

    await waitFor(() => {
      expect(screen.getByText('Explorador de Formas 3D')).toBeInTheDocument();
    });

    // Verificar que el score inicial es 0
    const scoreElement = screen.getByText(/Puntuación:/);
    expect(scoreElement).toHaveTextContent('Puntuación: 0');
  });

  test('navegación entre diferentes áreas de aprendizaje', async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Verificar página inicial
    const heading = screen.getAllByText('Colegio Mentes Creativas')[1];
    expect(heading).toBeInTheDocument();

    // Expandir Matemáticas
    const matematicasButton = screen.getByRole('button', { name: /Matemáticas/i });
    fireEvent.click(matematicasButton);

    await waitFor(() => {
      expect(screen.getByText('Geometría 3D')).toBeInTheDocument();
    });

    // Expandir Ciencias Naturales
    const cienciasButton = screen.getByRole('button', { name: /Ciencias Naturales/i });
    fireEvent.click(cienciasButton);

    await waitFor(() => {
      expect(screen.getByText('Anatomía 3D')).toBeInTheDocument();
    });

    // Volver al inicio
    const inicioLink = screen.getByText('Inicio');
    fireEvent.click(inicioLink);

    await waitFor(() => {
      const homeHeading = screen.getAllByText('Colegio Mentes Creativas')[1];
      expect(homeHeading).toBeInTheDocument();
    });
  });

  test('persistencia del score entre navegación', async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Expandir Matemáticas
    const matematicasButton = screen.getByRole('button', { name: /Matemáticas/i });
    fireEvent.click(matematicasButton);

    await waitFor(() => {
      expect(screen.getByText('Geometría 3D')).toBeInTheDocument();
    });

    // Verificar score inicial
    const scoreElement = screen.getByText(/Puntuación:/);
    expect(scoreElement).toHaveTextContent('Puntuación: 0');

    // Expandir Ciencias Naturales
    const cienciasButton = screen.getByRole('button', { name: /Ciencias Naturales/i });
    fireEvent.click(cienciasButton);

    await waitFor(() => {
      expect(screen.getByText('Anatomía 3D')).toBeInTheDocument();
    });

    // Verificar que el score se mantiene
    const scoreElementCiencias = screen.getByText(/Puntuación:/);
    expect(scoreElementCiencias).toHaveTextContent('Puntuación: 0');
  });

  test('funcionalidad del sidebar responsive', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Verificar que el sidebar está presente buscando un elemento aside
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toBeInTheDocument();

    // Verificar que los enlaces de navegación están presentes
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Matemáticas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ciencias Naturales/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Tecnología/i })).toBeInTheDocument();
  });
});