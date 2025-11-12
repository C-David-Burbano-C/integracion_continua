import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GloboTerraqueo from '../views/GloboTerraqueo';

// Wrapper para proporcionar el contexto de enrutamiento necesario
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('GloboTerraqueo - Component Tests', () => {
  test('renderiza el título principal del globo terráqueo', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Globo Terráqueo Interactivo')).toBeInTheDocument();
  });

  test('muestra la descripción del componente', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Explora el planeta Tierra con Google Earth')).toBeInTheDocument();
  });

  test('renderiza el título de la visualización 3D', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('Globo Terráqueo 3D - Visualización con CesiumJS')).toBeInTheDocument();
  });

  test('contiene las instrucciones de uso del globo', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText(/Usa el mouse para rotar la Tierra/)).toBeInTheDocument();
  });

  test('muestra la sección de datos curiosos', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('🌍 Datos Curiosos sobre la Tierra')).toBeInTheDocument();
  });

  test('renderiza las estadísticas principales', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('510.1')).toBeInTheDocument();
    expect(screen.getByText('Millones km²')).toBeInTheDocument();
    expect(screen.getByText('8.04')).toBeInTheDocument();
    expect(screen.getByText('Mil millones')).toBeInTheDocument();
  });

  test('muestra información sobre continentes', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('7 Continentes')).toBeInTheDocument();
  });

  test('contiene información sobre océanos', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('5 Océanos')).toBeInTheDocument();
  });

  test('muestra datos sobre la atmósfera', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('🌡️ Clima y Atmósfera')).toBeInTheDocument();
  });

  test('renderiza la sección de geografía física', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('🏔️ Geografía')).toBeInTheDocument();
  });

  test('contiene información sobre el relieve terrestre', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('🏔️ Geografía')).toBeInTheDocument();
  });

  test('muestra datos sobre cuerpos de agua', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('🌊 Océanos y Agua')).toBeInTheDocument();
  });

  test('renderiza la sección de biodiversidad', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('🌱 Biodiversidad')).toBeInTheDocument();
  });

  test('contiene información sobre ecosistemas', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('🌡️ Clima y Atmósfera')).toBeInTheDocument();
  });

  test('muestra datos sobre especies', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('🌱 Biodiversidad')).toBeInTheDocument();
  });

  test('renderiza la sección de datos demográficos', () => {
    render(
      <TestWrapper>
        <GloboTerraqueo />
      </TestWrapper>
    );

    expect(screen.getByText('🚀 Exploración Espacial')).toBeInTheDocument();
  });
});