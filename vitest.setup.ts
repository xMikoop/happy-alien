/// <reference types="vitest" />
import "@testing-library/jest-dom/vitest";

// Mock localStorage
const localStorageStore: Record<string, string> = {};
const mockLocalStorage = {
  getItem: (key: string) => localStorageStore[key] || null,
  setItem: (key: string, value: string) => { localStorageStore[key] = value; },
  clear: () => { Object.keys(localStorageStore).forEach(k => delete localStorageStore[k]); },
  removeItem: (key: string) => { delete localStorageStore[key]; },
};

Object.defineProperty(globalThis, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
  configurable: true,
});

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
  configurable: true,
});

beforeEach(() => {
  mockLocalStorage.clear();
});
