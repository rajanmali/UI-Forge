import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    dot: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'primary', children: 'Badge' },
};

export const WithDot: Story = {
  args: { variant: 'success', dot: true, children: 'Active' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant="primary" size="sm">Small</Badge>
      <Badge variant="primary" size="md">Medium</Badge>
      <Badge variant="primary" size="lg">Large</Badge>
    </div>
  ),
};

export const WithDots: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="warning" dot>Away</Badge>
      <Badge variant="error" dot>Busy</Badge>
      <Badge variant="neutral" dot>Offline</Badge>
    </div>
  ),
};
