import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../Modal';

function ModalWrapper({
  open,
  onClose,
  closeOnOverlay = true,
}: {
  open: boolean;
  onClose: () => void;
  closeOnOverlay?: boolean;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Test Modal" closeOnOverlay={closeOnOverlay}>
      <p>Modal content</p>
    </Modal>
  );
}

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(<ModalWrapper open={false} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog with content when open', () => {
    render(<ModalWrapper open={true} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('has aria-modal="true" and aria-label from title', () => {
    render(<ModalWrapper open={true} onClose={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Test Modal');
  });

  it('calls onClose when Escape is pressed', async () => {
    const onClose = vi.fn();
    render(<ModalWrapper open={true} onClose={onClose} />);
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    render(<ModalWrapper open={true} onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: /close modal/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the overlay backdrop is clicked', () => {
    const onClose = vi.fn();
    render(<ModalWrapper open={true} onClose={onClose} />);
    const overlay = screen.getByRole('dialog');
    // Simulate a direct click on the overlay (not on a child)
    fireEvent.click(overlay, { currentTarget: overlay, target: overlay });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClose on overlay click when closeOnOverlay=false', () => {
    const onClose = vi.fn();
    render(<ModalWrapper open={true} onClose={onClose} closeOnOverlay={false} />);
    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay, { currentTarget: overlay, target: overlay });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders footer when provided', () => {
    render(
      <Modal open={true} onClose={vi.fn()} footer={<button>Confirm</button>}>
        Body
      </Modal>,
    );
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
  });

  it('hides close button when showCloseButton=false', () => {
    render(
      <Modal open={true} onClose={vi.fn()} showCloseButton={false} title="No X">
        Body
      </Modal>,
    );
    expect(screen.queryByRole('button', { name: /close modal/i })).not.toBeInTheDocument();
  });
});
