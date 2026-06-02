import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  it('renders with a label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
  });

  it('starts unchecked by default', () => {
    render(<Checkbox label="Option" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('reflects checked state', () => {
    render(<Checkbox label="Option" checked onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('fires onChange when clicked', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Option" onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not fire onChange when disabled', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Disabled" disabled onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows error message when errorText prop provided', () => {
    render(<Checkbox label="Option" errorText="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<Checkbox label="Option" helperText="Optional" />);
    expect(screen.getByText('Optional')).toBeInTheDocument();
  });

  it('sets aria-invalid when errorText is present', () => {
    render(<Checkbox label="Option" errorText="Error" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });
});
