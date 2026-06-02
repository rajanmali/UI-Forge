import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../ErrorBoundary';

function Bomb({ shouldThrow }: { shouldThrow?: boolean }) {
  if (shouldThrow) throw new Error('Test error message');
  return <div>Safe content</div>;
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress the expected console.error from React about uncaught errors
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('renders fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('shows the error message in the fallback', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders a Reload page button', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('button', { name: /reload page/i })).toBeInTheDocument();
  });

  it('calls window.location.reload when Reload is clicked', async () => {
    const reload = vi.fn();
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload },
    });
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );
    await userEvent.click(screen.getByRole('button', { name: /reload page/i }));
    expect(reload).toHaveBeenCalledTimes(1);
  });
});
