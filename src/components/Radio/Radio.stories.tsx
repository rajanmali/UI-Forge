import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: { control: 'radio', options: ['vertical', 'horizontal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const PLAN_OPTIONS = [
  { value: 'free', label: 'Free', helperText: 'Up to 3 projects' },
  { value: 'pro', label: 'Pro', helperText: 'Unlimited projects' },
  { value: 'team', label: 'Team', helperText: 'Shared workspace + admin controls' },
];

const SIZE_OPTIONS = [
  { value: 'xs', label: 'Extra Small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
];

export const Default: Story = {
  args: {
    name: 'plan',
    label: 'Select a plan',
    options: PLAN_OPTIONS,
    value: 'pro',
  },
};

export const Horizontal: Story = {
  args: {
    name: 'size',
    label: 'Size',
    options: SIZE_OPTIONS,
    orientation: 'horizontal',
    value: 'md',
  },
};

export const WithError: Story = {
  args: {
    name: 'plan-error',
    label: 'Select a plan',
    options: PLAN_OPTIONS,
    errorText: 'Please select a plan to continue.',
  },
};

export const WithDisabledOption: Story = {
  args: {
    name: 'plan-disabled',
    label: 'Select a plan',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise', disabled: true, helperText: 'Contact sales' },
    ],
    value: 'free',
  },
};
