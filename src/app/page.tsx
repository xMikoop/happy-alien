"use client";

import Hero from "@/components/Hero";
import JumpingAliens from "@/components/JumpingAliens";

export default function HomePage() {
  return (
    <>
      <Hero />
      <JumpingAliens count={3} />
    </>
  );
}
