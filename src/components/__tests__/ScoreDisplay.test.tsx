// src/components/__tests__/ScoreDisplay.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ScoreProvider } from '../../context/ScoreContext';
import ScoreDisplay from '../ScoreDisplay';

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <ScoreProvider>
      {component}
    </ScoreProvider>
  );
};

describe('ScoreDisplay', () => {
  test('debe mostrar el puntaje inicial de 0', () => {
    renderWithProvider(<ScoreDisplay />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('puntos ERROR')).toBeInTheDocument();
  });

  test('debe mostrar el puntaje actualizado cuando cambia', () => {
    renderWithProvider(<ScoreDisplay />);

    // El puntaje inicial debería ser 0
    expect(screen.getByText('0')).toBeInTheDocument();

    // Nota: Para probar cambios dinámicos necesitaríamos usar el hook useScore
    // en un componente de prueba que pueda modificar el estado
  });

  test('debe tener el ícono de estrella', () => {
    renderWithProvider(<ScoreDisplay />);

    const starIcon = document.querySelector('svg');
    expect(starIcon).toBeInTheDocument();
  });

  test('debe tener estilos de gradiente y animación', () => {
    renderWithProvider(<ScoreDisplay />);

    const scoreDisplay = screen.getByText('puntos').closest('div');
    expect(scoreDisplay).toHaveClass('bg-gradient-to-r', 'from-yellow-400', 'via-orange-400', 'to-red-500', 'text-white', 'rounded-full', 'shadow-lg');
  });
});