import { render, screen } from '@testing-library/react';
import PageLoader from '../PageLoader';

describe('PageLoader', () => {
  it('renders a loading indicator', () => {
    render(<PageLoader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has an accessible label on the spinner', () => {
    render(<PageLoader />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label');
  });
});
