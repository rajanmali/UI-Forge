import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textarea from '../Textarea';

describe('Textarea', () => {
  it('renders with label', () => {
    render(<Textarea label="Bio" />);
    expect(screen.getByLabelText('Bio')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<Textarea label="Bio" helperText="Max 500 characters" />);
    expect(screen.getByText('Max 500 characters')).toBeInTheDocument();
  });

  it('shows error message and sets aria-invalid', () => {
    render(<Textarea label="Bio" errorText="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('fires onChange', async () => {
    const onChange = vi.fn();
    render(<Textarea label="Bio" onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'Hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Textarea label="Bio" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('reflects controlled value', () => {
    render(<Textarea label="Bio" value="Hello world" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('Hello world');
  });
});
