import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup } from '../Radio';

const OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte', disabled: true },
];

describe('RadioGroup', () => {
  it('renders all options', () => {
    render(<RadioGroup name="framework" options={OPTIONS} />);
    expect(screen.getByLabelText('React')).toBeInTheDocument();
    expect(screen.getByLabelText('Vue')).toBeInTheDocument();
    expect(screen.getByLabelText('Svelte')).toBeInTheDocument();
  });

  it('reflects controlled value', () => {
    render(<RadioGroup name="framework" options={OPTIONS} value="react" onChange={() => {}} />);
    expect(screen.getByLabelText('React')).toBeChecked();
    expect(screen.getByLabelText('Vue')).not.toBeChecked();
  });

  it('fires onChange with the selected value', async () => {
    const onChange = vi.fn();
    render(<RadioGroup name="framework" options={OPTIONS} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('Vue'));
    expect(onChange).toHaveBeenCalledWith('vue');
  });

  it('disables a specific option', () => {
    render(<RadioGroup name="framework" options={OPTIONS} />);
    expect(screen.getByLabelText('Svelte')).toBeDisabled();
  });

  it('disables all options when disabled prop is set', () => {
    render(<RadioGroup name="framework" options={OPTIONS} disabled />);
    screen.getAllByRole('radio').forEach((r) => expect(r).toBeDisabled());
  });

  it('shows error text', () => {
    render(<RadioGroup name="framework" options={OPTIONS} errorText="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('renders group label', () => {
    render(<RadioGroup name="framework" options={OPTIONS} label="Choose a framework" />);
    expect(screen.getByText('Choose a framework')).toBeInTheDocument();
  });
});
