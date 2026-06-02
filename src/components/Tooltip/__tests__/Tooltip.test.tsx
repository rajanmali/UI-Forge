import { render, screen, fireEvent, act } from '@testing-library/react';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the trigger child', () => {
    render(
      <Tooltip content="Save" placement="top">
        <button>Save</button>
      </Tooltip>,
    );
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('shows tooltip content after delay on hover', () => {
    render(
      <Tooltip content="Tooltip text" delay={300}>
        <button>Trigger</button>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(350);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip text');
  });

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip content="Tip" delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('does not show tooltip when disabled', () => {
    render(
      <Tooltip content="Hidden" disabled>
        <button>Trigger</button>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
