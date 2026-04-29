"use client";

import { usePathname } from "next/navigation";

const PAGE_NAMES: Record<string, string> = {
  "/": "Start",
  "/design": "System Design",
  "/microservices": "Mikroserwisy",
  "/databases": "Bazy Danych",
  "/devops": "DevOps",
  "/leaderboard": "Ranking",
};

export default function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="sticky top-14 z-40 border-b border-space-700/50 bg-space-900/90 backdrop-blur-md px-4 py-2.5" aria-label="Breadcrumb">
      <ol className="mx-auto flex max-w-6xl items-center gap-2 text-sm">
        <li>
          <a href="/" onClick={() => window.location.href='/'} className="font-display text-xs text-quasar hover:text-star transition-colors px-2 py-1 rounded hover:bg-space-800/50">
            👽 Start
          </a>
        </li>
        {segments.map((segment, i) => {
          const href = "/" + segments.slice(0, i + 1).join("/");
          const isLast = i === segments.length - 1;
          const name = PAGE_NAMES[href] || segment;
          return (
            <li key={href} className="flex items-center gap-2">
              <span className="text-zinc-600">/</span>
              {isLast ? (
                <span className="font-display text-xs text-star px-2 py-1">{name}</span>
              ) : (
                <a href={href} onClick={() => window.location.href=href} className="font-display text-xs text-zinc-400 hover:text-quasar transition-colors px-2 py-1 rounded hover:bg-space-800/50">
                  {name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}