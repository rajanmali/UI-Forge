import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['elevated', 'outlined', 'filled'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    hoverable: { control: 'boolean' },
    clickable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'Elevated card — subtle shadow, sits above the background.',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined card — border only, no elevation.',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: 'Filled card — uses the surface background token.',
  },
};

export const Hoverable: Story = {
  args: {
    variant: 'elevated',
    hoverable: true,
    children: 'Hover me — the card lifts with a Framer Motion spring.',
  },
};

export const Clickable: Story = {
  args: {
    variant: 'elevated',
    clickable: true,
    children: 'Click me — keyboard and mouse accessible.',
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    variant: 'elevated',
    header: <strong>Card Header</strong>,
    footer: <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Last updated: today</span>,
    children: 'This card has a header and a footer slot.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '100%' }}>
      <Card variant="elevated">Elevated</Card>
      <Card variant="outlined">Outlined</Card>
      <Card variant="filled">Filled</Card>
    </div>
  ),
};
