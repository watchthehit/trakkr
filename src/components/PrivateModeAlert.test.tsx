import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PrivateModeAlert from './PrivateModeAlert';
import * as storage from '../utils/storage';

vi.mock('../utils/storage', () => ({
  isPrivateMode: false
}));

describe('PrivateModeAlert', () => {
  test('does not render when not in private mode', () => {
    render(<PrivateModeAlert />);
    expect(screen.queryByText(/Private Browsing Detected/)).not.toBeInTheDocument();
  });

  test('renders alert when in private mode', () => {
    vi.spyOn(storage, 'isPrivateMode', 'get').mockReturnValue(true);
    render(<PrivateModeAlert />);
    expect(screen.getByText(/Private Browsing Detected/)).toBeInTheDocument();
    expect(screen.getByText(/Your data will only be stored temporarily/)).toBeInTheDocument();
  });
});