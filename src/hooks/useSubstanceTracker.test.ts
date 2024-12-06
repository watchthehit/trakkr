import { describe, test, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSubstanceTracker } from './useSubstanceTracker';

describe('useSubstanceTracker', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('initializes with default state', () => {
    const { result } = renderHook(() => useSubstanceTracker());
    const today = new Date().toISOString().split('T')[0];
    
    expect(result.current.consumptionData).toHaveProperty(today);
    expect(result.current.consumptionData[today]).toEqual({
      caffeine: false,
      alcohol: false,
      nicotine: false,
    });
  });

  test('toggleSubstance updates state correctly', () => {
    const { result } = renderHook(() => useSubstanceTracker());
    const today = new Date().toISOString().split('T')[0];
    
    act(() => {
      result.current.toggleSubstance(today, 'caffeine');
    });
    
    expect(result.current.consumptionData[today].caffeine).toBe(true);
  });

  test('creates new day entry at midnight', () => {
    const { result } = renderHook(() => useSubstanceTracker());
    
    // Move to next day
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    act(() => {
      vi.setSystemTime(tomorrow);
      vi.advanceTimersByTime(60000); // Trigger interval check
    });
    
    const newDay = tomorrow.toISOString().split('T')[0];
    expect(result.current.consumptionData).toHaveProperty(newDay);
    expect(result.current.consumptionData[newDay]).toEqual({
      caffeine: false,
      alcohol: false,
      nicotine: false,
    });
  });
});