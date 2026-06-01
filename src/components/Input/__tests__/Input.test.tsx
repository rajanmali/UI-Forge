import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Input', () => {
  it('renders a text input', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('associates a label with the input', () => {
    render(<Input label="Email address" id="email" />);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
  });

  it('sets aria-invalid and renders role="alert" when errorText is given', () => {
    render(<Input errorText="This field is required" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
  });

  it('renders helper text when no error', () => {
    render(<Input helperText="We will never share your email" />);
    expect(screen.getByText('We will never share your email')).toBeInTheDocument();
  });

  it('hides helper text when an error is present', () => {
    render(<Input helperText="Helper" errorText="Error" />);
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('links aria-describedby to the error element', () => {
    render(<Input id="field" errorText="Required" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('field-error'));
  });

  it('links aria-describedby to the helper element', () => {
    render(<Input id="field" helperText="Some hint" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('field-helper'));
  });

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('calls onChange as user types', async () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('renders left and right icon slots', () => {
    render(
      <Input
        leftIcon={<span data-testid="left-icon" />}
        rightIcon={<span data-testid="right-icon" />}
      />,
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('forwards a ref to the underlying input element', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
});
