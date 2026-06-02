import React, { useEffect, useRef, useState, useMemo, useId } from 'react';
import styles from './DataTable.module.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ColumnDef<T extends object> {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  width?: string;
}

export interface DataTableProps<T extends object> {
  columns: ColumnDef<T>[];
  data: T[];
  filterable?: boolean;
  filterPlaceholder?: string;
  pageSize?: number;
  compact?: boolean;
  emptyMessage?: string;
  className?: string;
  'aria-label'?: string;
}

type SortDir = 'asc' | 'desc' | null;

// ─── Component ────────────────────────────────────────────────────────────────

export default function DataTable<T extends object>({
  columns,
  data,
  filterable = false,
  filterPlaceholder = 'Filter…',
  pageSize = 20,
  compact = false,
  emptyMessage = 'No results.',
  className,
  'aria-label': ariaLabel,
}: DataTableProps<T>) {
  const filterId = useId();
  const [filterText, setFilterText] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce filter input by 300ms
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedFilter(filterText);
      setPage(0);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [filterText]);

  function toggleSort(key: string) {
    setPage(0);
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
    } else if (sortDir === 'asc') {
      setSortDir('desc');
    } else {
      setSortKey(null);
      setSortDir(null);
    }
  }

  const processed = useMemo(() => {
    let rows = data;

    if (debouncedFilter) {
      const lower = debouncedFilter.toLowerCase();
      rows = rows.filter((row) =>
        Object.values(row as Record<string, unknown>).some((v) =>
          String(v ?? '')
            .toLowerCase()
            .includes(lower),
        ),
      );
    }

    if (sortKey && sortDir) {
      rows = [...rows].sort((a, b) => {
        const av = (a as Record<string, unknown>)[sortKey];
        const bv = (b as Record<string, unknown>)[sortKey];
        const cmp =
          typeof av === 'number' && typeof bv === 'number'
            ? av - bv
            : String(av ?? '').localeCompare(String(bv ?? ''));
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }

    return rows;
  }, [data, debouncedFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(processed.length / pageSize);
  const safePage = Math.min(page, Math.max(0, totalPages - 1));
  const pageData = processed.slice(safePage * pageSize, (safePage + 1) * pageSize);

  function ariaSortAttr(key: string): React.AriaAttributes['aria-sort'] {
    if (sortKey !== key) return 'none';
    if (sortDir === 'asc') return 'ascending';
    if (sortDir === 'desc') return 'descending';
    return 'none';
  }

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {filterable && (
        <div className={styles.toolbar}>
          <label htmlFor={filterId} className={styles.sr_only}>
            {filterPlaceholder}
          </label>
          <div className={styles.search_wrap}>
            <svg
              className={styles.search_icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id={filterId}
              type="search"
              className={styles.search_input}
              placeholder={filterPlaceholder}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              aria-label={filterPlaceholder}
            />
          </div>
          <span className={styles.count} aria-live="polite" aria-atomic="true">
            {processed.length} record{processed.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      <div className={styles.table_wrap} role="region" aria-label={ariaLabel ?? 'Data table'}>
        <table
          className={[styles.table, compact && styles['table--compact']].filter(Boolean).join(' ')}
          role="grid"
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={col.sortable ? ariaSortAttr(col.key) : undefined}
                  style={col.width ? { width: col.width } : undefined}
                  className={[
                    styles.th,
                    col.sortable && styles['th--sortable'],
                    sortKey === col.key && styles['th--sorted'],
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {col.sortable ? (
                    <button
                      className={styles.sort_btn}
                      onClick={() => toggleSort(col.key)}
                      aria-label={`Sort by ${col.header}`}
                    >
                      {col.header}
                      <SortIndicator dir={sortKey === col.key ? sortDir : null} />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.empty}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageData.map((row, i) => (
                <tr key={i} className={styles.tr} tabIndex={0}>
                  {columns.map((col) => (
                    <td key={col.key} className={styles.td}>
                      {col.render ? col.render(row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <span className={styles.pagination__info}>
            {safePage * pageSize + 1}–{Math.min((safePage + 1) * pageSize, processed.length)} of{' '}
            {processed.length}
          </span>
          <div className={styles.pagination__controls}>
            <button
              className={styles.page_btn}
              disabled={safePage === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              aria-label="Previous page"
            >
              ‹ Prev
            </button>
            <span className={styles.pagination__page}>
              {safePage + 1} / {totalPages}
            </span>
            <button
              className={styles.page_btn}
              disabled={safePage >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              aria-label="Next page"
            >
              Next ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SortIndicator({ dir }: { dir: SortDir }) {
  return (
    <span className={styles.sort_indicator} aria-hidden="true">
      <span
        className={[styles.sort_up, dir === 'asc' && styles['sort_up--active']]
          .filter(Boolean)
          .join(' ')}
      >
        ▲
      </span>
      <span
        className={[styles.sort_down, dir === 'desc' && styles['sort_down--active']]
          .filter(Boolean)
          .join(' ')}
      >
        ▼
      </span>
    </span>
  );
}
