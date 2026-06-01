import type { Meta, StoryObj } from '@storybook/react';
import Switch from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    labelPosition: { control: 'radio', options: ['left', 'right'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Enable notifications', size: 'md' },
};

export const Checked: Story = {
  args: { label: 'Dark mode', defaultChecked: true },
};

export const LabelLeft: Story = {
  args: { label: 'Auto-save', labelPosition: 'left' },
};

export const WithHelper: Story = {
  args: {
    label: 'Email notifications',
    helperText: 'Receive emails for important updates.',
  },
};

export const Disabled: Story = {
  args: { label: 'Feature locked', disabled: true },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Switch size="sm" label="Small" defaultChecked />
      <Switch size="md" label="Medium" defaultChecked />
      <Switch size="lg" label="Large" defaultChecked />
    </div>
  ),
};
