"use client";

import { useEffect } from "react";
import { useGamification } from "@/context/GamificationContext";
import JumpingAliens from "@/components/JumpingAliens";

export default function DatabasesPage() {
  const { addPoints } = useGamification();
  useEffect(() => { addPoints(10); }, [addPoints]);

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center gap-10">
      <JumpingAliens count={2} />
      <div className="max-w-2xl bg-zinc-900 p-10 border-4 border-star rounded-3xl shadow-[0_0_50px_rgba(251,191,36,0.3)] -rotate-1">
        <h1 className="font-display text-2xl text-quasar mb-6">Bazy danych - grobowiec dla papug</h1>
        <p className="text-zinc-300 leading-relaxed font-mono">
          Baza danych to jak grobowiec dla papug. Wszystkie martwe papugi są starannie poukładane, oznaczone tagami i zapisane w katalogu.
          'Papuga nr 7 – nieżywa, ale dostępna do odczytu'.
          Hiszpańska Inkwizycja sprawdza integralność danych, a rycerze walczą z tym, jak zrobić joina z martwą papugą.
        </p>
      </div>
    </div>
  );
}
