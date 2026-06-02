import { render, screen } from '@testing-library/react';
import Spinner from '../Spinner';

describe('Spinner', () => {
  it('has status role by default', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows screen-reader label when label prop provided', () => {
    render(<Spinner label="Loading posts" />);
    expect(screen.getByRole('status', { name: /loading posts/i })).toBeInTheDocument();
  });

  it('renders all sizes without error', () => {
    (['xs', 'sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Spinner size={size} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
      unmount();
    });
  });

  it('renders all color modes without error', () => {
    (['primary', 'white', 'current'] as const).forEach((color) => {
      const { unmount } = render(<Spinner color={color} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
      unmount();
    });
  });
});
