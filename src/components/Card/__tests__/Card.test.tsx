import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders as a button when clickable', () => {
    render(
      <Card clickable onClick={() => {}}>
        Click me
      </Card>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('fires onClick when clickable card is clicked', async () => {
    const onClick = vi.fn();
    render(
      <Card clickable onClick={onClick}>
        Click
      </Card>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders all variants without error', () => {
    (['elevated', 'outlined', 'filled'] as const).forEach((variant) => {
      const { unmount } = render(<Card variant={variant}>content</Card>);
      expect(screen.getByText('content')).toBeInTheDocument();
      unmount();
    });
  });
});
