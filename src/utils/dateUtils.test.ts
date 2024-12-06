import { describe, test, expect } from 'vitest';
import { 
  formatDate, 
  formatShortDate, 
  formatMonth, 
  formatWeekday,
  getMonthDays,
  formatDateKey,
  isNewDay
} from './dateUtils';

describe('dateUtils', () => {
  const testDate = new Date('2024-03-15');

  test('formatDate returns full date string', () => {
    expect(formatDate(testDate)).toBe('Friday, March 15, 2024');
  });

  test('formatShortDate returns day number', () => {
    expect(formatShortDate(testDate)).toBe('15');
  });

  test('formatMonth returns month and year', () => {
    expect(formatMonth(testDate)).toBe('March 2024');
  });

  test('formatWeekday returns short weekday', () => {
    expect(formatWeekday(testDate)).toBe('Fri');
  });

  test('getMonthDays returns correct number of dates', () => {
    const days = getMonthDays(2024, 2); // March 2024
    expect(days.length).toBe(42); // 6 weeks * 7 days
    expect(days[0]).toBeInstanceOf(Date);
  });

  test('formatDateKey returns ISO date string', () => {
    expect(formatDateKey(testDate)).toBe('2024-03-15');
  });

  test('isNewDay detects day change', () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString();
    expect(isNewDay(yesterday)).toBe(true);
    
    const today = new Date().toISOString();
    expect(isNewDay(today)).toBe(false);
  });
});