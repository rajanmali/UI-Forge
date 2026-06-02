import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Home.module.scss';
import { APP_VERSION } from '../../version';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import Input from '../../components/Input/Input';
import Card from '../../components/Card/Card';
import Modal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import Avatar from '../../components/Avatar/Avatar';
import Tabs from '../../components/Tabs/Tabs';
import Textarea from '../../components/Textarea/Textarea';
import Checkbox from '../../components/Checkbox/Checkbox';
import { RadioGroup } from '../../components/Radio/Radio';
import Switch from '../../components/Switch/Switch';
import Select from '../../components/Select/Select';
import Tooltip from '../../components/Tooltip/Tooltip';
import Popover from '../../components/Popover/Popover';
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';
import Accordion from '../../components/Accordion/Accordion';
import { useAppDispatch } from '../../store';
import { addToast } from '../../store/uiSlice';

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      className={styles.section}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      <h2 className={styles.section__title}>{title}</h2>
      <div className={styles.section__body}>{children}</div>
    </motion.section>
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
  const [selectVal, setSelectVal] = useState('');
  const [radioVal, setRadioVal] = useState('react');
  const [checked, setChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);

  const fire = (type: 'success' | 'warning' | 'error' | 'info', msg: string) =>
    dispatch(addToast({ type, message: msg }));

  const tabData = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <p>
          Welcome to UIForge — a production-quality component library built on design tokens, SASS
          7-1 architecture, and React 18.
        </p>
      ),
    },
    {
      id: 'tokens',
      label: 'Design Tokens',
      content: (
        <p>
          All colours, spacing, typography, shadows, and radii are driven by SASS variables defined
          in <code>abstracts/_variables.scss</code>. Zero hardcoded values in component files.
        </p>
      ),
    },
    {
      id: 'a11y',
      label: 'Accessibility',
      content: (
        <p>
          Every component ships with ARIA roles, keyboard navigation, focus rings, and screen-reader
          labels out of the box.
        </p>
      ),
    },
    { id: 'disabled', label: 'Disabled Tab', disabled: true, content: null },
  ];

  const pillTabData = [
    {
      id: 'react',
      label: 'React',
      content: <p>Built with React 18 + TypeScript for type-safe, composable UI primitives.</p>,
    },
    {
      id: 'redux',
      label: 'Redux',
      content: (
        <p>
          RTK Query powers data-fetching on the Dashboard page with automatic caching and loading
          states.
        </p>
      ),
    },
    {
      id: 'sass',
      label: 'SASS',
      content: <p>The 7-1 architecture keeps styles modular, scalable, and maintainable.</p>,
    },
  ];

  return (
    <main className={styles.home}>
      {/* Hero */}
      <motion.div className={styles.hero} variants={stagger} initial="hidden" animate="show">
        <motion.div variants={fadeUp}>
          <Badge variant="secondary" size="sm">
            v{APP_VERSION} — Production Ready
          </Badge>
        </motion.div>
        <motion.h1 className={styles.hero__title} variants={fadeUp}>
          UIForge
        </motion.h1>
        <motion.p className={styles.hero__sub} variants={fadeUp}>
          A branded React component library demonstrating agency-level front-end engineering. Design
          tokens, full accessibility, dark mode, and live interaction.
        </motion.p>
        <motion.div className={styles.hero__actions} variants={fadeUp}>
          <Button size="lg" onClick={() => fire('success', 'Welcome to UIForge!')}>
            Get Started
          </Button>
          <Button size="lg" variant="secondary" onClick={() => setModalOpen(true)}>
            View Source
          </Button>
        </motion.div>
      </motion.div>

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
              leftIcon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              }
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
            <Badge variant="success" dot>
              Online
            </Badge>
            <Badge variant="warning" dot>
              Away
            </Badge>
            <Badge variant="error" dot>
              Busy
            </Badge>
          </Row>
          <Row label="Sizes">
            <Badge size="sm" variant="primary">
              Small
            </Badge>
            <Badge size="md" variant="primary">
              Medium
            </Badge>
            <Badge size="lg" variant="primary">
              Large
            </Badge>
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
            <Input
              label="With helper"
              placeholder="username"
              helperText="Must be at least 3 characters"
            />
            <Input
              label="Error state"
              placeholder="email"
              errorText="Please enter a valid email address"
              defaultValue="bad-email"
            />
            <Input label="Disabled" placeholder="disabled" disabled />
          </Row>
          <Row label="With icons">
            <Input
              label="Search"
              placeholder="Search…"
              leftIcon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              }
            />
          </Row>
        </Section>

        {/* Cards */}
        <Section title="Card">
          <div className={styles.card_grid}>
            <Card variant="elevated" header="Elevated Card" footer="Card Footer">
              <p>
                Default elevated card with a subtle shadow and border. Perfect for content
                containers.
              </p>
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
            <span
              style={{
                background: '#1B3A6B',
                padding: '8px',
                borderRadius: '8px',
                display: 'inline-flex',
              }}
            >
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
            <Button
              variant="primary"
              size="sm"
              onClick={() => fire('success', 'Record saved successfully!')}
            >
              Success
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fire('info', 'Your session expires in 5 minutes.')}
            >
              Info
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => fire('warning', 'Storage is at 90% capacity.')}
            >
              Warning
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => fire('error', 'Failed to connect to server.')}
            >
              Error
            </Button>
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
                <Button variant="ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setModalOpen(false);
                    fire('success', 'Action confirmed!');
                  }}
                >
                  Confirm
                </Button>
              </>
            }
          >
            <p>
              This modal demonstrates focus trapping, ESC-to-close, overlay click dismiss, scroll
              lock, and smooth entrance animation — all from a single composable component.
            </p>
            <br />
            <p>
              Built with <code>createPortal</code> so it always renders at the document root, above
              all other z-index layers.
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

        {/* Select */}
        <Section title="Select">
          <Row label="Basic">
            <Select
              label="Framework"
              placeholder="Choose a framework…"
              value={selectVal}
              onChange={setSelectVal}
              options={[
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'angular', label: 'Angular', disabled: true },
              ]}
              helperText="Pick your primary framework"
            />
          </Row>
          <Row label="Grouped">
            <Select
              label="Component"
              placeholder="Select a component…"
              options={[
                {
                  label: 'Form',
                  options: [
                    { value: 'input', label: 'Input' },
                    { value: 'select', label: 'Select' },
                    { value: 'checkbox', label: 'Checkbox' },
                  ],
                },
                {
                  label: 'Display',
                  options: [
                    { value: 'card', label: 'Card' },
                    { value: 'badge', label: 'Badge' },
                    { value: 'avatar', label: 'Avatar' },
                  ],
                },
              ]}
            />
          </Row>
          <Row label="Error state">
            <Select
              label="Region"
              placeholder="Select region…"
              options={[
                { value: 'eu', label: 'Europe' },
                { value: 'us', label: 'North America' },
              ]}
              errorText="Please select a region to continue"
            />
          </Row>
        </Section>

        {/* Textarea */}
        <Section title="Textarea">
          <Row label="Basic">
            <Textarea label="Description" placeholder="Write something…" rows={4} fullWidth />
          </Row>
          <Row label="States">
            <Textarea
              label="With helper"
              placeholder="Enter bio"
              helperText="Max 280 characters"
              rows={3}
            />
            <Textarea
              label="Error"
              placeholder="Enter address"
              errorText="This field is required"
              rows={3}
            />
            <Textarea label="Disabled" placeholder="Disabled" disabled rows={3} />
          </Row>
        </Section>

        {/* Checkbox */}
        <Section title="Checkbox">
          <Row label="Sizes">
            <Checkbox label="Small" size="sm" />
            <Checkbox label="Medium" size="md" />
            <Checkbox label="Large" size="lg" />
          </Row>
          <Row label="States">
            <Checkbox
              label="Controlled"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <Checkbox label="Indeterminate" indeterminate readOnly />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Checked + disabled" checked disabled readOnly />
          </Row>
          <Row label="With helper">
            <Checkbox
              label="I agree to the Terms of Service"
              helperText="By checking this you accept our terms"
            />
          </Row>
          <Row label="Error">
            <Checkbox
              label="Accept required terms"
              errorText="You must accept the terms to continue"
            />
          </Row>
        </Section>

        {/* Radio */}
        <Section title="Radio">
          <Row label="Vertical">
            <RadioGroup
              name="framework"
              label="Preferred framework"
              value={radioVal}
              onChange={setRadioVal}
              options={[
                { value: 'react', label: 'React', helperText: "Meta's UI library" },
                { value: 'vue', label: 'Vue', helperText: 'The progressive framework' },
                { value: 'svelte', label: 'Svelte', helperText: 'Compiles away' },
                {
                  value: 'angular',
                  label: 'Angular',
                  helperText: 'Enterprise-grade',
                  disabled: true,
                },
              ]}
            />
          </Row>
          <Row label="Horizontal">
            <RadioGroup
              name="size-demo"
              label="T-shirt size"
              orientation="horizontal"
              options={[
                { value: 'xs', label: 'XS' },
                { value: 'sm', label: 'S' },
                { value: 'md', label: 'M' },
                { value: 'lg', label: 'L' },
                { value: 'xl', label: 'XL' },
              ]}
            />
          </Row>
        </Section>

        {/* Tooltip */}
        <Section title="Tooltip">
          <Row label="Placements">
            <Tooltip content="Top tooltip" placement="top">
              <Button variant="secondary" size="sm">
                Top
              </Button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" placement="bottom">
              <Button variant="secondary" size="sm">
                Bottom
              </Button>
            </Tooltip>
            <Tooltip content="Left tooltip" placement="left">
              <Button variant="secondary" size="sm">
                Left
              </Button>
            </Tooltip>
            <Tooltip content="Right tooltip" placement="right">
              <Button variant="secondary" size="sm">
                Right
              </Button>
            </Tooltip>
          </Row>
          <Row label="Rich content">
            <Tooltip
              content={
                <span>
                  Keyboard shortcut: <strong>⌘ + K</strong>
                </span>
              }
              placement="top"
            >
              <Button variant="ghost" size="sm">
                With markup
              </Button>
            </Tooltip>
            <Tooltip content="This tooltip is disabled" disabled>
              <Button variant="ghost" size="sm">
                Disabled tooltip
              </Button>
            </Tooltip>
          </Row>
        </Section>

        {/* Popover */}
        <Section title="Popover">
          <Row label="With title">
            <Popover
              title="What is UIForge?"
              placement="bottom-start"
              trigger={
                <Button variant="secondary" size="sm">
                  Open popover
                </Button>
              }
              content={
                <p>
                  UIForge is a branded React component library demonstrating agency-level front-end
                  engineering with design tokens, full accessibility, and Framer Motion animations.
                </p>
              }
            />
          </Row>
          <Row label="Placements">
            <Popover
              placement="bottom-start"
              trigger={
                <Button variant="ghost" size="sm">
                  Bottom start
                </Button>
              }
              content={<p>Aligned to the start of the trigger element.</p>}
            />
            <Popover
              placement="bottom-end"
              trigger={
                <Button variant="ghost" size="sm">
                  Bottom end
                </Button>
              }
              content={<p>Aligned to the end of the trigger element.</p>}
            />
            <Popover
              placement="top-start"
              trigger={
                <Button variant="ghost" size="sm">
                  Top start
                </Button>
              }
              content={<p>Appears above the trigger, aligned to start.</p>}
            />
          </Row>
          <Row label="Rich content">
            <Popover
              title="Team members"
              placement="bottom-start"
              trigger={
                <Button variant="primary" size="sm">
                  View team
                </Button>
              }
              content={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    ['Rajan Mali', 'Lead Engineer'],
                    ['Sarah Chen', 'Designer'],
                    ['Alex Torres', 'PM'],
                  ].map(([name, role]) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Avatar name={name} size="sm" status="online" />
                      <div>
                        <p
                          style={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                          }}
                        >
                          {name}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              }
            />
          </Row>
        </Section>

        {/* Dropdown Menu */}
        <Section title="Dropdown Menu">
          <Row label="Basic">
            <DropdownMenu
              trigger={
                <Button
                  variant="secondary"
                  size="sm"
                  rightIcon={
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  }
                >
                  Actions
                </Button>
              }
              sections={[
                {
                  items: [
                    {
                      id: 'edit',
                      label: 'Edit',
                      icon: (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      ),
                      onClick: () => {},
                    },
                    {
                      id: 'dup',
                      label: 'Duplicate',
                      icon: (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      ),
                      onClick: () => {},
                    },
                    {
                      id: 'share',
                      label: 'Share',
                      icon: (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                      ),
                      onClick: () => {},
                    },
                  ],
                },
              ]}
            />
          </Row>
          <Row label="Grouped + shortcuts">
            <DropdownMenu
              placement="bottom-end"
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  rightIcon={
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  }
                >
                  File
                </Button>
              }
              sections={[
                {
                  label: 'Document',
                  items: [
                    {
                      id: 'new',
                      label: 'New file',
                      shortcut: '⌘N',
                      icon: (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      ),
                      onClick: () => {},
                    },
                    {
                      id: 'save',
                      label: 'Save',
                      shortcut: '⌘S',
                      icon: (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                          <polyline points="17 21 17 13 7 13 7 21" />
                          <polyline points="7 3 7 8 15 8" />
                        </svg>
                      ),
                      onClick: () => {},
                    },
                    {
                      id: 'print',
                      label: 'Print',
                      shortcut: '⌘P',
                      icon: (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <polyline points="6 9 6 2 18 2 18 9" />
                          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                          <rect x="6" y="14" width="12" height="8" />
                        </svg>
                      ),
                      onClick: () => {},
                    },
                  ],
                },
                {
                  label: 'Danger zone',
                  items: [
                    {
                      id: 'del',
                      label: 'Delete file',
                      danger: true,
                      icon: (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      ),
                      onClick: () => {},
                    },
                  ],
                },
              ]}
            />
          </Row>
          <Row label="With disabled item">
            <DropdownMenu
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  rightIcon={
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  }
                >
                  More options
                </Button>
              }
              sections={[
                {
                  items: [
                    {
                      id: 'a',
                      label: 'Available action',
                      icon: (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ),
                      onClick: () => {},
                    },
                    {
                      id: 'b',
                      label: 'Disabled action',
                      disabled: true,
                      icon: (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                        </svg>
                      ),
                    },
                    { id: 'c', label: 'Another action', onClick: () => {} },
                  ],
                },
              ]}
            />
          </Row>
        </Section>

        {/* Switch */}
        <Section title="Switch">
          <Row label="Sizes">
            <Switch label="Small" size="sm" />
            <Switch label="Medium" size="md" />
            <Switch label="Large" size="lg" />
          </Row>
          <Row label="Controlled">
            <Switch
              label={switchOn ? 'Notifications on' : 'Notifications off'}
              size="md"
              checked={switchOn}
              onChange={(e) => setSwitchOn(e.target.checked)}
            />
          </Row>
          <Row label="Label position">
            <Switch label="Label left" labelPosition="left" size="md" />
            <Switch label="Label right" labelPosition="right" size="md" />
          </Row>
          <Row label="States">
            <Switch label="Disabled off" disabled size="md" />
            <Switch label="Disabled on" disabled checked readOnly size="md" />
          </Row>
        </Section>

        {/* Accordion */}
        <Section title="Accordion">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <p
                style={{
                  marginBottom: '1rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                }}
              >
                Default (single open)
              </p>
              <Accordion>
                <Accordion.Item title="What is UIForge?">
                  A branded React component library showcasing design systems, accessibility, and
                  animation — built as a production-quality portfolio project.
                </Accordion.Item>
                <Accordion.Item title="How does theming work?">
                  Two layers of CSS custom properties: light/dark mode via data-theme and 5 brand
                  palettes via data-palette. Every component reads these vars automatically.
                </Accordion.Item>
                <Accordion.Item title="Is keyboard navigation supported?">
                  Yes — Arrow Up/Down moves focus between triggers, Home/End jump to first/last.
                  Space and Enter toggle the panel.
                </Accordion.Item>
              </Accordion>
            </div>
            <div>
              <p
                style={{
                  marginBottom: '1rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                }}
              >
                Bordered, multi-open
              </p>
              <Accordion variant="bordered" allowMultiple defaultOpen={[0]}>
                <Accordion.Item title="Open by default">
                  This item starts expanded. Multiple items can be open simultaneously with
                  allowMultiple.
                </Accordion.Item>
                <Accordion.Item title="Another section">
                  Each panel animates open and closed with Framer Motion height transitions.
                </Accordion.Item>
                <Accordion.Item title="Disabled item" disabled>
                  This item cannot be toggled.
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
