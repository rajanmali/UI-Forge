import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    status: { control: 'select', options: [undefined, 'online', 'away', 'busy', 'offline'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInitials: Story = {
  args: { name: 'Rajan Mali', size: 'md' },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'User avatar',
    size: 'md',
  },
};

export const WithStatus: Story = {
  args: { name: 'Jane Doe', size: 'md', status: 'online' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
      <Avatar name="Alex" size="xs" />
      <Avatar name="Alex" size="sm" />
      <Avatar name="Alex" size="md" />
      <Avatar name="Alex" size="lg" />
      <Avatar name="Alex" size="xl" />
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Avatar name="Online User" size="md" status="online" />
      <Avatar name="Away User" size="md" status="away" />
      <Avatar name="Busy User" size="md" status="busy" />
      <Avatar name="Offline User" size="md" status="offline" />
    </div>
  ),
};

export const DeterministicColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'].map((name) => (
        <Avatar key={name} name={name} size="md" />
      ))}
    </div>
  ),
};
