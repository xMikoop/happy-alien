import { describe, it, expect } from 'vitest';

function getShipCount(points: number): number {
  // 1 statek na każde 50 punktów, max 20 statków
  return Math.min(Math.floor(points / 50), 20);
}

describe('Invasion Logic', () => {
  it('should return 0 ships for 0 points', () => {
    expect(getShipCount(0)).toBe(0);
  });

  it('should return 1 ship for 60 points', () => {
    expect(getShipCount(60)).toBe(1);
  });

  it('should cap at 20 ships', () => {
    expect(getShipCount(5000)).toBe(20);
  });
});
