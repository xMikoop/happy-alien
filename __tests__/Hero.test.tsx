import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";

describe("Hero", () => {
  it('renders "POSITIVE ALIEN" heading', () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { name: /POSITIVE/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders Monty Python quote', () => {
    render(<Hero />);
    const quote = screen.getByText(/hiszpańskiej inkwizycji/i);
    expect(quote).toBeInTheDocument();
  });

  it('renders "ROZPOCZNIJ PRZYGODĘ" button', () => {
    render(<Hero />);
    const button = screen.getByRole("button", { name: /ROZPOCZNIJ PRZYGODĘ/i });
    expect(button).toBeInTheDocument();
  });

  it("renders jumping aliens", () => {
    render(<Hero />);
    const aliens = screen.getAllByText("👽");
    expect(aliens.length).toBeGreaterThanOrEqual(3);
  });
});
