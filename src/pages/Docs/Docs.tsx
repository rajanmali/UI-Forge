import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Docs.module.scss';
import Badge from '../../components/Badge/Badge';
import Card from '../../components/Card/Card';
import Tabs from '../../components/Tabs/Tabs';
import CodeBlock from '../../components/CodeBlock/CodeBlock';
import { ALL_DOCS, CATEGORIES, type ComponentDocData, type PropRow } from './docsData';

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const CATEGORY_VARIANT: Record<string, 'primary' | 'secondary' | 'success' | 'info' | 'warning'> = {
  Form: 'secondary',
  Display: 'primary',
  Feedback: 'warning',
  Overlay: 'info',
  Navigation: 'success',
};

// ─── Props table ──────────────────────────────────────────────
function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className={styles.table_wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td>
                <code>{r.name}</code>
              </td>
              <td>
                <code className={styles.type}>{r.type}</code>
              </td>
              <td>
                {r.default ? <code>{r.default}</code> : <span className={styles.muted}>—</span>}
              </td>
              <td className={styles.desc_cell}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Single component doc ─────────────────────────────────────
function ComponentDoc({ doc }: { doc: ComponentDocData }) {
  const tabs = [
    {
      id: 'props',
      label: 'Props',
      content: (
        <div className={styles.tab_content}>
          <PropsTable rows={doc.props} />
          {doc.notes && <p className={styles.note}>{doc.notes}</p>}
        </div>
      ),
    },
    {
      id: 'usage',
      label: 'Usage',
      content: (
        <div className={styles.tab_content}>
          <CodeBlock code={doc.usage} />
        </div>
      ),
    },
    {
      id: 'a11y',
      label: 'Accessibility',
      content: <div className={[styles.tab_content, styles.a11y].join(' ')}>{doc.a11y}</div>,
    },
  ];

  return (
    <motion.section
      id={doc.id}
      className={styles.component_section}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      <div className={styles.component_header}>
        <h2 className={styles.component_title}>{doc.label}</h2>
        <div className={styles.component_badges}>
          <Badge variant={CATEGORY_VARIANT[doc.category]} size="sm">
            {doc.category}
          </Badge>
          <Badge variant="success" size="sm">
            Stable
          </Badge>
        </div>
      </div>
      <p className={styles.component_desc}>{doc.description}</p>
      <Card variant="outlined" padding="none">
        <Tabs tabs={tabs} variant="line" />
      </Card>
    </motion.section>
  );
}

// ─── Active section tracker ───────────────────────────────────
// hashId overrides the active section immediately (e.g. from command palette
// navigation). The IntersectionObserver is suppressed for 800ms via a ref so
// the smooth-scroll animation passing through sibling sections cannot win the
// race. No setState is called inside effects — hashId is returned directly,
// satisfying the react-hooks/set-state-in-effect lint rule.
function useActiveSection(ids: string[], hashId?: string) {
  const [active, setActive] = useState(ids[0]);
  const suppressRef = useRef(false);

  // When the hash changes, block observer updates for 800ms (no setState here)
  useEffect(() => {
    if (!hashId) return;
    suppressRef.current = true;
    const t = setTimeout(() => {
      suppressRef.current = false;
    }, 800);
    return () => clearTimeout(t);
  }, [hashId]);

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !suppressRef.current) setActive(id);
        },
        { rootMargin: '-20% 0px -70% 0px' },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [ids]);

  // hashId wins when present — the observer updates `active` in the background
  // and takes over once the user scrolls manually (hash clears or suppress expires).
  return hashId ?? active;
}

// ─── Search ───────────────────────────────────────────────────
function useSearch(query: string) {
  if (!query.trim()) return ALL_DOCS;
  const q = query.toLowerCase();
  return ALL_DOCS.filter(
    (d) =>
      d.label.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.props.some(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      ),
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function Docs() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const searchRef = useRef<HTMLInputElement>(null);
  const { hash } = useLocation();

  // Scroll to the hash section when navigating from the command palette or a direct URL
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  const filtered = useSearch(query).filter(
    (d) => activeCategory === 'All' || d.category === activeCategory,
  );

  const ids = filtered.map((d) => d.id);
  const hashId = hash ? hash.slice(1) : undefined;
  const activeSection = useActiveSection(ids, hashId);

  // ⌘K / Ctrl+K focuses search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <main className={styles.docs}>
      {/* Page header */}
      <motion.div className={styles.header} variants={stagger} initial="hidden" animate="show">
        <motion.div variants={fadeUp}>
          <Badge variant="info" size="sm">
            Documentation
          </Badge>
        </motion.div>
        <motion.h1 className={styles.title} variants={fadeUp}>
          Component Reference
        </motion.h1>
        <motion.p className={styles.sub} variants={fadeUp}>
          Prop tables, usage examples, and accessibility notes for all {ALL_DOCS.length} UIForge
          components.
        </motion.p>

        {/* Search */}
        <motion.div variants={fadeUp} className={styles.search_wrap}>
          <svg
            className={styles.search_icon}
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={searchRef}
            type="search"
            placeholder="Search components, props… (⌘K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.search_input}
            aria-label="Search documentation"
          />
          {query && (
            <button
              className={styles.search_clear}
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </motion.div>

        {/* Category filter */}
        <motion.div
          variants={fadeUp}
          className={styles.filters}
          role="group"
          aria-label="Filter by category"
        >
          {['All', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              className={[
                styles.filter_btn,
                activeCategory === cat ? styles['filter_btn--active'] : '',
              ].join(' ')}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </motion.div>

      <div className={styles.layout}>
        {/* Sidebar */}
        <nav className={styles.sidebar} aria-label="Component navigation">
          <p className={styles.sidebar__heading}>
            {filtered.length} component{filtered.length !== 1 ? 's' : ''}
          </p>
          <ul role="list" className={styles.sidebar__list}>
            {filtered.map((doc) => (
              <li key={doc.id}>
                <a
                  href={`#${doc.id}`}
                  className={[
                    styles.sidebar__link,
                    activeSection === doc.id ? styles['sidebar__link--active'] : '',
                  ].join(' ')}
                >
                  <span>{doc.label}</span>
                  <Badge variant={CATEGORY_VARIANT[doc.category]} size="sm">
                    {doc.category}
                  </Badge>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className={styles.content}>
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <p>
                No components match <strong>"{query}"</strong>.
              </p>
              <button
                className={styles.filter_btn}
                onClick={() => {
                  setQuery('');
                  setActiveCategory('All');
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            filtered.map((doc) => <ComponentDoc key={doc.id} doc={doc} />)
          )}
        </div>
      </div>
    </main>
  );
}
