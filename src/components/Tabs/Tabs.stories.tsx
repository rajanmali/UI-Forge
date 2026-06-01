import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './Tabs';

const BASIC_TABS = [
  { id: 'overview', label: 'Overview', content: <p style={{ padding: '16px 0', color: 'var(--text-secondary)' }}>Overview content goes here.</p> },
  { id: 'analytics', label: 'Analytics', content: <p style={{ padding: '16px 0', color: 'var(--text-secondary)' }}>Analytics data and charts.</p> },
  { id: 'settings', label: 'Settings', content: <p style={{ padding: '16px 0', color: 'var(--text-secondary)' }}>Configuration settings.</p> },
];

const TABS_WITH_DISABLED = [
  { id: 'active', label: 'Active', content: <p style={{ padding: '16px 0' }}>Active tab content.</p> },
  { id: 'billing', label: 'Billing', content: <p style={{ padding: '16px 0' }}>Billing content.</p> },
  { id: 'locked', label: 'Locked', disabled: true, content: <p>Locked content.</p> },
];

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['line', 'pill'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {
  args: {
    tabs: BASIC_TABS,
    variant: 'line',
    defaultTab: 'overview',
  },
};

export const Pill: Story = {
  args: {
    tabs: BASIC_TABS,
    variant: 'pill',
    defaultTab: 'overview',
  },
};

export const WithDisabledTab: Story = {
  args: {
    tabs: TABS_WITH_DISABLED,
    variant: 'line',
  },
};

export const WithIcons: Story = {
  args: {
    tabs: [
      {
        id: 'home',
        label: 'Home',
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
        content: <p style={{ padding: '16px 0' }}>Home content.</p>,
      },
      {
        id: 'user',
        label: 'Profile',
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
        content: <p style={{ padding: '16px 0' }}>Profile content.</p>,
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
        content: <p style={{ padding: '16px 0' }}>Settings content.</p>,
      },
    ],
    variant: 'line',
  },
};
