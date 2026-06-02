import type { Meta, StoryObj } from '@storybook/react';
import DataTable, { type ColumnDef } from './DataTable';

interface Person {
  id: number;
  name: string;
  role: string;
  status: string;
  joined: string;
}

const PEOPLE: Person[] = [
  { id: 1, name: 'Alice Chen', role: 'Engineer', status: 'Active', joined: '2022-01' },
  { id: 2, name: 'Bob Müller', role: 'Designer', status: 'Active', joined: '2021-06' },
  { id: 3, name: 'Carol Davies', role: 'PM', status: 'On leave', joined: '2023-03' },
  { id: 4, name: 'Dan Park', role: 'Engineer', status: 'Active', joined: '2020-11' },
  { id: 5, name: 'Eva Rossi', role: 'QA', status: 'Inactive', joined: '2022-08' },
  { id: 6, name: 'Frank Liu', role: 'Engineer', status: 'Active', joined: '2023-09' },
  { id: 7, name: 'Grace Adeyemi', role: 'Designer', status: 'Active', joined: '2021-02' },
];

const COLUMNS: ColumnDef<Person>[] = [
  { key: 'id', header: 'ID', sortable: true, width: '4rem' },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'status', header: 'Status', sortable: true },
  { key: 'joined', header: 'Joined', sortable: true },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => <DataTable columns={COLUMNS} data={PEOPLE} />,
};

export const WithFilterAndSort: Story = {
  render: () => (
    <DataTable columns={COLUMNS} data={PEOPLE} filterable filterPlaceholder="Search people…" />
  ),
};

export const CompactView: Story = {
  render: () => <DataTable columns={COLUMNS} data={PEOPLE} filterable compact />,
};

export const Paginated: Story = {
  render: () => (
    <DataTable columns={COLUMNS} data={[...PEOPLE, ...PEOPLE, ...PEOPLE]} filterable pageSize={5} />
  ),
};
