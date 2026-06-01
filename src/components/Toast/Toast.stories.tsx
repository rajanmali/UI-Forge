import type { Meta, StoryObj } from '@storybook/react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { addToast } from '../../store/uiSlice';
import ToastContainer from './Toast';
import Button from '../Button/Button';

function ToastDemo({ type }: { type: 'success' | 'error' | 'warning' | 'info' }) {
  const dispatch = useDispatch<AppDispatch>();
  const messages: Record<string, string> = {
    success: 'Changes saved successfully.',
    error: 'Something went wrong. Please try again.',
    warning: 'Your session will expire in 5 minutes.',
    info: 'A new version of the app is available.',
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={() => dispatch(addToast({ type, message: messages[type] }))}
      >
        Show {type} toast
      </Button>
      <ToastContainer />
    </>
  );
}

function AllToastsDemo() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button variant="primary" size="sm" onClick={() => dispatch(addToast({ type: 'success', message: 'Profile updated successfully.' }))}>
          Success
        </Button>
        <Button variant="secondary" size="sm" onClick={() => dispatch(addToast({ type: 'info', message: 'New features available in Settings.' }))}>
          Info
        </Button>
        <Button variant="ghost" size="sm" onClick={() => dispatch(addToast({ type: 'warning', message: 'Storage is 90% full.' }))}>
          Warning
        </Button>
        <Button variant="danger" size="sm" onClick={() => dispatch(addToast({ type: 'error', message: 'Failed to save changes.' }))}>
          Error
        </Button>
      </div>
      <ToastContainer />
    </>
  );
}

const meta: Meta<typeof ToastContainer> = {
  title: 'Components/Toast',
  component: ToastContainer,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  render: () => <ToastDemo type="success" />,
};

export const Error: Story = {
  render: () => <ToastDemo type="error" />,
};

export const Warning: Story = {
  render: () => <ToastDemo type="warning" />,
};

export const Info: Story = {
  render: () => <ToastDemo type="info" />,
};

export const AllTypes: Story = {
  render: () => <AllToastsDemo />,
};
