"use client";

import { useEffect } from "react";
import { useGamification } from "@/context/GamificationContext";
import JumpingAliens from "@/components/JumpingAliens";

export default function DesignPage() {
  const { addPoints } = useGamification();
  useEffect(() => { addPoints(10); }, [addPoints]);

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center gap-10">
      <JumpingAliens count={2} />
      <div className="max-w-2xl bg-space-800 p-10 border-4 border-quasar rounded-3xl shadow-[20px_20px_0px_rgba(6,182,212,0.3)]">
        <h1 className="font-display text-2xl text-star mb-6">Projektowanie Systemów - czyli jak nie zabijać papugi</h1>
        <p className="text-zinc-300 leading-relaxed font-mono">
          Projektowanie systemów to sztuka utrzymywania papugi przy życiu, mimo że wszyscy wiedzą, że ona nie żyje.
          Papuga ta, niegdyś żywa i radośnie śpiewająca, teraz siedzi nieruchomo na gałązce.
          Systemy projektujemy tak, by wyglądały jakby działały, a w razie potrzeby można było powiedzieć:
          'Nie, nie jest martwa! Ona... eee... odpoczywa!'
        </p>
      </div>
    </div>
  );
}
