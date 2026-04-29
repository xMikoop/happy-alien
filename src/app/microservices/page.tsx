"use client";

import { useEffect } from "react";
import { useGamification } from "@/context/GamificationContext";
import JumpingAliens from "@/components/JumpingAliens";
import { motion } from "framer-motion";
import Link from "next/link";

const TOPICS = [
  { title: "Monolit vs Mikrousługi", desc: "Monolit to jak jeden wielki smok — silny ale niezdarny. Mikrousługi to armia małych smoczków — każdy ma swoje zadanie." },
  { title: "API Gateway — Brama Zamkowa", desc: "API Gateway to jak strażnik na moście zamkowym. Sprawdza każdemu dokumenty, kieruje do odpowiedniej wieży i pilnuje żeby nienproszony gość nie wszedł." },
  { title: "Event-Driven Architecture", desc: "Systemy komunikują się jak rycerze na turnieju — wysyłają gońców z wiadomościami zamiast krzyczeć przez całą salę." },
];

export default function MicroservicesPage() {
  const { addPoints } = useGamification();
  useEffect(() => { addPoints(10); }, [addPoints]);

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center gap-10">
      <JumpingAliens count={3} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl bg-space-800 p-10 border-4 border-walszak rounded-3xl shadow-[20px_20px_0px_rgba(236,72,153,0.3)] rotate-2"
      >
        <h1 className="font-display text-2xl text-star mb-6">Mikrousługi - rozbicie papugi na kawałki</h1>
        <p className="text-zinc-300 leading-relaxed font-mono mb-6">
          Mikrousługi to jak rozdzielić papugę na kilka części, tak aby każda część myślała, że to ona jest papugą.
          Jedna noga odpowiada za lądowanie, druga za balansowanie, dziób za krzyk.
          Rycerze z Round Table próbują to zrozumieć, ale ciągle trafiają na tych samych Hiszpanów.
        </p>
      </motion.div>

      <div className="grid gap-6 max-w-4xl w-full px-4">
        {TOPICS.map((topic, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-space-800/60 p-6 border border-space-700 rounded-2xl hover:border-quasar transition-colors"
          >
            <h2 className="font-display text-sm text-quasar mb-3">{topic.title}</h2>
            <p className="text-zinc-400 font-mono text-sm">{topic.desc}</p>
          </motion.div>
        ))}
      </div>

      <Link href="/design" className="text-xs font-display text-star hover:text-quasar transition-colors">
        → Dalej: Projektowanie Systemów
      </Link>

      <JumpingAliens count={2} />
    </div>
  );
}
