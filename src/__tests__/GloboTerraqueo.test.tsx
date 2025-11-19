import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ScoreProvider } from '../context/ScoreContext';
import GloboTerraqueo from '../views/GloboTerraqueo';

// Wrapper para proporcionar el contexto de enrutamiento y puntuación necesario
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ScoreProvider>
      {children}
    </ScoreProvider>
  </BrowserRouter>
);

describe('GloboTerraqueo - Component Tests', () => {
  test('renderiza el título principal del globo terráqueo', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Globo Terráqueo Interactivo ERROR')).toBeInTheDocument();
  });

  test('muestra la descripción del componente', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Viaja alrededor del planeta con un globo 3D alimentado por CesiumJS y acompaña cada vista con curiosidades narradas en español.')).toBeInTheDocument();
  });

  test('contiene las instrucciones de uso del globo', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText(/Rueda del mouse para hacer zoom/)).toBeInTheDocument();
  });

  test('muestra la sección de datos curiosos', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Datos del planeta')).toBeInTheDocument();
  });

  test('renderiza las estadísticas principales', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('510.1')).toBeInTheDocument();
    expect(screen.getByText('Millones de km²')).toBeInTheDocument();
    expect(screen.getByText('8.04')).toBeInTheDocument();
    expect(screen.getByText('Mil millones')).toBeInTheDocument();
  });

  test('muestra información sobre continentes', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Continentes en cifras')).toBeInTheDocument();
  });

  test('contiene información sobre océanos', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Los cinco océanos')).toBeInTheDocument();
  });

  test('muestra datos sobre la atmósfera', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Atmósfera protectora')).toBeInTheDocument();
  });

  test('renderiza la sección de geografía física', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Océanos y agua')).toBeInTheDocument();
  });

  test('contiene información sobre el relieve terrestre', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Capas de la Tierra')).toBeInTheDocument();
  });

  test('muestra datos sobre cuerpos de agua', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Océanos y agua')).toBeInTheDocument();
  });

  test('renderiza la sección de biodiversidad', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Atmósfera protectora')).toBeInTheDocument();
  });

  test('contiene información sobre ecosistemas', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Atmósfera protectora')).toBeInTheDocument();
  });

  test('muestra datos sobre especies', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Atmósfera protectora')).toBeInTheDocument();
  });

  test('renderiza la sección de datos demográficos', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Narrador terrestre mágico')).toBeInTheDocument();
  });
});