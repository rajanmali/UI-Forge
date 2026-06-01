import type { Meta, StoryObj } from '@storybook/react';
import Textarea from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself…',
    rows: 4,
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Description',
    placeholder: 'Add a description…',
    helperText: 'Max 500 characters.',
    rows: 3,
  },
};

export const WithError: Story = {
  args: {
    label: 'Bio',
    errorText: 'Bio must be at least 20 characters.',
    defaultValue: 'Too short',
    rows: 3,
  },
};

export const NoResize: Story = {
  args: {
    label: 'Fixed height',
    placeholder: 'This textarea cannot be resized…',
    resize: 'none',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Read-only notes',
    defaultValue: 'These notes cannot be edited.',
    disabled: true,
    rows: 3,
  },
};
