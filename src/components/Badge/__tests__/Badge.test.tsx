import { render, screen } from '@testing-library/react';
import Badge from '../Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders dot indicator when dot prop is set', () => {
    const { container } = render(<Badge dot>New</Badge>);
    expect(container.querySelector('[aria-hidden]')).toBeInTheDocument();
  });

  it('renders all semantic variants', () => {
    const variants = [
      'success',
      'error',
      'warning',
      'info',
      'neutral',
      'primary',
      'secondary',
    ] as const;
    for (const v of variants) {
      const { unmount } = render(<Badge variant={v}>{v}</Badge>);
      expect(screen.getByText(v)).toBeInTheDocument();
      unmount();
    }
  });

  it('renders sm, md, lg sizes', () => {
    (['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Badge size={size}>label</Badge>);
      expect(screen.getByText('label')).toBeInTheDocument();
      unmount();
    });
  });
});
