import { motion } from 'framer-motion';
import styles from './Docs.module.scss';

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import Tabs from '../../components/Tabs/Tabs';

interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

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
              <td><code>{r.name}</code></td>
              <td><code className={styles.type}>{r.type}</code></td>
              <td>{r.default ? <code>{r.default}</code> : <span className={styles.muted}>—</span>}</td>
              <td>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const BUTTON_PROPS: PropRow[] = [
  { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", description: 'Visual style of the button.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls padding and font size.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows spinner and disables interaction.' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretches to fill parent width.' },
  { name: 'leftIcon', type: 'ReactNode', default: '—', description: 'Icon rendered before the label.' },
  { name: 'rightIcon', type: 'ReactNode', default: '—', description: 'Icon rendered after the label.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Native disabled attribute.' },
];

const components = [
  { id: 'button',  label: 'Button',  status: 'stable' },
  { id: 'input',   label: 'Input',   status: 'stable' },
  { id: 'card',    label: 'Card',    status: 'stable' },
  { id: 'modal',   label: 'Modal',   status: 'stable' },
  { id: 'badge',   label: 'Badge',   status: 'stable' },
  { id: 'navbar',  label: 'Navbar',  status: 'stable' },
  { id: 'spinner', label: 'Spinner', status: 'stable' },
  { id: 'toast',   label: 'Toast',   status: 'stable' },
  { id: 'avatar',  label: 'Avatar',  status: 'stable' },
  { id: 'tabs',    label: 'Tabs',    status: 'stable' },
];

const docTabs = [
  {
    id: 'props',
    label: 'Props',
    content: (
      <>
        <h3 className={styles.sub_title}>Button Props</h3>
        <PropsTable rows={BUTTON_PROPS} />
        <p className={styles.note}>All native <code>{'<button>'}</code> HTML attributes are also accepted via rest props.</p>
      </>
    ),
  },
  {
    id: 'usage',
    label: 'Usage',
    content: (
      <pre className={styles.code_block}>{`import Button from '@/components/Button';

// Basic usage
<Button variant="primary" size="md">
  Click me
</Button>

// With loading state
<Button loading>Saving…</Button>

// With icon
<Button leftIcon={<SaveIcon />}>Save</Button>`}
      </pre>
    ),
  },
  {
    id: 'a11y',
    label: 'Accessibility',
    content: (
      <div className={styles.a11y}>
        <p>Button renders a native <code>{'<button>'}</code> element and inherits full keyboard and screen-reader support.</p>
        <ul>
          <li><strong>Loading state:</strong> Sets <code>aria-busy="true"</code> and <code>aria-disabled="true"</code>.</li>
          <li><strong>Disabled:</strong> Sets both HTML <code>disabled</code> and <code>aria-disabled</code> attributes.</li>
          <li><strong>Focus:</strong> Uses <code>:focus-visible</code> ring — visible for keyboard, hidden for mouse.</li>
          <li><strong>Icons:</strong> All icon spans have <code>aria-hidden="true"</code> to prevent double-announcing.</li>
        </ul>
      </div>
    ),
  },
];

export default function Docs() {
  return (
    <main className={styles.docs}>
      <motion.div className={styles.header} variants={stagger} initial="hidden" animate="show">
        <motion.div variants={fadeUp}><Badge variant="info" size="sm">Documentation</Badge></motion.div>
        <motion.h1 className={styles.title} variants={fadeUp}>Component Reference</motion.h1>
        <motion.p className={styles.sub} variants={fadeUp}>Full prop tables, usage examples, and accessibility notes for every UIForge component.</motion.p>
      </motion.div>

      <div className={styles.layout}>
        {/* Sidebar */}
        <nav className={styles.sidebar} aria-label="Component navigation">
          <p className={styles.sidebar__heading}>Components</p>
          <ul role="list" className={styles.sidebar__list}>
            {components.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className={styles.sidebar__link}>
                  {c.label}
                  <Badge variant="success" size="sm">{c.status}</Badge>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className={styles.content}>
          <section id="button" className={styles.component_section}>
            <div className={styles.component_header}>
              <h2 className={styles.component_title}>Button</h2>
              <Badge variant="success">Stable</Badge>
            </div>
            <p className={styles.component_desc}>
              A fully accessible, polymorphic button primitive with four visual variants, three sizes, loading state, icon slots, and full TypeScript props.
            </p>
            <Card variant="outlined" padding="none">
              <Tabs tabs={docTabs} variant="line" />
            </Card>
          </section>

          {/* Stub entries for remaining components */}
          {components.slice(1).map((c) => (
            <section key={c.id} id={c.id} className={styles.component_section}>
              <div className={styles.component_header}>
                <h2 className={styles.component_title}>{c.label}</h2>
                <Badge variant="success">Stable</Badge>
              </div>
              <Card variant="filled" padding="md">
                <p className={styles.stub_note}>
                  Full documentation for <strong>{c.label}</strong> — props table, usage examples, and accessibility notes — coming in the next iteration.
                </p>
              </Card>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
