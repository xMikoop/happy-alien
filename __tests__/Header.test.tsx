import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Header from "@/components/Header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Header", () => {
  it("renders KURWIX brand link", () => {
    render(<Header />);
    const brand = screen.getByRole("link", { name: /KURWIX/i });
    expect(brand).toBeInTheDocument();
    expect(brand).toHaveAttribute("href", "/");
  });

  it("has 5 desktop nav links", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: /galaktyczna/i });
    const links = within(nav).getAllByRole("link");
    // 1 brand + 5 nav = 6 links total in nav
    expect(links).toHaveLength(6);
  });

  it("toggles mobile menu on hamburger click", () => {
    render(<Header />);
    const menuBtn = screen.getByLabelText(/otwórz menu/i);
    expect(menuBtn).toHaveAttribute("aria-expanded", "false");

    const menu = document.getElementById("mobile-menu");
    expect(menu).not.toBeNull();
    expect(menu!.classList.contains("max-h-0")).toBe(true);

    // Click hamburger
    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute("aria-expanded", "true");
    expect(menu!.classList.contains("max-h-0")).toBe(false);
    expect(menu!.classList.contains("max-h-96")).toBe(true);
  });
});
