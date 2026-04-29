"use client";

import { useEffect } from "react";
import { useGamification } from "@/context/GamificationContext";
import JumpingAliens from "@/components/JumpingAliens";

export default function MicroservicesPage() {
  const { addPoints } = useGamification();
  useEffect(() => { addPoints(10); }, [addPoints]);

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center gap-10">
      <JumpingAliens count={2} />
      <div className="max-w-2xl bg-space-800 p-10 border-4 border-walszak rounded-3xl shadow-[20px_20px_0px_rgba(236,72,153,0.3)] rotate-2">
        <h1 className="font-display text-2xl text-star mb-6">Mikrousługi - rozbicie papugi na kawałki</h1>
        <p className="text-zinc-300 leading-relaxed font-mono">
          Mikrousługi to jak rozdzielić papugę na kilka części, tak aby każda część myślała, że to ona jest papugą.
          Jedna noga odpowiada za lądowanie, druga za balansowanie, dziób za krzyk.
          Rycerze z Round Table próbują to zrozumieć, ale ciągle trafiają na tych samych Hiszpanów.
        </p>
      </div>
      <JumpingAliens count={2} />
    </div>
  );
}
