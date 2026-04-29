"use client";

import { useEffect } from "react";
import { useGamification } from "@/context/GamificationContext";
import JumpingAliens from "@/components/JumpingAliens";
import { motion } from "framer-motion";
import Link from "next/link";

const TOPICS = [
  { title: "Skalowalność — Rozciąganie Papugi", desc: "Skalowalność to jak rozciągać papugę na boki — horizontalnie (więcej papug) lub verticalnie (większa papuga). Oba podejścia bolą." },
  { title: "Load Balancer — Równy Podział Herbaty", desc: "Load balancer rozdziela ruch między serwery jak kelner rozdziela herbatę na turnieju rycerskim — każdy dostaje po równo, nikt nie czeka." },
  { title: "Caching — Schowana Herbata", desc: "Cache to jak schować herbatę pod poduszką — jak ją potrzebujesz, to jest od razu pod ręką. Ale jak zapomnisz gdzie schowałeś..." },
];

export default function DesignPage() {
  const { addPoints } = useGamification();
  useEffect(() => { addPoints(10); }, [addPoints]);

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center gap-10">
      <JumpingAliens count={3} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl bg-space-800 p-10 border-4 border-quasar rounded-3xl shadow-[20px_20px_0px_rgba(6,182,212,0.3)]"
      >
        <h1 className="font-display text-2xl text-star mb-6">Projektowanie Systemów - czyli jak nie zabijać papugi</h1>
        <p className="text-zinc-300 leading-relaxed font-mono mb-6">
          Projektowanie systemów to sztuka utrzymywania papugi przy życiu, mimo że wszyscy wiedzą, że ona nie żyje.
          Papuga ta, niegdyś żywa i radośnie śpiewająca, teraz siedzi nieruchomo na gałązce.
          Systemy projektujemy tak, by wyglądały jakby działały, a w razie potrzeby można było powiedzieć:
          "Nie, nie jest martwa! Ona... eee... odpoczywa!"
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

      <Link href="/microservices" className="text-xs font-display text-star hover:text-quasar transition-colors">
        → Dalej: Mikrousługi
      </Link>

      <JumpingAliens count={2} />
    </div>
  );
}
