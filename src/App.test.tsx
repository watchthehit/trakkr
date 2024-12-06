import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders header with app name', () => {
    render(<App />);
    expect(screen.getByText('trakkr')).toBeInTheDocument();
  });

  test('displays current date', () => {
    render(<App />);
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    expect(screen.getByText(currentDate)).toBeInTheDocument();
  });

  test('shows substance tracking grid', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /Previous month/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next month/i })).toBeInTheDocument();
  });

  test('navigation between months works', () => {
    render(<App />);
    const prevButton = screen.getByRole('button', { name: /Previous month/i });
    const nextButton = screen.getByRole('button', { name: /Next month/i });
    
    const initialMonth = screen.getByText(new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
    expect(initialMonth).toBeInTheDocument();
    
    fireEvent.click(nextButton);
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    expect(screen.getByText(nextMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))).toBeInTheDocument();
    
    fireEvent.click(prevButton);
    expect(initialMonth).toBeInTheDocument();
  });
});