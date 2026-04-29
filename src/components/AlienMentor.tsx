"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { useGamification } from "@/context/GamificationContext";

const PYTHON_QUOTES = [
  "Moja tarcza antygrawitacyjna działa na herbatę. Daj mi herbaty! +5 pkt.",
  "Twoja inteligencja jest niemal tak wysoka jak wzrost karłowatego chomika. Imponujące! +10 pkt.",
  "Z punktu widzenia fizyki kwantowej, właśnie wygrałeś życie. Albo i nie. +5 pkt.",
  "Nikt nie spodziewa się Hiszpańskiej Inkwizycji... ani tych punktów! +15 pkt.",
  "Twoja matka była chomikiem, a twój ojciec śmierdział bzem! Ale kodujesz nieźle. +5 pkt.",
  "Uwaga! Wykryto niedobór herbaty w sekcji 7-G. Natychmiastowe uzupełnienie zalecane. +5 pkt.",
];

export default function AlienMentor() {
  const { addPoints } = useGamification();
  const [quote, setQuote] = useState("");
  const [visible, setVisible] = useState(false);
  const quoteIndexRef = useRef(0);
  const addPointsRef = useRef(addPoints);

  // Keep ref in sync — avoid stale closure
  useEffect(() => { addPointsRef.current = addPoints; }, [addPoints]);

  const showNextQuote = useCallback(() => {
    const idx = quoteIndexRef.current % PYTHON_QUOTES.length;
    setQuote(PYTHON_QUOTES[idx]);
    quoteIndexRef.current++;
    setVisible(true);
    addPointsRef.current(5);
  }, []);

  useEffect(() => {
    // Pierwszy dymek po 3s
    const firstTimer = setTimeout(showNextQuote, 3000);

    // Potem nowy co 15s
    const cycleTimer = setInterval(showNextQuote, 15000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(cycleTimer);
    };
  }, [showNextQuote]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.4 }}
          onAnimationComplete={() => {
            // Auto-hide po 8s
            setTimeout(() => setVisible(false), 8000);
          }}
          className="fixed bottom-10 right-10 z-[100] flex items-end gap-4"
        >
          {/* Dymek */}
          <div className="bg-white text-space-900 p-4 rounded-2xl rounded-br-none border-4 border-walszak max-w-xs shadow-[8px_8px_0px_rgba(236,72,153,1)] relative">
            <p className="font-mono text-xs font-bold">{quote}</p>
            {/* Strzałka dymka */}
            <div className="absolute bottom-[-14px] right-2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-t-white border-r-[10px] border-r-transparent"></div>
          </div>

          {/* Alien */}
          <div className="flex flex-col items-center">
            <div className="text-6xl filter drop-shadow-lg cursor-pointer hover:scale-110 transition-transform" onClick={() => setVisible(false)}>
              👽
            </div>
            <div className="bg-walszak text-[8px] px-2 py-0.5 mt-1 font-display text-white">
              MR. ALIEN
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
