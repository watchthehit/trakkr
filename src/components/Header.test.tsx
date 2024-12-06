import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  test('renders app name correctly', () => {
    render(<Header />);
    expect(screen.getByText('trakkr')).toBeInTheDocument();
  });

  test('has correct styling classes', () => {
    render(<Header />);
    const header = screen.getByText('trakkr').closest('h1');
    expect(header).toHaveClass('text-6xl', 'font-display', 'font-black');
  });
});