import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ScoreProvider } from '../../context/ScoreContext';
import AppRoutes from '../../routes/AppRoutes';

// Mock para fetch si fuera necesario en el futuro
global.fetch = jest.fn();

const TestWrapper = ({ children, initialRoute = '/' }: { children: React.ReactNode; initialRoute?: string }) => (
  <MemoryRouter initialEntries={[initialRoute]}>
    <ScoreProvider>
      {children}
    </ScoreProvider>
  </MemoryRouter>
);

describe('Integration Tests - Complete User Flow', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada test
    jest.clearAllMocks();
  });

  test('navegación completa desde home hasta sistema solar', async () => {
    render(
      <TestWrapper initialRoute="/">
        <AppRoutes />
      </TestWrapper>
    );

    // Verificar que estamos en la página de inicio
    const heading = screen.getByRole('heading', { name: /exploradores del conocimiento/i });
    expect(heading).toBeInTheDocument();

    // Hacer clic en el enlace del Sistema Solar (usar el título del h3 en la homepage)
    const sistemaSolarTitle = screen.getByRole('heading', { name: /sistema solar/i });
    const sistemaSolarLink = sistemaSolarTitle.closest('a');
    if (sistemaSolarLink) {
      fireEvent.click(sistemaSolarLink);
    }

    // Verificar que llegamos a la página del sistema solar
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /sistema solar/i })).toBeInTheDocument();
    });
  });

  test('navegación a mapa de Colombia', async () => {
    render(
      <TestWrapper initialRoute="/">
        <AppRoutes />
      </TestWrapper>
    );

    // Verificar página inicial
    expect(screen.getByRole('heading', { name: /exploradores del conocimiento/i })).toBeInTheDocument();

    // Navegar a Mapa Colombia
    const mapaColombiaTitle = screen.getByRole('heading', { name: /mapa de colombia/i });
    const mapaColombiaLink = mapaColombiaTitle.closest('a');
    if (mapaColombiaLink) {
      fireEvent.click(mapaColombiaLink);
    }

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /mapa de colombia/i })).toBeInTheDocument();
    });
  });

  test('navegación entre diferentes áreas de aprendizaje usando sidebar', async () => {
    render(
      <TestWrapper initialRoute="/">
        <AppRoutes />
      </TestWrapper>
    );

    // Verificar página inicial
    expect(screen.getByRole('heading', { name: /exploradores del conocimiento/i })).toBeInTheDocument();

    // Usar el sidebar para navegar al Sistema Solar
    const sistemaSolarSidebarLink = screen.getByRole('link', { name: /sistema solar/i });
    fireEvent.click(sistemaSolarSidebarLink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /sistema solar/i })).toBeInTheDocument();
    });

    // Navegar al Mapa Colombia desde el sidebar
    const mapaColombiaSidebarLink = screen.getByRole('link', { name: /mapa colombia/i });
    fireEvent.click(mapaColombiaSidebarLink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /mapa de colombia/i })).toBeInTheDocument();
    });

    // Volver al inicio desde el sidebar
    const inicioLink = screen.getByRole('link', { name: /inicio/i });
    fireEvent.click(inicioLink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /exploradores del conocimiento/i })).toBeInTheDocument();
    });
  });

  test('navegación al globo terráqueo', async () => {
    render(
      <TestWrapper initialRoute="/">
        <AppRoutes />
      </TestWrapper>
    );

    // Verificar página inicial
    expect(screen.getByRole('heading', { name: /exploradores del conocimiento/i })).toBeInTheDocument();

    // Navegar al Globo Terráqueo
    const globoTerraqueoTitle = screen.getByRole('heading', { name: /globo terráqueo/i });
    const globoTerraqueoLink = globoTerraqueoTitle.closest('a');
    if (globoTerraqueoLink) {
      fireEvent.click(globoTerraqueoLink);
    }

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /globo terráqueo/i })).toBeInTheDocument();
    });
  });

  test('funcionalidad del sidebar responsive', () => {
    render(
      <TestWrapper initialRoute="/">
        <AppRoutes />
      </TestWrapper>
    );

    // Verificar que el sidebar está presente
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toBeInTheDocument();

    // Verificar que los enlaces de navegación están presentes en el sidebar
    expect(screen.getByRole('link', { name: /inicio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sistema solar/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /mapa colombia/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /globo terráqueo/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /simulación robots/i })).toBeInTheDocument();
  });
});