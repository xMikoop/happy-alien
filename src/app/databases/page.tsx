"use client";

import { useEffect } from "react";
import { useGamification } from "@/context/GamificationContext";
import JumpingAliens from "@/components/JumpingAliens";
import { motion } from "framer-motion";
import Link from "next/link";

const TOPICS = [
  { title: "SQL vs NoSQL", desc: "SQL to jak porządny rycerski rejestr — wszystko w tabelach, relacjach i z pieczęciami. NoSQL to jak szalony bard — rzuca danymi gdzie popadnie, ale za to szybko." },
  { title: "Indeksy — Skróty do Papug", desc: "Indeks to jak spis treści w księdze papug. Bez niego musisz przewertować całą księgę. Z indeksem — otwierasz od razu właściwą stronę." },
  { title: "Replikacja — Klonowanie Papug", desc: "Replikacja to jak mieć kilka kopii tej samej martwej papugi. Jak jedna padnie, inna przejmuje jej obowiązki." },
];

export default function DatabasesPage() {
  const { addPoints } = useGamification();
  useEffect(() => { addPoints(10); }, [addPoints]);

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center gap-10">
      <JumpingAliens count={3} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl bg-zinc-900 p-10 border-4 border-star rounded-3xl shadow-[0_0_50px_rgba(251,191,36,0.3)] -rotate-1"
      >
        <h1 className="font-display text-2xl text-quasar mb-6">Bazy danych - grobowiec dla papug</h1>
        <p className="text-zinc-300 leading-relaxed font-mono mb-6">
          Baza danych to jak grobowiec dla papug. Wszystkie martwe papugi są starannie poukładane, oznaczone tagami i zapisane w katalogu.
          "Papuga nr 7 – nieżywa, ale dostępna do odczytu".
          Hiszpańska Inkwizycja sprawdza integralność danych, a rycerze walczą z tym, jak zrobić joina z martwą papugą.
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

      <Link href="/devops" className="text-xs font-display text-star hover:text-quasar transition-colors">
        → Dalej: DevOps
      </Link>

      <JumpingAliens count={2} />
    </div>
  );
}
