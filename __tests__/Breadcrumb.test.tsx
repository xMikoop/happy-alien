import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Breadcrumb from "@/components/Breadcrumb";
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/design",
}));

describe("Breadcrumb", () => {
  it("renders Start link", () => {
    render(<Breadcrumb />);
    expect(screen.getByRole("link", { name: /Start/i })).toBeInTheDocument();
  });

  it("renders current page name", () => {
    render(<Breadcrumb />);
    expect(screen.getByText(/System Design/i)).toBeInTheDocument();
  });

  it("home page link points to root", () => {
    render(<Breadcrumb />);
    expect(screen.getByRole("link", { name: /Start/i })).toHaveAttribute("href", "/");
  });
});
