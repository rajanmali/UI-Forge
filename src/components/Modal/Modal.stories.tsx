import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    closeOnOverlay: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function ModalDemo({ size = 'md' as 'sm' | 'md' | 'lg' | 'xl' | 'full', title = 'Modal Title', content = 'Modal body content goes here. This is a fully accessible modal with focus trap, ESC-close, and scroll lock.' }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title={title} size={size}>
        <p style={{ color: 'var(--text-secondary)' }}>{content}</p>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Small: Story = {
  render: () => <ModalDemo size="sm" title="Confirm Action" content="Are you sure you want to delete this item? This action cannot be undone." />,
};

export const Large: Story = {
  render: () => <ModalDemo size="lg" title="Edit Profile" content="A larger modal for forms or rich content that needs more space." />,
};

export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Open with Footer</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Delete"
          footer={
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
            </div>
          }
        >
          <p style={{ color: 'var(--text-secondary)' }}>This action is permanent and cannot be undone.</p>
        </Modal>
      </>
    );
  },
};
