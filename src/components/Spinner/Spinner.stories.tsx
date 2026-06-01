import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    color: { control: 'select', options: ['current', 'primary', 'white'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: 'md', color: 'primary' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Spinner size="xs" color="primary" />
      <Spinner size="sm" color="primary" />
      <Spinner size="md" color="primary" />
      <Spinner size="lg" color="primary" />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  render: () => (
    <div style={{ background: 'var(--palette-primary)', padding: '24px', borderRadius: '8px', display: 'flex', gap: '16px' }}>
      <Spinner size="sm" color="white" />
      <Spinner size="md" color="white" />
      <Spinner size="lg" color="white" />
    </div>
  ),
};
