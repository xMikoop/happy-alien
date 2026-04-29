import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/Header";
import { GamificationProvider } from "@/context/GamificationContext";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

beforeEach(() => {
  localStorage.clear();
});

function Wrapper({ children }: { children: React.ReactNode }) {
  return <GamificationProvider>{children}</GamificationProvider>;
}

describe("Header", () => {
  it("renders POSITIVE ALIEN brand", () => {
    render(<Header />, { wrapper: Wrapper });
    const brand = screen.getByRole("link", { name: /POSITIVE ALIEN/i });
    expect(brand).toBeInTheDocument();
  });

  it("renders rank badge link", () => {
    render(<Header />, { wrapper: Wrapper });
    const rankLink = screen.getByRole("link", { name: /Zdezorientowany|Pyłek|Pożeracz|Rycerz|Minister|Monty/i });
    expect(rankLink).toBeInTheDocument();
    expect(rankLink).toHaveAttribute("href", "/leaderboard");
  });

  it("toggles mobile menu", () => {
    render(<Header />, { wrapper: Wrapper });
    const btn = screen.getByLabelText(/otwórz menu/i);
    fireEvent.click(btn);
    expect(screen.getByLabelText(/zamknij menu/i)).toBeInTheDocument();
  });
});
