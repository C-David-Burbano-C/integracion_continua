import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ScoreProvider } from '../context/ScoreContext';
import MapaColombia from '../views/MapaColombia';

// Wrapper para proporcionar el contexto necesario
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ScoreProvider>
      {children}
    </ScoreProvider>
  </BrowserRouter>
);

describe('MapaColombia - Component Tests', () => {
  test('renderiza el título principal del mapa', () => {
    render(
      <TestWrapper>
        <MapaColombia />
      </TestWrapper>
    );

    expect(screen.getByText('Mapa Interactivo de Colombia')).toBeInTheDocument();
  });

  test('muestra la descripción del componente', () => {
    render(
      <TestWrapper>
        <MapaColombia />
      </TestWrapper>
    );

    expect(screen.getByText('Explora Colombia con Google Earth')).toBeInTheDocument();
  });

  test('renderiza el título de la vista satelital', () => {
    render(
      <TestWrapper>
        <MapaColombia />
      </TestWrapper>
    );

    expect(screen.getByText('Vista Satelital de Colombia')).toBeInTheDocument();
  });

  test('contiene un iframe con el mapa de Google', () => {
    render(
      <TestWrapper>
        <MapaColombia />
      </TestWrapper>
    );

    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('title', 'Mapa de Colombia');
  });
});