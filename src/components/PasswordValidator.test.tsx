import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PasswordValidator from "../components/PasswordValidator";

describe("PasswordValidator Component", () => {
  test("muestra los requisitos iniciales como no cumplidos", () => {
    render(<PasswordValidator />);

    const failedRules = screen.getAllByRole('listitem');
    expect(failedRules).toHaveLength(3);
    failedRules.forEach(rule => {
      expect(rule).toHaveClass('text-red-600');
    });
  });

  test("valida correctamente cuando se escribe una contraseña válida", () => {
    render(<PasswordValidator />);
    const input = screen.getByPlaceholderText("Escriba su contraseña");

    fireEvent.change(input, { target: { value: "Password123" } });

    const successRules = screen.getAllByRole('listitem');
    successRules.forEach(rule => {
      expect(rule).toHaveClass('text-green-600');
    });
  });

  test("detecta cuando solo algunas reglas se cumplen", () => {
    render(<PasswordValidator />);
    const input = screen.getByPlaceholderText("Escriba su contraseña");

    fireEvent.change(input, { target: { value: "password123" } });

    const allRules = screen.getAllByRole('listitem');
    expect(allRules[0]).toHaveClass('text-green-600'); // Al menos 8 caracteres
    expect(allRules[1]).toHaveClass('text-green-600'); // Contiene un número
    expect(allRules[2]).toHaveClass('text-red-600'); // Contiene una letra mayúscula
  });
});
