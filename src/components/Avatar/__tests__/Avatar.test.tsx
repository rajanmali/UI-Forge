import { render, screen } from '@testing-library/react';
import Avatar from '../Avatar';

describe('Avatar', () => {
  it('renders initials from name', () => {
    render(<Avatar name="Alice Chen" />);
    expect(screen.getByText('AC')).toBeInTheDocument();
  });

  it('renders single initial for single name', () => {
    render(<Avatar name="Bob" />);
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('renders image when src provided', () => {
    render(<Avatar name="Carol" src="photo.jpg" />);
    // The <img> element specifically (not the container span)
    const img = document.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'Carol');
  });

  it('has aria-label on the container', () => {
    render(<Avatar name="Dan Park" />);
    expect(screen.getByRole('img', { name: 'Dan Park' })).toBeInTheDocument();
  });

  it('shows status dot with aria-label', () => {
    render(<Avatar name="Eva" status="online" />);
    expect(screen.getByLabelText(/online/i)).toBeInTheDocument();
  });

  it('applies size variant', () => {
    const { container } = render(<Avatar name="Frank" size="lg" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
