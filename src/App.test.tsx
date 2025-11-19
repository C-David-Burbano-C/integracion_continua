import { render, screen } from "@testing-library/react";
import { ScoreProvider } from "./context/ScoreContext";
import App from "./App";

test("renderiza el título principal", () => {
  render(
    <ScoreProvider>
      <App />
    </ScoreProvider>
  );
  // Buscar específicamente el elemento h1 con el título principal
  const titleElement = screen.getByRole('heading', { level: 1 });
  expect(titleElement).toHaveTextContent(/Exploradores del Conocimiento ERROR/i);
});