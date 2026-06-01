import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Accept terms and conditions' },
};

export const Checked: Story = {
  args: { label: 'Notifications enabled', defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { label: 'Select all', indeterminate: true },
};

export const WithHelper: Story = {
  args: {
    label: 'Marketing emails',
    helperText: 'Receive updates about new features.',
  },
};

export const WithError: Story = {
  args: {
    label: 'I agree to the terms',
    errorText: 'You must accept the terms to continue.',
  },
};

export const Disabled: Story = {
  args: { label: 'Disabled option', disabled: true },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox size="sm" label="Small checkbox" defaultChecked />
      <Checkbox size="md" label="Medium checkbox" defaultChecked />
      <Checkbox size="lg" label="Large checkbox" defaultChecked />
    </div>
  ),
};
