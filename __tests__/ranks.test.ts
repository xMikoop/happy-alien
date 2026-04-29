import { describe, it, expect } from 'vitest';
import { getRankByPoints } from '../src/lib/ranks';

describe('Ranking System', () => {
  it('should return Level 1 for 0 XP', () => {
    const rank = getRankByPoints(0);
    expect(rank.level).toBe(1);
    expect(rank.name).toBe('Zdezorientowany Pyłek Gwiezdny');
  });

  it('should promote to Level 3 at 350 XP', () => {
    const rank = getRankByPoints(350);
    expect(rank.level).toBe(3);
    expect(rank.name).toBe("Rycerz, który mówi 'Ni!'");
  });

  it('should cap at Level 5', () => {
    const rank = getRankByPoints(5000);
    expect(rank.level).toBe(5);
  });
});
