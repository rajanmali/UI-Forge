import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tabs from '../Tabs';
import type { TabItem } from '../Tabs';

const TABS: TabItem[] = [
  { id: 'one',   label: 'Tab One',   content: <p>Content One</p> },
  { id: 'two',   label: 'Tab Two',   content: <p>Content Two</p> },
  { id: 'three', label: 'Tab Three', content: <p>Content Three</p>, disabled: true },
];

describe('Tabs', () => {
  it('renders all tabs with correct ARIA roles', () => {
    render(<Tabs tabs={TABS} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('shows first tab content by default', () => {
    render(<Tabs tabs={TABS} />);
    expect(screen.getByText('Content One')).toBeInTheDocument();
    expect(screen.queryByText('Content Two')).not.toBeInTheDocument();
  });

  it('marks first tab as selected by default', () => {
    render(<Tabs tabs={TABS} />);
    expect(screen.getByRole('tab', { name: 'Tab One' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Tab Two' })).toHaveAttribute('aria-selected', 'false');
  });

  it('switches content on tab click', async () => {
    render(<Tabs tabs={TABS} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Tab Two' }));
    expect(screen.getByText('Content Two')).toBeInTheDocument();
    expect(screen.queryByText('Content One')).not.toBeInTheDocument();
  });

  it('fires onChange with the new tab id', async () => {
    const onChange = vi.fn();
    render(<Tabs tabs={TABS} onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Tab Two' }));
    expect(onChange).toHaveBeenCalledWith('two');
  });

  it('navigates to next tab with ArrowRight', async () => {
    render(<Tabs tabs={TABS} />);
    screen.getByRole('tab', { name: 'Tab One' }).focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Tab Two' })).toHaveFocus();
  });

  it('navigates to previous tab with ArrowLeft', async () => {
    render(<Tabs tabs={TABS} defaultTab="two" />);
    screen.getByRole('tab', { name: 'Tab Two' }).focus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Tab One' })).toHaveFocus();
  });

  it('wraps from last enabled tab back to first on ArrowRight', async () => {
    render(<Tabs tabs={TABS} defaultTab="two" />);
    screen.getByRole('tab', { name: 'Tab Two' }).focus();
    await userEvent.keyboard('{ArrowRight}');
    // Tab Three is disabled — wraps to Tab One
    expect(screen.getByRole('tab', { name: 'Tab One' })).toHaveFocus();
  });

  it('moves focus to first tab on Home', async () => {
    render(<Tabs tabs={TABS} defaultTab="two" />);
    screen.getByRole('tab', { name: 'Tab Two' }).focus();
    await userEvent.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Tab One' })).toHaveFocus();
  });

  it('moves focus to last enabled tab on End', async () => {
    render(<Tabs tabs={TABS} />);
    screen.getByRole('tab', { name: 'Tab One' }).focus();
    await userEvent.keyboard('{End}');
    // Last *enabled* tab is Tab Two (Tab Three is disabled)
    expect(screen.getByRole('tab', { name: 'Tab Two' })).toHaveFocus();
  });

  it('disabled tab cannot be clicked', async () => {
    const onChange = vi.fn();
    render(<Tabs tabs={TABS} onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Tab Three' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('starts on defaultTab when specified', () => {
    render(<Tabs tabs={TABS} defaultTab="two" />);
    expect(screen.getByRole('tab', { name: 'Tab Two' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content Two')).toBeInTheDocument();
  });
});
