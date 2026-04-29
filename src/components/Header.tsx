"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGamification } from "@/context/GamificationContext";
import { getRankByPoints } from "@/lib/ranks";

type NavLink = {
  href: string;
  label: string;
  emoji: string;
};

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Start", emoji: "🚀" },
  { href: "/design", label: "System Design", emoji: "🪐" },
  { href: "/leaderboard", label: "Ranking", emoji: "🏆" },
  { href: "/microservices", label: "Mikroserwisy", emoji: "⚡" },
  { href: "/databases", label: "Bazy Danych", emoji: "💾" },
  { href: "/devops", label: "DevOps", emoji: "🔧" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { points } = useGamification();
  const currentRank = getRankByPoints(points);

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-space-700/50 bg-space-900/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
        aria-label="Nawigacja galaktyczna"
      >
        <div className="flex items-center gap-10">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xs text-quasar glow-text hover:scale-105 transition-transform"
          >
            <span className="text-base">👽</span>
            POSITIVE ALIEN
          </Link>

          {/* Ranga */}
          <Link
            href="/leaderboard"
            className="hidden sm:flex items-center gap-1.5 bg-space-800/80 border border-walszak/40 px-4 py-2 rounded-full hover:border-walszak hover:shadow-[0_0_12px_rgba(236,72,153,0.3)] transition-all"
            title={currentRank.description}
          >
            <span className="text-base">👽</span>
            <span className="font-display text-xs text-walszak whitespace-nowrap">
              {currentRank.name}
            </span>
          </Link>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative px-4 py-2.5 font-display text-xs rounded-md transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-star bg-space-700/50 glow-text"
                    : "text-zinc-400 hover:text-quasar hover:bg-space-800/50"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                <span className="mr-1.5">{link.emoji}</span>
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-star animate-pulse" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2 -mr-2 rounded-md text-zinc-400 hover:text-quasar focus-visible:outline-2 focus-visible:outline-quasar"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 pb-4 pt-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 font-display text-xs rounded-lg transition-all ${
                  isActive(link.href)
                    ? "bg-space-700 text-star"
                    : "text-zinc-400 hover:bg-space-800 hover:text-quasar"
                }`}
              >
                <span>{link.emoji}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
