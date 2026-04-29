"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface GamificationContextType {
  points: number;
  addPoints: (amount: number) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cadence_points');
    if (saved) setPoints(parseInt(saved, 10));
    setIsLoaded(true);
  }, []);

  const addPoints = (amount: number) => {
    setPoints(prev => {
      const newTotal = prev + amount;
      localStorage.setItem('cadence_points', newTotal.toString());
      return newTotal;
    });
  };

  if (!isLoaded) return null; // Unikanie hydracji przed załadowaniem danych

  return (
    <GamificationContext.Provider value={{ points, addPoints }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) throw new Error('useGamification must be used within Provider');
  return context;
};
