import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from '../Accordion';

describe('Accordion', () => {
  function setup() {
    return render(
      <Accordion>
        <Accordion.Item title="Section A">Content A</Accordion.Item>
        <Accordion.Item title="Section B">Content B</Accordion.Item>
        <Accordion.Item title="Disabled" disabled>
          Content C
        </Accordion.Item>
      </Accordion>,
    );
  }

  it('renders all trigger headings', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Section A' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Section B' })).toBeInTheDocument();
  });

  it('panels are collapsed by default', () => {
    setup();
    expect(screen.queryByText('Content A')).not.toBeInTheDocument();
  });

  it('opens a panel when its trigger is clicked', async () => {
    setup();
    await userEvent.click(screen.getByRole('button', { name: 'Section A' }));
    expect(screen.getByText('Content A')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Section A' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('closes an open panel when trigger is clicked again', async () => {
    setup();
    await userEvent.click(screen.getByRole('button', { name: 'Section A' }));
    await userEvent.click(screen.getByRole('button', { name: 'Section A' }));
    expect(screen.queryByText('Content A')).not.toBeInTheDocument();
  });

  it('only one item open at a time by default', async () => {
    setup();
    await userEvent.click(screen.getByRole('button', { name: 'Section A' }));
    await userEvent.click(screen.getByRole('button', { name: 'Section B' }));
    expect(screen.queryByText('Content A')).not.toBeInTheDocument();
    expect(screen.getByText('Content B')).toBeInTheDocument();
  });

  it('allows multiple open with allowMultiple', async () => {
    render(
      <Accordion allowMultiple>
        <Accordion.Item title="A">Content A</Accordion.Item>
        <Accordion.Item title="B">Content B</Accordion.Item>
      </Accordion>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'A' }));
    await userEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(screen.getByText('Content A')).toBeInTheDocument();
    expect(screen.getByText('Content B')).toBeInTheDocument();
  });

  it('opens items in defaultOpen', () => {
    render(
      <Accordion defaultOpen={[0]}>
        <Accordion.Item title="First">First content</Accordion.Item>
        <Accordion.Item title="Second">Second content</Accordion.Item>
      </Accordion>,
    );
    expect(screen.getByText('First content')).toBeInTheDocument();
    expect(screen.queryByText('Second content')).not.toBeInTheDocument();
  });

  it('disabled item cannot be toggled', async () => {
    setup();
    await userEvent.click(screen.getByRole('button', { name: 'Disabled' }));
    expect(screen.queryByText('Content C')).not.toBeInTheDocument();
  });

  it('triggers have correct ARIA attributes', () => {
    setup();
    const btn = screen.getByRole('button', { name: 'Section A' });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    expect(btn).toHaveAttribute('aria-controls');
  });
});
