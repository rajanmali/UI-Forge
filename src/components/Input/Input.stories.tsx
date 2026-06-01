import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Name', placeholder: 'Enter your name' },
};

export const WithHelper: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    helperText: "We'll never share your email.",
  },
};

export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    errorText: 'Username is already taken.',
    defaultValue: 'rajan123',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search components…',
    leftIcon: <SearchIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    rightIcon: <MailIcon />,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Locked field',
    placeholder: 'Cannot edit',
    disabled: true,
    defaultValue: 'Read only value',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <Input size="sm" placeholder="Small input" label="Small" />
      <Input size="md" placeholder="Medium input" label="Medium" />
      <Input size="lg" placeholder="Large input" label="Large" />
    </div>
  ),
};
