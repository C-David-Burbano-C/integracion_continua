import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SistemaSolar from '../views/SistemaSolar';

// Wrapper para proporcionar el contexto de enrutamiento necesario
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('SistemaSolar - Component Tests', () => {
  test('renderiza el componente SistemaSolar', () => {
    render(
      <TestWrapper>
        <SistemaSolar />
      </TestWrapper>
    );

    // El componente renderiza sin errores
    expect(document.querySelector('.space-y-8')).toBeInTheDocument();
  });

  test('contiene la sección principal del sistema solar', () => {
    render(
      <TestWrapper>
        <SistemaSolar />
      </TestWrapper>
    );

    expect(document.querySelector('.bg-slate-50')).toBeInTheDocument();
  });

  test('renderiza el contenedor del visualizador solar', () => {
    render(
      <TestWrapper>
        <SistemaSolar />
      </TestWrapper>
    );

    expect(document.querySelector('.container')).toBeInTheDocument();
  });

  test('contiene el componente SolarSystemViewer', () => {
    render(
      <TestWrapper>
        <SistemaSolar />
      </TestWrapper>
    );

    // Verifica que se renderiza el componente hijo
    expect(document.querySelector('[data-testid="solar-system-viewer"]') ||
           document.querySelector('canvas')).toBeTruthy();
  });
});