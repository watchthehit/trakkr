import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SubstanceGrid from './SubstanceGrid';

describe('SubstanceGrid', () => {
  const mockDate = new Date('2024-03-15');
  const mockDates = Array.from({ length: 42 }, (_, i) => {
    const date = new Date(mockDate);
    date.setDate(1 - date.getDay() + i);
    return date;
  });

  const mockConsumptionData = {
    '2024-03-15': {
      caffeine: false,
      alcohol: false,
      nicotine: false
    }
  };

  const mockProps = {
    dates: mockDates,
    consumptionData: mockConsumptionData,
    onToggle: vi.fn(),
    onPrevMonth: vi.fn(),
    onNextMonth: vi.fn(),
    currentDate: mockDate
  };

  test('renders calendar grid with correct number of days', () => {
    render(<SubstanceGrid {...mockProps} />);
    const days = screen.getAllByRole('button');
    // 42 days * 3 substances per day + 2 navigation buttons
    expect(days).toHaveLength(128);
  });

  test('handles substance toggle', () => {
    render(<SubstanceGrid {...mockProps} />);
    const substanceButtons = screen.getAllByRole('button').filter(button => 
      button.getAttribute('title')?.includes('caffeine') ||
      button.getAttribute('title')?.includes('alcohol') ||
      button.getAttribute('title')?.includes('nicotine')
    );
    
    fireEvent.click(substanceButtons[0]);
    expect(mockProps.onToggle).toHaveBeenCalled();
  });

  test('navigation buttons work', () => {
    render(<SubstanceGrid {...mockProps} />);
    
    const prevButton = screen.getByRole('button', { name: /Previous month/i });
    const nextButton = screen.getByRole('button', { name: /Next month/i });
    
    fireEvent.click(prevButton);
    expect(mockProps.onPrevMonth).toHaveBeenCalled();
    
    fireEvent.click(nextButton);
    expect(mockProps.onNextMonth).toHaveBeenCalled();
  });
});