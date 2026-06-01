import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from '../Switch';

describe('Switch', () => {
  it('renders with role="switch"', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('associates label text with the input', () => {
    render(<Switch label="Enable notifications" id="notif" />);
    expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument();
  });

  it('calls onChange when toggled', async () => {
    const onChange = vi.fn();
    render(<Switch onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('is checked when defaultChecked', () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('is unchecked by default', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn();
    render(<Switch disabled onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders helper text', () => {
    render(<Switch helperText="You will receive email updates" />);
    expect(screen.getByText('You will receive email updates')).toBeInTheDocument();
  });

  it('renders label on the left when labelPosition="left"', () => {
    render(<Switch label="Dark mode" labelPosition="left" />);
    const label = screen.getByText('Dark mode');
    const input = screen.getByRole('switch');
    // Label text node should appear before the input in the DOM
    expect(label.compareDocumentPosition(input) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
