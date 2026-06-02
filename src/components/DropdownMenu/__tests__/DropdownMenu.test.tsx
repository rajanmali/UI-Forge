import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../DropdownMenu';

const SECTIONS = [
  {
    items: [
      { id: 'edit', label: 'Edit', onClick: vi.fn() },
      { id: 'copy', label: 'Copy', onClick: vi.fn() },
      { id: 'delete', label: 'Delete', onClick: vi.fn(), disabled: true },
    ],
  },
];

describe('DropdownMenu', () => {
  it('renders the trigger', () => {
    render(<DropdownMenu trigger={<button>Actions</button>} sections={SECTIONS} />);
    expect(screen.getByRole('button', { name: 'Actions' })).toBeInTheDocument();
  });

  it('menu is not visible initially', () => {
    render(<DropdownMenu trigger={<button>Actions</button>} sections={SECTIONS} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('shows menu items when trigger is clicked', async () => {
    render(<DropdownMenu trigger={<button>Actions</button>} sections={SECTIONS} />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument();
  });

  it('calls onClick when a menu item is clicked', async () => {
    const onClick = vi.fn();
    render(
      <DropdownMenu
        trigger={<button>Actions</button>}
        sections={[{ items: [{ id: 'edit', label: 'Edit', onClick }] }]}
      />,
    );
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('closes on Escape key', async () => {
    render(<DropdownMenu trigger={<button>Actions</button>} sections={SECTIONS} />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('disabled item has aria-disabled', async () => {
    render(<DropdownMenu trigger={<button>Actions</button>} sections={SECTIONS} />);
    await userEvent.click(screen.getByRole('button'));
    const deleteItem = screen.getByRole('menuitem', { name: 'Delete' });
    expect(deleteItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('trigger wrapper has aria-expanded and aria-haspopup', () => {
    const { container } = render(
      <DropdownMenu trigger={<button>Actions</button>} sections={SECTIONS} />,
    );
    // DropdownMenu wraps the trigger in a <span> that carries the ARIA attrs
    const wrapper = container.querySelector('[aria-haspopup="menu"]');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveAttribute('aria-expanded', 'false');
  });
});
