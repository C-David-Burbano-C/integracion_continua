// src/components/Navbar.test.tsx
import { render, screen} from "@testing-library/react";
import { ScoreProvider } from "../context/ScoreContext";
import Navbar from "./Navbar";

// Limpia los mocks antes de cada prueba
beforeEach(() => {
  jest.clearAllMocks();
});

// --- Pruebas de renderizado ---
describe("Navbar - Renderizado", () => {
  test("renderiza el título principal 'Colegio Mentes Creativas'", () => {
    render(
      <ScoreProvider>
        <Navbar />
      </ScoreProvider>
    );
    expect(screen.getByText(/Colegio Mentes Creativas/i)).toBeInTheDocument();
  });

  test("renderiza el botón con el texto 'Tema'", () => {
    render(
      <ScoreProvider>
        <Navbar />
      </ScoreProvider>
    );
    expect(screen.getByRole("button", { name: /Tema/i })).toBeInTheDocument();
  });

  test("muestra el puntaje inicial en 0", () => {
    render(
      <ScoreProvider>
        <Navbar />
      </ScoreProvider>
    );
    expect(screen.getByText(/Puntaje: 0/i)).toBeInTheDocument();
  });
});

