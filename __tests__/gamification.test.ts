import { describe, it, expect, beforeEach } from 'vitest';
import { useGamification } from '../src/hooks/useGamification';
import { renderHook, act } from '@testing-library/react';

describe('Gamification System', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should initialize with 0 points', () => {
    const { result } = renderHook(() => useGamification());
    expect(result.current.points).toBe(0);
  });

  it('should add points and persist them', () => {
    const { result } = renderHook(() => useGamification());
    act(() => {
      result.current.addPoints(10);
    });
    expect(result.current.points).toBe(10);
    expect(window.localStorage.getItem('cadence_points')).toBe('10');
  });
});
