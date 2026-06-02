import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataTable, { type ColumnDef } from '../DataTable';

interface Item {
  id: number;
  name: string;
  role: string;
}

const DATA: Item[] = [
  { id: 1, name: 'Alice', role: 'Engineer' },
  { id: 2, name: 'Bob', role: 'Designer' },
  { id: 3, name: 'Carol', role: 'Engineer' },
];

const COLUMNS: ColumnDef<Item>[] = [
  { key: 'id', header: 'ID', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role' },
];

describe('DataTable', () => {
  it('renders column headers', () => {
    render(<DataTable columns={COLUMNS} data={DATA} />);
    expect(screen.getByRole('columnheader', { name: /ID/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Name/i })).toBeInTheDocument();
  });

  it('renders all rows', () => {
    render(<DataTable columns={COLUMNS} data={DATA} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Carol')).toBeInTheDocument();
  });

  it('renders empty message when data is empty', () => {
    render(<DataTable columns={COLUMNS} data={[]} emptyMessage="No items." />);
    expect(screen.getByText('No items.')).toBeInTheDocument();
  });

  it('shows filter input when filterable', () => {
    render(<DataTable columns={COLUMNS} data={DATA} filterable filterPlaceholder="Search…" />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('filters rows by text input after debounce', () => {
    vi.useFakeTimers();
    try {
      render(<DataTable columns={COLUMNS} data={DATA} filterable />);
      fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Alice' } });
      act(() => {
        vi.advanceTimersByTime(400);
      });
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('sorts ascending when a sortable header is clicked', async () => {
    render(<DataTable columns={COLUMNS} data={DATA} />);
    await userEvent.click(screen.getByRole('button', { name: /sort by name/i }));
    const cells = screen
      .getAllByRole('cell')
      .filter((c) => ['Alice', 'Bob', 'Carol'].includes(c.textContent ?? ''));
    expect(cells[0]).toHaveTextContent('Alice');
  });

  it('sorts descending on second click', async () => {
    render(<DataTable columns={COLUMNS} data={DATA} />);
    await userEvent.click(screen.getByRole('button', { name: /sort by name/i }));
    await userEvent.click(screen.getByRole('button', { name: /sort by name/i }));
    const cells = screen
      .getAllByRole('cell')
      .filter((c) => ['Alice', 'Bob', 'Carol'].includes(c.textContent ?? ''));
    expect(cells[0]).toHaveTextContent('Carol');
  });

  it('shows pagination when rows exceed pageSize', () => {
    const bigData: Item[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Person ${i + 1}`,
      role: 'Role',
    }));
    render(<DataTable columns={COLUMNS} data={bigData} pageSize={10} />);
    expect(screen.getByRole('button', { name: /next page/i })).toBeInTheDocument();
  });

  it('paginates to next page', async () => {
    const bigData: Item[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Person ${i + 1}`,
      role: 'Role',
    }));
    render(<DataTable columns={COLUMNS} data={bigData} pageSize={10} />);
    expect(screen.queryByText('Person 11')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next page/i }));
    expect(screen.getByText('Person 11')).toBeInTheDocument();
  });

  it('aria-sort is set on sorted column header', async () => {
    render(<DataTable columns={COLUMNS} data={DATA} />);
    const idHeader = screen.getByRole('columnheader', { name: /ID/i });
    expect(idHeader).toHaveAttribute('aria-sort', 'none');
    await userEvent.click(screen.getByRole('button', { name: /sort by id/i }));
    expect(idHeader).toHaveAttribute('aria-sort', 'ascending');
  });
});
