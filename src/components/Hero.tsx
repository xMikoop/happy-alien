"use client";

import { motion } from "framer-motion";
import JumpingAliens from "./JumpingAliens";

export default function Hero() {
  return (
    <div className="min-h-screen @container flex flex-col items-center justify-center text-center gap-8 px-4 relative overflow-hidden">
      {/* Tło gradientowe */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-700/30 via-transparent to-space-900/80 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Jumping Aliens na górze */}
        <div className="mb-4">
          <JumpingAliens />
        </div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="font-display text-4xl @[40rem]:text-7xl text-quasar glow-text leading-relaxed"
        >
          POSITIVE
          <br />
          <span className="text-star">ALIEN</span>
        </motion.h1>

        {/* Podtytuł */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-base @[40rem]:text-xl text-zinc-300 max-w-lg italic font-mono"
        >
          "Nikt nie spodziewa się Hiszpańskiej Inkwizycji... 
          ani tej platformy edukacyjnej!"
        </motion.p>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
          whileTap={{ scale: 0.9 }}
          className="mt-4 bg-walszak text-white font-display text-xs px-10 py-5 rounded-full shadow-[0_0_40px_rgba(236,72,153,0.5)]"
        >
          🚀 ROZPOCZNIJ PRZYGODĘ
        </motion.button>
      </div>
    </div>
  );
}
