import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from '../Popover';

describe('Popover', () => {
  it('renders the trigger', () => {
    render(<Popover trigger={<button>Open</button>} content="Popover body" />);
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
  });

  it('content is not visible initially', () => {
    render(<Popover trigger={<button>Open</button>} content="Popover body" />);
    expect(screen.queryByText('Popover body')).not.toBeInTheDocument();
  });

  it('shows content when trigger is clicked', async () => {
    render(<Popover trigger={<button>Open</button>} content="Popover body" />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Popover body')).toBeInTheDocument();
  });

  it('shows title when provided', async () => {
    render(<Popover trigger={<button>Open</button>} content="Body" title="Popover title" />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Popover title')).toBeInTheDocument();
  });

  it('closes when Escape is pressed', async () => {
    render(<Popover trigger={<button>Open</button>} content="Body" />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Body')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByText('Body')).not.toBeInTheDocument();
  });

  it('trigger wrapper has aria-expanded', () => {
    const { container } = render(<Popover trigger={<button>Open</button>} content="Body" />);
    // Popover wraps the trigger in a <span> that carries aria-expanded
    const wrapper = container.querySelector('[aria-expanded="false"]');
    expect(wrapper).toBeInTheDocument();
  });
});
