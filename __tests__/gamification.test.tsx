import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { GamificationProvider, useGamification } from '../src/context/GamificationContext';

// Clear localStorage before each test
beforeEach(() => {
  localStorage.clear();
});

function wrapper({ children }: { children: React.ReactNode }) {
  return <GamificationProvider>{children}</GamificationProvider>;
}

describe('Gamification System', () => {
  it('should initialize with 0 points', () => {
    const { result } = renderHook(() => useGamification(), { wrapper });
    expect(result.current.points).toBe(0);
  });

  it('should add points', () => {
    const { result } = renderHook(() => useGamification(), { wrapper });
    act(() => { result.current.addPoints(10); });
    expect(result.current.points).toBe(10);
  });
});
