"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface JumpingAliensProps {
  count?: number;
  size?: "sm" | "md" | "lg";
}

// Stałe animacje — brak chaosu losowości
const ALIEN_ANIMATIONS = [
  { y: [0, -20, 0], x: [0, 5, -5, 0], duration: 1.5 },
  { y: [0, -15, 0], x: [0, -8, 8, 0], duration: 1.8 },
  { y: [0, -25, 0], x: [0, 3, -3, 0], duration: 1.2 },
];

const SIZE_MAP = { sm: "text-2xl", md: "text-4xl", lg: "text-6xl" };

export default function JumpingAliens({ count = 3, size = "md" }: JumpingAliensProps) {
  return (
    <div className="flex justify-center items-center h-full">
      {[...Array(count)].map((_, index) => {
        const anim = ALIEN_ANIMATIONS[index % ALIEN_ANIMATIONS.length];
        return (
          <motion.div
            key={index}
            className={`${SIZE_MAP[size]} mx-2 text-quasar cursor-default select-none`}
            animate={{ y: anim.y, x: anim.x }}
            transition={{ duration: anim.duration, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
          >
            👽
          </motion.div>
        );
      })}
    </div>
  );
}
