import type { Meta, StoryObj } from '@storybook/react';
import DropdownMenu from './DropdownMenu';
import Button from '../Button/Button';

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <rect width="13" height="13" x="9" y="9" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placement: { control: 'select', options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <Button variant="secondary">Actions ▾</Button>,
    sections: [
      {
        items: [
          { id: 'edit', label: 'Edit', icon: <EditIcon />, shortcut: '⌘E' },
          { id: 'copy', label: 'Duplicate', icon: <CopyIcon />, shortcut: '⌘D' },
        ],
      },
      {
        items: [
          { id: 'delete', label: 'Delete', icon: <TrashIcon />, danger: true },
        ],
      },
    ],
  },
};

export const WithSectionLabels: Story = {
  args: {
    trigger: <Button variant="secondary">Account ▾</Button>,
    sections: [
      {
        label: 'Profile',
        items: [
          { id: 'view', label: 'View profile' },
          { id: 'edit', label: 'Edit profile' },
        ],
      },
      {
        label: 'Workspace',
        items: [
          { id: 'settings', label: 'Settings' },
          { id: 'members', label: 'Members' },
          { id: 'billing', label: 'Billing', disabled: true },
        ],
      },
      {
        items: [
          { id: 'logout', label: 'Sign out', danger: true },
        ],
      },
    ],
  },
};

export const WithDisabledItems: Story = {
  args: {
    trigger: <Button variant="ghost">Options ▾</Button>,
    sections: [
      {
        items: [
          { id: 'export', label: 'Export CSV' },
          { id: 'import', label: 'Import CSV', disabled: true },
          { id: 'archive', label: 'Archive', disabled: true },
          { id: 'delete', label: 'Delete permanently', danger: true },
        ],
      },
    ],
  },
};
