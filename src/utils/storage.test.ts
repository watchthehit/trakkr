import { describe, test, expect, beforeEach } from 'vitest';
import { getStoredState, saveState } from './storage';

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('getStoredState returns default state when storage is empty', () => {
    const state = getStoredState();
    const today = new Date().toISOString().split('T')[0];
    
    expect(state).toHaveProperty(today);
    expect(state[today]).toEqual({
      caffeine: false,
      alcohol: false,
      nicotine: false,
    });
  });

  test('getStoredState returns saved state', () => {
    const mockState = {
      '2024-03-15': {
        caffeine: true,
        alcohol: false,
        nicotine: true,
      },
    };
    
    localStorage.setItem('substance-tracker', JSON.stringify(mockState));
    const state = getStoredState();
    
    expect(state).toEqual(mockState);
  });

  test('saveState persists state to localStorage', () => {
    const mockState = {
      '2024-03-15': {
        caffeine: true,
        alcohol: false,
        nicotine: true,
      },
    };
    
    saveState(mockState);
    const stored = localStorage.getItem('substance-tracker');
    
    expect(JSON.parse(stored!)).toEqual(mockState);
  });
});