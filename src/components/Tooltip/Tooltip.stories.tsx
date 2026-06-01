import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import Button from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    delay: { control: 'number' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    placement: 'top',
    children: <Button variant="secondary">Hover me</Button>,
  },
};

export const AllPlacements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '40px' }}>
      <Tooltip content="Appears on top" placement="top">
        <Button variant="secondary" size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Appears on bottom" placement="bottom">
        <Button variant="secondary" size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Appears on the left" placement="left">
        <Button variant="secondary" size="sm">Left</Button>
      </Tooltip>
      <Tooltip content="Appears on the right" placement="right">
        <Button variant="secondary" size="sm">Right</Button>
      </Tooltip>
    </div>
  ),
};

export const NoDelay: Story = {
  args: {
    content: 'Instant tooltip',
    placement: 'top',
    delay: 0,
    children: <Button variant="secondary">No delay</Button>,
  },
};

export const Disabled: Story = {
  args: {
    content: 'You will not see this',
    disabled: true,
    children: <Button variant="ghost">Tooltip disabled</Button>,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <span>
        <strong>Keyboard shortcut:</strong> ⌘ + K
      </span>
    ),
    placement: 'bottom',
    children: <Button variant="secondary">Command palette</Button>,
  },
};
