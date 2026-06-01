import { useState } from 'react';
import styles from './Home.module.scss';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import Input from '../../components/Input/Input';
import Card from '../../components/Card/Card';
import Modal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import Avatar from '../../components/Avatar/Avatar';
import Tabs from '../../components/Tabs/Tabs';
import { useAppDispatch } from '../../store';
import { addToast } from '../../store/uiSlice';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>{title}</h2>
      <div className={styles.section__body}>{children}</div>
    </section>
  );
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className={styles.row}>
      {label && <span className={styles.row__label}>{label}</span>}
      <div className={styles.row__items}>{children}</div>
    </div>
  );
}

export default function Home() {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const fire = (type: 'success' | 'warning' | 'error' | 'info', msg: string) =>
    dispatch(addToast({ type, message: msg }));

  const tabData = [
    { id: 'overview', label: 'Overview', content: <p>Welcome to UIForge — a production-quality component library built on design tokens, SASS 7-1 architecture, and React 18.</p> },
    { id: 'tokens', label: 'Design Tokens', content: <p>All colours, spacing, typography, shadows, and radii are driven by SASS variables defined in <code>abstracts/_variables.scss</code>. Zero hardcoded values in component files.</p> },
    { id: 'a11y', label: 'Accessibility', content: <p>Every component ships with ARIA roles, keyboard navigation, focus rings, and screen-reader labels out of the box.</p> },
    { id: 'disabled', label: 'Disabled Tab', disabled: true, content: null },
  ];

  const pillTabData = [
    { id: 'react', label: 'React', content: <p>Built with React 18 + TypeScript for type-safe, composable UI primitives.</p> },
    { id: 'redux', label: 'Redux', content: <p>RTK Query powers data-fetching on the Dashboard page with automatic caching and loading states.</p> },
    { id: 'sass', label: 'SASS', content: <p>The 7-1 architecture keeps styles modular, scalable, and maintainable.</p> },
  ];

  return (
    <main className={styles.home}>
      {/* Hero */}
      <div className={styles.hero}>
        <Badge variant="secondary" size="sm">v1.0.0 — Production Ready</Badge>
        <h1 className={styles.hero__title}>UIForge</h1>
        <p className={styles.hero__sub}>
          A branded React component library demonstrating agency-level front-end engineering. Design tokens, full accessibility, dark mode, and live interaction.
        </p>
        <div className={styles.hero__actions}>
          <Button size="lg" onClick={() => fire('success', 'Welcome to UIForge!')}>Get Started</Button>
          <Button size="lg" variant="secondary" onClick={() => setModalOpen(true)}>View Source</Button>
        </div>
      </div>

      <div className={styles.showcase}>
        {/* Buttons */}
        <Section title="Button">
          <Row label="Variants">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </Row>
          <Row label="Sizes">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Row>
          <Row label="States">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button
              leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>}
            >
              With Icon
            </Button>
          </Row>
        </Section>

        {/* Badges */}
        <Section title="Badge">
          <Row label="Variants">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Accent</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </Row>
          <Row label="With dot">
            <Badge variant="success" dot>Online</Badge>
            <Badge variant="warning" dot>Away</Badge>
            <Badge variant="error" dot>Busy</Badge>
          </Row>
          <Row label="Sizes">
            <Badge size="sm" variant="primary">Small</Badge>
            <Badge size="md" variant="primary">Medium</Badge>
            <Badge size="lg" variant="primary">Large</Badge>
          </Row>
        </Section>

        {/* Inputs */}
        <Section title="Input">
          <Row label="Basic">
            <Input
              label="Name"
              placeholder="Enter your name"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
          </Row>
          <Row label="States">
            <Input label="With helper" placeholder="username" helperText="Must be at least 3 characters" />
            <Input label="Error state" placeholder="email" errorText="Please enter a valid email address" defaultValue="bad-email" />
            <Input label="Disabled" placeholder="disabled" disabled />
          </Row>
          <Row label="With icons">
            <Input
              label="Search"
              placeholder="Search…"
              leftIcon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              }
            />
          </Row>
        </Section>

        {/* Cards */}
        <Section title="Card">
          <div className={styles.card_grid}>
            <Card variant="elevated" header="Elevated Card" footer="Card Footer">
              <p>Default elevated card with a subtle shadow and border. Perfect for content containers.</p>
            </Card>
            <Card variant="outlined" header="Outlined Card">
              <p>Outlined variant uses a stronger border without a background fill.</p>
            </Card>
            <Card variant="filled" hoverable>
              <p>Filled + hoverable — lift effect on hover. Click-ready for navigation patterns.</p>
            </Card>
          </div>
        </Section>

        {/* Spinners */}
        <Section title="Spinner">
          <Row label="Sizes">
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </Row>
          <Row label="Colours">
            <Spinner color="primary" />
            <span style={{ background: '#1B3A6B', padding: '8px', borderRadius: '8px', display: 'inline-flex' }}>
              <Spinner color="white" />
            </span>
          </Row>
        </Section>

        {/* Avatars */}
        <Section title="Avatar">
          <Row label="Initials">
            <Avatar name="Rajan Mali" size="xs" />
            <Avatar name="Sarah Connor" size="sm" />
            <Avatar name="John Doe" size="md" />
            <Avatar name="Emily Clark" size="lg" />
            <Avatar name="Alex Wright" size="xl" />
          </Row>
          <Row label="With status">
            <Avatar name="Rajan Mali" size="md" status="online" />
            <Avatar name="Sarah Connor" size="md" status="away" />
            <Avatar name="John Doe" size="md" status="busy" />
            <Avatar name="Emily Clark" size="md" status="offline" />
          </Row>
          <Row label="Image">
            <Avatar src="https://i.pravatar.cc/150?img=1" name="Alice" size="md" />
            <Avatar src="https://i.pravatar.cc/150?img=2" name="Bob" size="md" status="online" />
            <Avatar src="https://i.pravatar.cc/150?img=3" name="Carol" size="lg" status="away" />
          </Row>
        </Section>

        {/* Toasts */}
        <Section title="Toast">
          <Row label="Fire a toast">
            <Button variant="primary" size="sm" onClick={() => fire('success', 'Record saved successfully!')}>Success</Button>
            <Button variant="ghost" size="sm" onClick={() => fire('info', 'Your session expires in 5 minutes.')}>Info</Button>
            <Button variant="secondary" size="sm" onClick={() => fire('warning', 'Storage is at 90% capacity.')}>Warning</Button>
            <Button variant="danger" size="sm" onClick={() => fire('error', 'Failed to connect to server.')}>Error</Button>
          </Row>
        </Section>

        {/* Modal */}
        <Section title="Modal">
          <Row>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          </Row>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="UIForge Component Library"
            footer={
              <>
                <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button onClick={() => { setModalOpen(false); fire('success', 'Action confirmed!'); }}>Confirm</Button>
              </>
            }
          >
            <p>
              This modal demonstrates focus trapping, ESC-to-close, overlay click dismiss, scroll lock, and smooth entrance animation — all from a single composable component.
            </p>
            <br />
            <p>
              Built with <code>createPortal</code> so it always renders at the document root, above all other z-index layers.
            </p>
          </Modal>
        </Section>

        {/* Tabs */}
        <Section title="Tabs">
          <p className={styles.variant_label}>Line variant (keyboard navigable)</p>
          <Tabs tabs={tabData} variant="line" />
          <br />
          <p className={styles.variant_label}>Pill variant</p>
          <Tabs tabs={pillTabData} variant="pill" />
        </Section>
      </div>
    </main>
  );
}
