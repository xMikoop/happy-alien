"use client";

import Link from "next/link";
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
    <nav className="border-b border-space-700/30 bg-space-900/60 backdrop-blur-sm px-4 py-2" aria-label="Breadcrumb">
      <ol className="mx-auto flex max-w-6xl items-center gap-1 text-xs font-display text-zinc-500">
        <li>
          <Link href="/" className="hover:text-quasar transition-colors">
            👽 Start
          </Link>
        </li>
        {segments.map((segment, i) => {
          const href = "/" + segments.slice(0, i + 1).join("/");
          const isLast = i === segments.length - 1;
          const name = PAGE_NAMES[href] || segment;
          return (
            <li key={href} className="flex items-center gap-1">
              <span className="text-zinc-600">/</span>
              {isLast ? (
                <span className="text-star">{name}</span>
              ) : (
                <Link href={href} className="hover:text-quasar transition-colors">
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
