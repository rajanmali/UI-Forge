import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';
import type { SelectItem } from '../Select';

const OPTIONS: SelectItem[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C', disabled: true },
];

describe('Select', () => {
  it('renders a combobox', () => {
    render(<Select options={OPTIONS} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('is collapsed by default', () => {
    render(<Select options={OPTIONS} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows placeholder text when no value selected', () => {
    render(<Select options={OPTIONS} placeholder="Pick one" />);
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('opens listbox on click', async () => {
    render(<Select options={OPTIONS} />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes listbox on Escape', async () => {
    render(<Select options={OPTIONS} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('calls onChange with the selected value', async () => {
    const onChange = vi.fn();
    render(<Select options={OPTIONS} onChange={onChange} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByText('Option A'));
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('closes after selecting an option', async () => {
    render(<Select options={OPTIONS} onChange={vi.fn()} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByText('Option A'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows the selected label when value is controlled', () => {
    render(<Select options={OPTIONS} value="b" onChange={vi.fn()} />);
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('associates a label with the combobox', () => {
    render(<Select options={OPTIONS} label="Choose option" id="sel" />);
    expect(screen.getByLabelText('Choose option')).toBeInTheDocument();
  });

  it('shows aria-invalid and an error alert', () => {
    render(<Select options={OPTIONS} errorText="Selection required" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Selection required');
  });

  it('does not call onChange when a disabled option is clicked', async () => {
    const onChange = vi.fn();
    render(<Select options={OPTIONS} onChange={onChange} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByText('Option C'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('opens and selects with keyboard ArrowDown + Enter', async () => {
    const onChange = vi.fn();
    render(<Select options={OPTIONS} onChange={onChange} />);
    screen.getByRole('combobox').focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await userEvent.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith('a');
  });
});
