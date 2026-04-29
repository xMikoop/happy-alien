"use client";

import React from 'react';
import { useGamification } from '@/context/GamificationContext';
import { motion } from 'framer-motion';

const COMPETITORS = [
  { "name": "Sir Lancelot du Laczenie Tablic", "xp": 127, "comment": "Próbował zaimplementować quicksorta za pomocą rzucanych tablic - zakończyło się krwawo." },
  { "name": "Dame Guinevere Regexów", "xp": 843, "comment": "Ponoć potrafi rozwiązać każdy problem jednym wyrażeniem regularnym... i rozwalić całą bazę danych." },
  { "name": "Brave Sir Robin Debuggerów", "xp": 56, "comment": "Uciekł przed każdym breakpointem, którego próbował obsłużyć." },
  { "name": "Tim the Enchanted Compiler", "xp": 1500, "comment": "Potrafi zbugować idealnie działający kod jednym spojrzeniem." },
  { "name": "The Knights of Ni Null Pointer", "xp": 234, "comment": "Nie mówi 'null', nie myśli o 'null', nie ma pojęcia co to 'null' - a jednak NullPointerException to jego specjalność." },
  { "name": "Dead Parrot Memory Leak", "xp": 672, "comment": "Zadeklarował wszystko jako const, a i tak zapomina zwolnić pamięć." },
  { "name": "The Spanish Inquisition Firewall", "xp": 981, "comment": "Nikt nie spodziewał się, że otworzy port 666 do świata." },
  { "name": "Ministry of Silly Walks CI/CD", "xp": 421, "comment": "Zepsuł deployment, próbując zrobić pipeline w stylu taneczno-komediowego." },
  { "name": "Flying Circus Exception Handler", "xp": 789, "comment": "Łapie wyjątki za pomocą sieciowej peleryny i magicznego zwoju." },
  { "name": "Mr. Creosote Garbage Collector", "xp": 1500, "comment": "Zjadł tyle nieużywanej pamięci, że system się zawiesił." }
];

export default function Leaderboard() {
  let points = 0;
  try {
    const ctx = useGamification();
    points = ctx.points;
  } catch {
    // SSR fallback
  }

  const allEntries = [
    ...COMPETITORS,
    { name: "TY (Ziemianin)", xp: points, comment: "To ty. Wyglądasz na kogoś, kto potrzebuje herbaty." }
  ].sort((a, b) => b.xp - a.xp);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-space-900/80 backdrop-blur-xl border-4 border-walszak p-8 rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.2)]"
    >
      <h2 className="text-3xl font-display text-quasar glow-text mb-8 text-center uppercase tracking-widest">
        Absurdalny Ranking
      </h2>
      <div className="overflow-hidden rounded-xl border border-space-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-space-800 text-star font-display text-[10px]">
              <th className="p-4 uppercase">Miejsce</th>
              <th className="p-4 uppercase">Imię</th>
              <th className="p-4 uppercase">XP</th>
              <th className="p-4 uppercase hidden md:table-cell">Komentarz Obcego</th>
            </tr>
          </thead>
          <tbody>
            {allEntries.map((entry, index) => (
              <tr 
                key={entry.name}
                className={`border-b border-space-800 transition-colors ${
                  entry.name.includes("TY") 
                    ? "bg-walszak/20 text-star" 
                    : "hover:bg-space-800/40 text-zinc-400"
                }`}
              >
                <td className="p-4 font-display text-xs">{index + 1}</td>
                <td className="p-4 font-bold">{entry.name}</td>
                <td className="p-4 font-mono text-quasar">{entry.xp}</td>
                <td className="p-4 text-[10px] italic hidden md:table-cell">"{entry.comment}"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
