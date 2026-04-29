import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";

describe("Hero Component", () => {
  it('renders the main heading "KURWIX ACADEMY"', () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { name: /KURWIX/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the subtitle about architecture', () => {
    render(<Hero />);
    const subtitle = screen.getByText(/architektury/i);
    expect(subtitle).toBeInTheDocument();
  });

  it('renders the "START NAUKI" button', () => {
    render(<Hero />);
    const button = screen.getByRole("button", { name: /START NAUKI/i });
    expect(button).toBeInTheDocument();
  });

  it('renders the animated text "CIURALLA"', () => {
    render(<Hero />);
    const animatedText = screen.getByText(/CIURALLA/i);
    expect(animatedText).toBeInTheDocument();
  });
});
