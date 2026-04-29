"use client";

import { useEffect } from "react";
import { useGamification } from "@/context/GamificationContext";
import JumpingAliens from "@/components/JumpingAliens";
import { motion } from "framer-motion";
import Link from "next/link";

const TOPICS = [
  { title: "CI/CD — Tańcujący Rycerz", desc: "Continuous Integration to jak rycerz który non-stop ćwiczy. Continuous Deployment to jak rycerz który non-stop atakuje. Razem tworzą niepowstrzymany taniec." },
  { title: "Docker — Kontenery na Papugi", desc: "Docker to jak zamknąć papugę w kontenerze i powiedzieć 'działa na moim statku'. I faktycznie — dopóki ktoś nie zrestartuje statku." },
  { title: "Monitoring — Strażnik Wieży", desc: "Monitoring to jak strażnik na wieży który patrzy czy papugi żyją. Jak któraś przestaje śpiewać, dzwoni alarm i wszyscy biegają w panice." },
];

export default function DevOpsPage() {
  const { addPoints } = useGamification();
  useEffect(() => { addPoints(10); }, [addPoints]);

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center gap-10">
      <JumpingAliens count={3} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl bg-space-800 p-10 border-4 border-white rounded-3xl shadow-[10px_10px_50px_rgba(255,255,255,0.1)]"
      >
        <h1 className="font-display text-2xl text-walszak mb-6">DevOps - zaklęcie, które nie działa</h1>
        <p className="text-zinc-300 leading-relaxed font-mono mb-6">
          DevOps to magiczne zaklęcie, które ma ożywić papugę.
          Automatyzacja to rytuał, który wykonuje się, mimo że nikt nie wie, co on robi.
          "To działa na moim komputerze", mrużący się DevOp zauważa, a papuga znów umiera.
          Wszystkiemu towarzyszy niepokojący świst inkwizycji.
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

      <Link href="/leaderboard" className="text-xs font-display text-star hover:text-quasar transition-colors">
        → Dalej: Ranking
      </Link>

      <JumpingAliens count={2} />
    </div>
  );
}
