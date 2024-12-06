import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DatePicker from './DatePicker';

describe('DatePicker', () => {
  const mockDate = new Date('2024-03-15');
  const mockProps = {
    currentDate: mockDate,
    onDateChange: vi.fn(),
    onToday: vi.fn(),
  };

  test('renders month and year selectors', () => {
    render(<DatePicker {...mockProps} />);
    expect(screen.getByText('March')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  test('handles month change', () => {
    render(<DatePicker {...mockProps} />);
    const monthSelect = screen.getByText('March').closest('select');
    fireEvent.change(monthSelect!, { target: { value: '0' } });
    expect(mockProps.onDateChange).toHaveBeenCalled();
  });

  test('handles year change', () => {
    render(<DatePicker {...mockProps} />);
    const yearSelect = screen.getByText('2024').closest('select');
    fireEvent.change(yearSelect!, { target: { value: '2023' } });
    expect(mockProps.onDateChange).toHaveBeenCalled();
  });

  test('handles today button click', () => {
    render(<DatePicker {...mockProps} />);
    const todayButton = screen.getByText('Today');
    fireEvent.click(todayButton);
    expect(mockProps.onToday).toHaveBeenCalled();
  });
});