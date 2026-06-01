import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const ROLE_OPTIONS = [
  { value: 'frontend', label: 'Frontend Engineer' },
  { value: 'backend', label: 'Backend Engineer' },
  { value: 'fullstack', label: 'Fullstack Engineer' },
  { value: 'design', label: 'Product Designer' },
  { value: 'pm', label: 'Product Manager' },
];

const GROUPED_OPTIONS = [
  {
    label: 'Engineering',
    options: [
      { value: 'frontend', label: 'Frontend Engineer' },
      { value: 'backend', label: 'Backend Engineer' },
      { value: 'devops', label: 'DevOps Engineer' },
    ],
  },
  {
    label: 'Design',
    options: [
      { value: 'ux', label: 'UX Designer' },
      { value: 'ui', label: 'UI Designer' },
    ],
  },
  {
    label: 'Management',
    options: [
      { value: 'pm', label: 'Product Manager' },
      { value: 'em', label: 'Engineering Manager', disabled: true },
    ],
  },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
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
  args: {
    label: 'Role',
    options: ROLE_OPTIONS,
    placeholder: 'Select a role',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Role',
    options: ROLE_OPTIONS,
    value: 'frontend',
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Role',
    options: ROLE_OPTIONS,
    helperText: 'Choose your primary role.',
    placeholder: 'Select a role',
  },
};

export const WithError: Story = {
  args: {
    label: 'Role',
    options: ROLE_OPTIONS,
    errorText: 'Please select a role to continue.',
  },
};

export const Grouped: Story = {
  args: {
    label: 'Team role',
    options: GROUPED_OPTIONS,
    placeholder: 'Select a role',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Region',
    options: [{ value: 'us', label: 'United States' }],
    value: 'us',
    disabled: true,
  },
};
