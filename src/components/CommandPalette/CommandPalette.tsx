import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store';
import { closeCommandPalette, toggleTheme, setPalette, type Palette } from '../../store/uiSlice';
import styles from './CommandPalette.module.scss';

// ─── Item definitions ─────────────────────────────────────────────────────────

type ItemKind = 'page' | 'component' | 'action';

interface PaletteItem {
  id: string;
  label: string;
  kind: ItemKind;
  group: string;
  keywords?: string;
  href?: string;
  action?: () => void;
}

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const PAGES: PaletteItem[] = [
  {
    id: 'home',
    label: 'Home',
    kind: 'page',
    group: 'Pages',
    href: '/',
    keywords: 'showcase components',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    kind: 'page',
    group: 'Pages',
    href: '/dashboard',
    keywords: 'data posts users',
  },
  {
    id: 'form-demo',
    label: 'Form Demo',
    kind: 'page',
    group: 'Pages',
    href: '/form-demo',
    keywords: 'form validation steps',
  },
  {
    id: 'docs',
    label: 'Docs',
    kind: 'page',
    group: 'Pages',
    href: '/docs',
    keywords: 'documentation reference',
  },
  {
    id: 'changelog',
    label: 'Changelog',
    kind: 'page',
    group: 'Pages',
    href: '/changelog',
    keywords: 'releases history',
  },
];

const COMPONENT_NAMES = [
  'Accordion',
  'Avatar',
  'Badge',
  'Button',
  'Card',
  'Checkbox',
  'DataTable',
  'DropdownMenu',
  'Input',
  'Modal',
  'Navbar',
  'Popover',
  'Radio',
  'Select',
  'Spinner',
  'Switch',
  'Tabs',
  'Textarea',
  'ThemeSwitcher',
  'Toast',
  'Tooltip',
];

const COMPONENTS: PaletteItem[] = COMPONENT_NAMES.map((name) => ({
  id: `comp-${name.toLowerCase()}`,
  label: name,
  kind: 'component',
  group: 'Components',
  href: `/docs#${name.toLowerCase()}`,
}));

const PALETTES: { label: string; value: Palette }[] = [
  { label: 'Ocean', value: 'ocean' },
  { label: 'Forest', value: 'forest' },
  { label: 'Sunset', value: 'sunset' },
  { label: 'Violet', value: 'violet' },
  { label: 'Rose', value: 'rose' },
];

// ─── Component ────────────────────────────────────────────────────────────────

function kindIcon(kind: ItemKind) {
  if (kind === 'page') return '🗂';
  if (kind === 'component') return '🧩';
  return '⚡';
}

export default function CommandPalette() {
  const isOpen = useAppSelector((s) => s.ui.commandPaletteOpen);
  const theme = useAppSelector((s) => s.ui.theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [activeIdx, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const inputId = useId();

  const close = useCallback(() => {
    dispatch(closeCommandPalette());
    setQuery('');
    setActive(0);
  }, [dispatch]);

  // Build actions each render so they close over current theme
  const ACTIONS: PaletteItem[] = [
    {
      id: 'toggle-theme',
      label: `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`,
      kind: 'action',
      group: 'Actions',
      action: () => {
        dispatch(toggleTheme());
        close();
      },
    },
    ...PALETTES.map((p) => ({
      id: `palette-${p.value}`,
      label: `Set palette: ${p.label}`,
      kind: 'action' as ItemKind,
      group: 'Actions',
      action: () => {
        dispatch(setPalette(p.value));
        close();
      },
    })),
  ];

  const allItems = [...PAGES, ...COMPONENTS, ...ACTIONS];

  const filtered = query.trim()
    ? allItems.filter((item) => {
        const haystack = `${item.label} ${item.keywords ?? ''}`.toLowerCase();
        return query
          .toLowerCase()
          .split(' ')
          .every((word) => haystack.includes(word));
      })
    : allItems;

  // Group results for display
  const grouped = filtered.reduce<{ group: string; items: PaletteItem[] }[]>((acc, item) => {
    const existing = acc.find((g) => g.group === item.group);
    if (existing) existing.items.push(item);
    else acc.push({ group: item.group, items: [item] });
    return acc;
  }, []);

  // Flatten for keyboard index
  const flatItems = grouped.flatMap((g) => g.items);

  // Clamp activeIdx when filtered list shrinks
  const safeIdx = Math.min(activeIdx, Math.max(0, flatItems.length - 1));

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      selectItem(flatItems[safeIdx]);
    } else if (e.key === 'Escape') {
      close();
    }
  }

  function selectItem(item: PaletteItem | undefined) {
    if (!item) return;
    if (item.action) {
      item.action();
    } else if (item.href) {
      navigate(item.href);
      close();
    }
  }

  // Scroll active item into view
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    itemRefs.current[safeIdx]?.scrollIntoView({ block: 'nearest' });
  }, [safeIdx]);

  const palette = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={close}
            aria-hidden="true"
          />
          <motion.div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: EASE }}
            onKeyDown={handleKeyDown}
          >
            {/* Search input */}
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
                ref={inputRef}
                id={inputId}
                type="search"
                role="combobox"
                aria-expanded={flatItems.length > 0}
                aria-controls={listId}
                aria-activedescendant={
                  flatItems[safeIdx] ? `cp-item-${flatItems[safeIdx].id}` : undefined
                }
                aria-autocomplete="list"
                className={styles.search_input}
                placeholder="Search pages, components, actions…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
              />
              <kbd className={styles.esc_hint} aria-label="Press Escape to close">
                esc
              </kbd>
            </div>

            {/* Results */}
            <ul id={listId} role="listbox" aria-label="Results" className={styles.results}>
              {flatItems.length === 0 && (
                <li className={styles.empty}>No results for &ldquo;{query}&rdquo;</li>
              )}
              {grouped.map(({ group, items }) => (
                <li key={group} role="presentation">
                  <p className={styles.group_label} role="presentation">
                    {group}
                  </p>
                  <ul role="presentation">
                    {items.map((item) => {
                      const flatIdx = flatItems.indexOf(item);
                      return (
                        <li
                          key={item.id}
                          id={`cp-item-${item.id}`}
                          role="option"
                          aria-selected={flatIdx === safeIdx}
                          ref={(el) => {
                            itemRefs.current[flatIdx] = el;
                          }}
                          className={[styles.item, flatIdx === safeIdx && styles['item--active']]
                            .filter(Boolean)
                            .join(' ')}
                          onClick={() => selectItem(item)}
                          onMouseEnter={() => setActive(flatIdx)}
                        >
                          <span className={styles.item__icon} aria-hidden="true">
                            {kindIcon(item.kind)}
                          </span>
                          <span className={styles.item__label}>{item.label}</span>
                          {item.kind === 'page' && (
                            <span className={styles.item__hint}>{item.href}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <span>
                <kbd>↑↓</kbd> navigate
              </span>
              <span>
                <kbd>↵</kbd> select
              </span>
              <span>
                <kbd>esc</kbd> close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(palette, document.body);
}
