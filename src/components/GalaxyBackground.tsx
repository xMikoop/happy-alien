"use client";

import { useGamification } from "@/context/GamificationContext";

export default function GalaxyBackground() {
  const { points } = useGamification();
  const shipCount = Math.min(Math.floor(points / 50), 20);

  return (
    <div className="fixed inset-0 -z-10 bg-[#05050f]">
      {/* Uproszczone tło gwiazd w CSS zamiast Canvasa 3D */}
      <div className="absolute inset-0 opacity-30" 
           style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      {/* Info o flocie (uproszczone) */}
      {shipCount > 0 && (
        <div className="absolute bottom-4 left-4 text-[10px] font-display text-walszak/50">
          FLOTA INWAZYJNA: {shipCount} STATKÓW W UKRYCIU...
        </div>
      )}
    </div>
  );
}
