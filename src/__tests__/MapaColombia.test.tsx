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

    expect(screen.getByText('Mapa Interactivo de Colombia ERROR')).toBeInTheDocument();
  });

  test('muestra la descripción del componente', () => {
    render(
      <TestWrapper>
        <MapaColombia />
      </TestWrapper>
    );

    expect(screen.getByText('Vuela con vista satelital, descubre regiones naturales y deja que nuestro narrador IA te cuente historias sobre fauna, gastronomía y cultura.')).toBeInTheDocument();
  });

  test('renderiza el título de la vista satelital', () => {
    render(
      <TestWrapper>
        <MapaColombia />
      </TestWrapper>
    );

    expect(screen.getByText('Bitácora viajera')).toBeInTheDocument();
  });

  test('contiene un iframe con el mapa de Google', () => {
    render(
      <TestWrapper>
        <MapaColombia />
      </TestWrapper>
    );

    // El componente ya no usa iframe, usa CesiumGlobe
    const cesiumContainer = document.querySelector('.relative.rounded-3xl');
    expect(cesiumContainer).toBeInTheDocument();
  });
});