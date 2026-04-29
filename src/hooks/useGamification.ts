import { useState, useEffect } from 'react';

export function useGamification() {
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const saved = window.localStorage.getItem('cadence_points');
    if (saved) setPoints(parseInt(saved, 10));
  }, []);

  const addPoints = (amount: number) => {
    setPoints(prev => {
      const newTotal = prev + amount;
      window.localStorage.setItem('cadence_points', newTotal.toString());
      return newTotal;
    });
  };

  return { points, addPoints };
}
