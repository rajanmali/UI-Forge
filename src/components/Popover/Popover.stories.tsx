import type { Meta, StoryObj } from '@storybook/react';
import Popover from './Popover';
import Button from '../Button/Button';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <Button variant="secondary">Open Popover</Button>,
    title: 'Popover Title',
    content: <p style={{ color: 'var(--text-secondary)', margin: 0 }}>This popover supports 8 placement options, click-outside close, and ESC to dismiss.</p>,
  },
};

export const NoTitle: Story = {
  args: {
    trigger: <Button variant="ghost">More info</Button>,
    content: (
      <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>
        Quick information popover without a header.
      </p>
    ),
  },
};

export const AllPlacements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '80px' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <Popover
          key={p}
          placement={p}
          trigger={<Button variant="secondary" size="sm">{p}</Button>}
          title={`${p} placement`}
          content={<p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Popover positioned to the {p}.</p>}
        />
      ))}
    </div>
  ),
};

export const WithRichContent: Story = {
  args: {
    trigger: <Button variant="primary">Account</Button>,
    title: 'Account Settings',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Signed in as <strong>rajan@example.com</strong></p>
        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '4px 0' }} />
        <button style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', color: 'var(--text-primary)' }}>Profile</button>
        <button style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', color: 'var(--text-primary)' }}>Settings</button>
        <button style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', color: 'var(--palette-accent)' }}>Sign out</button>
      </div>
    ),
  },
};
