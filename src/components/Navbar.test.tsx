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
  test("renderiza el título principal 'UCC : Prácticas Desarrollo'", () => {
    render(
      <ScoreProvider>
        <Navbar />
      </ScoreProvider>
    );
    expect(screen.getByText(/UCC : Prácticas Desarrollo/i)).toBeInTheDocument();
  });

  test("renderiza el logo con la letra 'U'", () => {
    render(
      <ScoreProvider>
        <Navbar />
      </ScoreProvider>
    );
    expect(screen.getByText("U")).toBeInTheDocument();
  });
});

