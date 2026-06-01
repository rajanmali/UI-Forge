import type { ReactNode } from 'react';

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentDocData {
  id: string;
  label: string;
  category: 'Form' | 'Display' | 'Layout' | 'Feedback' | 'Overlay' | 'Navigation';
  description: string;
  props: PropRow[];
  usage: string;
  a11y: ReactNode;
  notes?: string;
}

// ─── Button ───────────────────────────────────────────────────
const buttonDoc: ComponentDocData = {
  id: 'button', label: 'Button', category: 'Display',
  description: 'A fully accessible button primitive with four visual variants, three sizes, a loading state with spinner, icon slots, and full TypeScript props. Wrapped in Framer Motion for spring-based hover/tap micro-interactions.',
  props: [
    { name: 'variant',   type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", description: 'Visual style of the button.' },
    { name: 'size',      type: "'sm' | 'md' | 'lg'",                           default: "'md'",      description: 'Controls padding and font size.' },
    { name: 'loading',   type: 'boolean',                                       default: 'false',     description: 'Renders a Spinner and sets aria-busy / aria-disabled.' },
    { name: 'fullWidth', type: 'boolean',                                       default: 'false',     description: 'Stretches button to fill container width.' },
    { name: 'leftIcon',  type: 'ReactNode',                                     description: 'Node rendered to the left of the label. Hidden from screen readers.' },
    { name: 'rightIcon', type: 'ReactNode',                                     description: 'Node rendered to the right of the label. Hidden from screen readers.' },
    { name: 'disabled',  type: 'boolean',                                       default: 'false',     description: 'Native disabled + aria-disabled.' },
  ],
  usage: `import Button from '@/components/Button';

<Button variant="primary" size="md">Save changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Learn more</Button>
<Button variant="danger">Delete</Button>

// Loading state
<Button loading>Saving…</Button>

// Icon slots
<Button leftIcon={<DownloadIcon />}>Export</Button>
<Button rightIcon={<ArrowIcon />}>Continue</Button>

// Full width
<Button fullWidth>Submit form</Button>`,
  a11y: (
    <ul>
      <li>Renders a native <code>{'<button>'}</code> — full keyboard and screen-reader support by default.</li>
      <li><strong>Loading:</strong> Sets <code>aria-busy="true"</code> and <code>aria-disabled="true"</code>; spinner has <code>role="status"</code>.</li>
      <li><strong>Disabled:</strong> Sets both HTML <code>disabled</code> and <code>aria-disabled</code>.</li>
      <li><strong>Focus ring:</strong> <code>:focus-visible</code> only — visible for keyboard users, hidden for mouse.</li>
      <li><strong>Icons:</strong> Wrapped in <code>aria-hidden="true"</code> spans to prevent double-announcing.</li>
    </ul>
  ),
};

// ─── Input ────────────────────────────────────────────────────
const inputDoc: ComponentDocData = {
  id: 'input', label: 'Input', category: 'Form',
  description: 'A text input field with label, helper/error text, left and right icon slots, three sizes, and all standard HTML input states. The right icon slot is pointer-events enabled so interactive controls (e.g. show/hide password toggles) work correctly.',
  props: [
    { name: 'label',      type: 'string',              description: 'Visible label, linked via htmlFor.' },
    { name: 'helperText', type: 'string',              description: 'Hint text shown below the field when there is no error.' },
    { name: 'errorText',  type: 'string',              description: 'Error message. Sets aria-invalid and role="alert" on the message.' },
    { name: 'size',       type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls height and font size.' },
    { name: 'leftIcon',   type: 'ReactNode',           description: 'Decorative icon inside the left edge (pointer-events: none).' },
    { name: 'rightIcon',  type: 'ReactNode',           description: 'Node inside the right edge — pointer-events enabled, suitable for buttons.' },
    { name: 'fullWidth',  type: 'boolean',             default: 'false', description: 'Stretches the field to 100% of its container.' },
    { name: 'disabled',   type: 'boolean',             default: 'false', description: 'Dims and locks the field.' },
  ],
  usage: `import Input from '@/components/Input';

// Basic
<Input label="Email" type="email" placeholder="you@example.com" />

// With validation
<Input
  label="Username"
  helperText="3–20 characters"
  errorText={errors.username?.message}
  {...register('username')}
/>

// With icon slots
<Input label="Search" leftIcon={<SearchIcon />} placeholder="Search…" />

// Interactive right icon (show/hide password)
<Input
  type={show ? 'text' : 'password'}
  rightIcon={
    <button type="button" onClick={() => setShow(v => !v)}>
      {show ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  }
/>`,
  a11y: (
    <ul>
      <li>Label is linked to input via <code>htmlFor</code> / <code>id</code> (auto-generated if not provided).</li>
      <li>Error message has <code>role="alert"</code> and is linked via <code>aria-describedby</code>.</li>
      <li>Helper text is also linked via <code>aria-describedby</code> when no error is present.</li>
      <li><code>aria-invalid="true"</code> set on the input when <code>errorText</code> is provided.</li>
      <li>Left icon has <code>pointer-events: none</code>; right icon slot has <code>pointer-events: auto</code> for interactive controls.</li>
    </ul>
  ),
};

// ─── Textarea ─────────────────────────────────────────────────
const textareaDoc: ComponentDocData = {
  id: 'textarea', label: 'Textarea', category: 'Form',
  description: 'A multi-line text input with label, helper/error text, configurable resize behaviour, and all standard textarea states. Extends all native textarea HTML attributes.',
  props: [
    { name: 'label',      type: 'string',                                        description: 'Visible label, linked via htmlFor.' },
    { name: 'helperText', type: 'string',                                        description: 'Hint text shown below when there is no error.' },
    { name: 'errorText',  type: 'string',                                        description: 'Error message — sets aria-invalid and role="alert".' },
    { name: 'resize',     type: "'none' | 'vertical' | 'horizontal' | 'both'",  default: "'vertical'", description: 'CSS resize behaviour.' },
    { name: 'fullWidth',  type: 'boolean',                                       default: 'false',      description: 'Stretches to 100% width.' },
    { name: 'disabled',   type: 'boolean',                                       default: 'false',      description: 'Dims and locks the field.' },
    { name: 'rows',       type: 'number',                                        default: '—',          description: 'Native rows attribute — controls default height.' },
  ],
  usage: `import Textarea from '@/components/Textarea';

<Textarea label="Bio" placeholder="Tell us about yourself…" rows={4} />

// Live character count pattern
const bio = watch('bio') ?? '';
<Textarea
  label="Bio"
  helperText={\`\${bio.length}/280 characters\`}
  errorText={errors.bio?.message}
  {...register('bio')}
/>

// No resize
<Textarea label="Notes" resize="none" />`,
  a11y: (
    <ul>
      <li>Label linked via <code>htmlFor</code>; id auto-generated if not supplied.</li>
      <li>Error text has <code>role="alert"</code> and is wired via <code>aria-describedby</code>.</li>
      <li><code>aria-invalid="true"</code> applied when <code>errorText</code> is present.</li>
    </ul>
  ),
};

// ─── Select ───────────────────────────────────────────────────
const selectDoc: ComponentDocData = {
  id: 'select', label: 'Select', category: 'Form',
  description: 'A fully custom, accessible combobox (select replacement) built without any native <select>. Supports flat option lists and grouped options, keyboard navigation, disabled options, error/helper text, and three sizes.',
  props: [
    { name: 'options',     type: 'SelectItem[]',          description: 'Flat array of SelectOption or SelectGroup objects.' },
    { name: 'value',       type: 'string',                description: 'Controlled selected value.' },
    { name: 'onChange',    type: '(value: string) => void', description: 'Callback fired when selection changes.' },
    { name: 'placeholder', type: 'string',                default: "'Select an option'", description: 'Shown when no value is selected.' },
    { name: 'label',       type: 'string',                description: 'Visible label above the trigger.' },
    { name: 'helperText',  type: 'string',                description: 'Hint text below the field.' },
    { name: 'errorText',   type: 'string',                description: 'Error message — sets aria-invalid.' },
    { name: 'size',        type: "'sm' | 'md' | 'lg'",   default: "'md'", description: 'Controls trigger height and font size.' },
    { name: 'disabled',    type: 'boolean',               default: 'false', description: 'Disables the trigger.' },
    { name: 'fullWidth',   type: 'boolean',               default: 'false', description: 'Stretches to container width.' },
  ],
  usage: `import Select from '@/components/Select';

// Flat options
<Select
  label="Framework"
  value={val}
  onChange={setVal}
  options={[
    { value: 'react',   label: 'React' },
    { value: 'vue',     label: 'Vue' },
    { value: 'svelte',  label: 'Svelte' },
    { value: 'angular', label: 'Angular', disabled: true },
  ]}
/>

// Grouped options
<Select
  label="Component"
  options={[
    {
      label: 'Form',
      options: [
        { value: 'input',    label: 'Input' },
        { value: 'checkbox', label: 'Checkbox' },
      ],
    },
    {
      label: 'Display',
      options: [{ value: 'card', label: 'Card' }],
    },
  ]}
/>

// Inside React Hook Form
<Controller
  name="role"
  control={control}
  render={({ field }) => (
    <Select options={ROLES} value={field.value} onChange={field.onChange} />
  )}
/>`,
  a11y: (
    <ul>
      <li>Trigger has <code>role="combobox"</code>, <code>aria-haspopup="listbox"</code>, <code>aria-expanded</code>, and <code>aria-controls</code>.</li>
      <li>Listbox has <code>role="listbox"</code>; each option has <code>role="option"</code> and <code>aria-selected</code>.</li>
      <li>Keyboard: <kbd>↑</kbd>/<kbd>↓</kbd> navigate, <kbd>Enter</kbd>/<kbd>Space</kbd> confirm, <kbd>Escape</kbd> closes, <kbd>Home</kbd>/<kbd>End</kbd> jump to first/last.</li>
      <li>Disabled options have <code>aria-disabled="true"</code> and are skipped in keyboard navigation.</li>
    </ul>
  ),
};

// ─── Checkbox ─────────────────────────────────────────────────
const checkboxDoc: ComponentDocData = {
  id: 'checkbox', label: 'Checkbox', category: 'Form',
  description: 'A styled checkbox built on a visually-hidden native input. Supports indeterminate state, three sizes, error and helper text, and both controlled and uncontrolled modes.',
  props: [
    { name: 'label',         type: 'string',              description: 'Visible label text next to the checkbox.' },
    { name: 'helperText',    type: 'string',              description: 'Hint text beneath the label.' },
    { name: 'errorText',     type: 'string',              description: 'Error message — sets aria-invalid.' },
    { name: 'indeterminate', type: 'boolean',             default: 'false', description: 'Renders a dash instead of a tick — useful for "select all" patterns.' },
    { name: 'size',          type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Box size and label font size.' },
    { name: 'disabled',      type: 'boolean',             default: 'false', description: 'Disables and dims the checkbox.' },
  ],
  usage: `import Checkbox from '@/components/Checkbox';

// Uncontrolled
<Checkbox label="Accept terms" />

// Controlled
<Checkbox
  label="Subscribe to newsletter"
  checked={subscribed}
  onChange={e => setSubscribed(e.target.checked)}
/>

// Indeterminate (select-all pattern)
<Checkbox
  label="Select all"
  indeterminate={someSelected && !allSelected}
  checked={allSelected}
  onChange={handleSelectAll}
/>

// With validation
<Checkbox
  label="I agree to the Terms of Service"
  errorText={errors.terms?.message}
  {...register('terms')}
/>`,
  a11y: (
    <ul>
      <li>Visually hidden native <code>{'<input type="checkbox">'}</code> maintains full keyboard and screen-reader support.</li>
      <li>The visual box is <code>aria-hidden="true"</code> — all state is communicated via the native input.</li>
      <li>Indeterminate state is set via <code>el.indeterminate = true</code> on the DOM node (not an attribute).</li>
      <li>Focus ring appears on the visual box when navigating by keyboard via <code>:focus-visible</code>.</li>
    </ul>
  ),
};

// ─── Radio ────────────────────────────────────────────────────
const radioDoc: ComponentDocData = {
  id: 'radio', label: 'Radio / RadioGroup', category: 'Form',
  description: 'A single Radio button and a RadioGroup component for building mutually exclusive option sets. Supports vertical and horizontal layout, per-option helper text, disabled options, and error messages.',
  props: [
    { name: 'name',        type: 'string',                     description: '(RadioGroup) Shared name attribute for the radio inputs.' },
    { name: 'options',     type: 'RadioOption[]',              description: '(RadioGroup) Array of { value, label, helperText?, disabled? }.' },
    { name: 'value',       type: 'string',                     description: '(RadioGroup) Controlled selected value.' },
    { name: 'onChange',    type: '(value: string) => void',    description: '(RadioGroup) Callback when selection changes.' },
    { name: 'label',       type: 'string',                     description: '(RadioGroup) Fieldset legend text.' },
    { name: 'errorText',   type: 'string',                     description: '(RadioGroup) Error message below the group.' },
    { name: 'orientation', type: "'vertical' | 'horizontal'",  default: "'vertical'", description: '(RadioGroup) Layout direction.' },
    { name: 'size',        type: "'sm' | 'md' | 'lg'",        default: "'md'", description: 'Dot and label size.' },
  ],
  usage: `import { RadioGroup } from '@/components/Radio';

<RadioGroup
  name="theme"
  label="Interface theme"
  value={theme}
  onChange={setTheme}
  orientation="horizontal"
  options={[
    { value: 'light',  label: 'Light',  helperText: 'Always light mode' },
    { value: 'dark',   label: 'Dark',   helperText: 'Always dark mode' },
    { value: 'system', label: 'System', helperText: 'Follow OS preference' },
  ]}
/>

// Inside React Hook Form
<Controller
  name="theme"
  control={control}
  render={({ field }) => (
    <RadioGroup
      name="theme"
      options={THEME_OPTIONS}
      value={field.value}
      onChange={field.onChange}
    />
  )}
/>`,
  a11y: (
    <ul>
      <li>RadioGroup renders a <code>{'<fieldset>'}</code> with a <code>{'<legend>'}</code> — correctly groups related radio inputs for screen readers.</li>
      <li>Each option is a visually hidden native <code>{'<input type="radio">'}</code> — keyboard and AT support is native.</li>
      <li>Error message linked via <code>aria-describedby</code> on the fieldset.</li>
      <li>Disabled options have both HTML <code>disabled</code> and are visually dimmed.</li>
    </ul>
  ),
};

// ─── Switch ───────────────────────────────────────────────────
const switchDoc: ComponentDocData = {
  id: 'switch', label: 'Switch', category: 'Form',
  description: 'An animated toggle switch built on a visually-hidden checkbox input. Supports three sizes, left or right label positioning, helper text, and both controlled and uncontrolled modes.',
  props: [
    { name: 'label',         type: 'string',              description: 'Visible label next to the track.' },
    { name: 'helperText',    type: 'string',              description: 'Helper text beneath the switch.' },
    { name: 'size',          type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Track and thumb dimensions.' },
    { name: 'labelPosition', type: "'left' | 'right'",   default: "'right'", description: 'Whether the label appears before or after the track.' },
    { name: 'disabled',      type: 'boolean',             default: 'false', description: 'Disables and dims the switch.' },
    { name: 'checked',       type: 'boolean',             description: 'Controlled checked state.' },
    { name: 'onChange',      type: 'ChangeEventHandler',  description: 'Fires when the switch is toggled.' },
  ],
  usage: `import Switch from '@/components/Switch';

// Uncontrolled
<Switch label="Dark mode" size="md" />

// Controlled
<Switch
  label={isOn ? 'Notifications on' : 'Notifications off'}
  checked={isOn}
  onChange={e => setIsOn(e.target.checked)}
/>

// Label on the left
<Switch label="Autosave" labelPosition="left" />

// Inside React Hook Form
<Controller
  name="notifications"
  control={control}
  render={({ field }) => (
    <Switch
      label="Email notifications"
      checked={field.value}
      onChange={field.onChange}
    />
  )}
/>`,
  a11y: (
    <ul>
      <li>Renders <code>{'<input type="checkbox" role="switch">'}</code> — the <code>role="switch"</code> conveys on/off semantics to screen readers instead of checked/unchecked.</li>
      <li>Visual track and thumb are <code>aria-hidden</code>; all state lives in the native input.</li>
      <li>Focus ring appears on the track via <code>:focus-visible</code> scoped to the input sibling selector.</li>
    </ul>
  ),
};

// ─── Badge ────────────────────────────────────────────────────
const badgeDoc: ComponentDocData = {
  id: 'badge', label: 'Badge', category: 'Display',
  description: 'A small inline label for status, categories, or counts. Seven semantic colour variants, an optional status dot, and three sizes.',
  props: [
    { name: 'variant', type: "'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'", default: "'primary'", description: 'Colour scheme of the badge.' },
    { name: 'size',    type: "'sm' | 'md' | 'lg'",  default: "'md'", description: 'Padding and font size.' },
    { name: 'dot',     type: 'boolean',             default: 'false', description: 'Renders a small coloured circle before the label — useful for status indicators.' },
  ],
  usage: `import Badge from '@/components/Badge';

<Badge variant="success">Published</Badge>
<Badge variant="warning">Draft</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="info">Beta</Badge>
<Badge variant="neutral">Archived</Badge>

// With status dot
<Badge variant="success" dot>Online</Badge>
<Badge variant="error"   dot>Incident</Badge>

// Sizes
<Badge size="sm" variant="primary">Small</Badge>
<Badge size="lg" variant="primary">Large</Badge>`,
  a11y: (
    <ul>
      <li>Renders a <code>{'<span>'}</code> — purely visual, no interactive role.</li>
      <li>Status dot has <code>aria-hidden="true"</code>; semantic meaning should be conveyed in the label text itself.</li>
      <li>If used alongside an icon-only trigger, pair with an <code>aria-label</code> on the parent.</li>
    </ul>
  ),
};

// ─── Avatar ───────────────────────────────────────────────────
const avatarDoc: ComponentDocData = {
  id: 'avatar', label: 'Avatar', category: 'Display',
  description: 'A circular user representation. Renders an image if src is provided, otherwise falls back to generated initials with a deterministic colour derived from the name. Supports a status indicator dot in four states.',
  props: [
    { name: 'src',    type: 'string',                                    description: 'Image URL. Falls back to initials if omitted or image fails.' },
    { name: 'alt',    type: 'string',                                    description: 'Alt text for the image, or aria-label when showing initials.' },
    { name: 'name',   type: 'string',                                    description: 'Full name — used to generate initials and a background colour.' },
    { name: 'size',   type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",        default: "'md'", description: 'Diameter of the avatar.' },
    { name: 'status', type: "'online' | 'away' | 'busy' | 'offline'",   description: 'Shows a coloured status dot in the bottom-right corner.' },
  ],
  usage: `import Avatar from '@/components/Avatar';

// Initials (auto colour from name hash)
<Avatar name="Rajan Mali" size="md" />

// With image
<Avatar src="/avatars/jane.jpg" name="Jane Smith" size="lg" />

// With status
<Avatar name="Alex Torres" size="md" status="online" />
<Avatar name="Sam Lee"    size="md" status="busy" />

// All sizes
<Avatar name="UIForge" size="xs" />
<Avatar name="UIForge" size="sm" />
<Avatar name="UIForge" size="md" />
<Avatar name="UIForge" size="lg" />
<Avatar name="UIForge" size="xl" />`,
  a11y: (
    <ul>
      <li>Root element has <code>role="img"</code> and <code>aria-label</code> set to <code>alt ?? name ?? 'Avatar'</code>.</li>
      <li>The initials span is <code>aria-hidden="true"</code> — label is communicated via the wrapper.</li>
      <li>Status dot has an <code>aria-label</code> of <code>"Status: {'<state>'}"</code> for screen readers.</li>
    </ul>
  ),
};

// ─── Card ─────────────────────────────────────────────────────
const cardDoc: ComponentDocData = {
  id: 'card', label: 'Card', category: 'Display',
  description: 'A versatile surface container with three visual variants, optional header and footer slots, and support for hoverable and clickable interactive states. Clickable cards include full keyboard support and Framer Motion lift animation.',
  props: [
    { name: 'variant',   type: "'elevated' | 'outlined' | 'filled'", default: "'elevated'", description: 'Visual style — shadow, border-only, or filled background.' },
    { name: 'padding',   type: "'none' | 'sm' | 'md' | 'lg'",       default: "'md'",       description: 'Inner padding of the card body.' },
    { name: 'hoverable', type: 'boolean',                            default: 'false',      description: 'Enables a Framer Motion lift effect on hover.' },
    { name: 'clickable', type: 'boolean',                            default: 'false',      description: 'Adds role="button", keyboard handler, and tap animation.' },
    { name: 'header',    type: 'ReactNode',                          description: 'Content rendered in the card header (bordered bottom).' },
    { name: 'footer',    type: 'ReactNode',                          description: 'Content rendered in the card footer (bordered top).' },
    { name: 'onClick',   type: 'MouseEventHandler',                  description: 'Click handler — also enables the clickable interactive state.' },
  ],
  usage: `import Card from '@/components/Card';

// Basic
<Card variant="elevated">
  <p>Card content here.</p>
</Card>

// With header + footer
<Card
  variant="elevated"
  header="Card Title"
  footer={<Button size="sm">Action</Button>}
>
  Body content
</Card>

// Hoverable + clickable
<Card hoverable clickable onClick={() => navigate('/detail')}>
  Click me — I lift on hover
</Card>

// Outlined, no padding
<Card variant="outlined" padding="none">
  <CustomContent />
</Card>`,
  a11y: (
    <ul>
      <li>When <code>clickable</code> or <code>onClick</code> is provided, renders <code>role="button"</code> and <code>tabIndex={0}</code>.</li>
      <li>Keyboard handler fires <code>onClick</code> on <kbd>Enter</kbd> and <kbd>Space</kbd>.</li>
      <li>Focus ring applied via <code>:focus-visible</code> on clickable cards.</li>
      <li>Non-interactive cards are plain <code>{'<div>'}</code>s with no role — don't add onClick without also setting clickable.</li>
    </ul>
  ),
};

// ─── Modal ────────────────────────────────────────────────────
const modalDoc: ComponentDocData = {
  id: 'modal', label: 'Modal', category: 'Overlay',
  description: 'A portal-rendered dialog with focus trapping, ESC-to-close, overlay-click dismiss, body scroll lock, and a slide-up entrance animation. Returns focus to the previously focused element on close.',
  props: [
    { name: 'open',           type: 'boolean',   description: 'Controls visibility of the modal.' },
    { name: 'onClose',        type: '() => void', description: 'Called when user dismisses (ESC, overlay click, or close button).' },
    { name: 'title',          type: 'string',    description: 'Heading shown in the header bar; also used as aria-label.' },
    { name: 'size',           type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: 'Max-width of the panel.' },
    { name: 'closeOnOverlay', type: 'boolean',   default: 'true',  description: 'Whether clicking the backdrop closes the modal.' },
    { name: 'showCloseButton',type: 'boolean',   default: 'true',  description: 'Shows an X button in the header.' },
    { name: 'footer',         type: 'ReactNode', description: 'Content rendered in the bottom action bar.' },
  ],
  usage: `import Modal from '@/components/Modal';
import Button from '@/components/Button';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm action"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>`,
  a11y: (
    <ul>
      <li>Panel has <code>role="dialog"</code>, <code>aria-modal="true"</code>, and <code>aria-label</code> from the title prop.</li>
      <li>Focus is moved to the panel on open (<code>tabIndex={-1}</code> + <code>focus()</code>); restored to the triggering element on close.</li>
      <li><code>document.body.overflow = 'hidden'</code> prevents background scroll while open.</li>
      <li><kbd>Escape</kbd> calls <code>onClose</code> via a document-level keydown listener.</li>
      <li>Close button has explicit <code>aria-label="Close modal"</code>.</li>
    </ul>
  ),
};

// ─── Spinner ──────────────────────────────────────────────────
const spinnerDoc: ComponentDocData = {
  id: 'spinner', label: 'Spinner', category: 'Feedback',
  description: 'An SVG arc spinner for loading and async states. Four sizes, three colour modes, and a visually-hidden accessible label.',
  props: [
    { name: 'size',  type: "'xs' | 'sm' | 'md' | 'lg'",    default: "'md'",      description: 'Diameter of the spinner.' },
    { name: 'label', type: 'string',                        default: "'Loading…'", description: 'Visually hidden text for screen readers.' },
    { name: 'color', type: "'current' | 'primary' | 'white'", default: "'current'", description: 'current inherits from the surrounding text colour.' },
  ],
  usage: `import Spinner from '@/components/Spinner';

// Default (inherits colour)
<Spinner />

// Sizes
<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="lg" />

// Colour modes
<Spinner color="primary" />
<Spinner color="white" />   // on dark backgrounds

// Inside a Button (handled automatically by loading prop)
<Button loading>Saving…</Button>`,
  a11y: (
    <ul>
      <li>Root span has <code>role="status"</code> and <code>aria-label</code> from the <code>label</code> prop.</li>
      <li>SVG is <code>aria-hidden="true"</code>; the accessible name lives on the wrapper.</li>
      <li>Label text is visually hidden via the <code>visually-hidden</code> mixin — invisible but announced by screen readers.</li>
    </ul>
  ),
};

// ─── Toast ────────────────────────────────────────────────────
const toastDoc: ComponentDocData = {
  id: 'toast', label: 'Toast', category: 'Feedback',
  description: 'A Redux-driven notification queue rendered in a fixed bottom-right container. Toasts auto-dismiss after a configurable duration and can be manually dismissed. Four semantic types with matching icons.',
  props: [
    { name: 'type',     type: "'success' | 'warning' | 'error' | 'info'", description: 'Colour scheme and icon for the notification.' },
    { name: 'message',  type: 'string',  description: 'The notification text content.' },
    { name: 'duration', type: 'number',  default: '4000', description: 'Auto-dismiss delay in milliseconds.' },
    { name: 'id',       type: 'string',  description: 'Auto-generated — used to remove individual toasts from the queue.' },
  ],
  usage: `// Add the ToastContainer once at the app root
import ToastContainer from '@/components/Toast';
<ToastContainer />

// Fire toasts from anywhere using dispatch
import { useAppDispatch } from '@/store';
import { addToast } from '@/store/uiSlice';

const dispatch = useAppDispatch();

dispatch(addToast({ type: 'success', message: 'Saved!' }));
dispatch(addToast({ type: 'error',   message: 'Failed to connect.' }));
dispatch(addToast({ type: 'warning', message: 'Storage is at 90%.' }));
dispatch(addToast({ type: 'info',    message: 'Session expires in 5 min.' }));

// Custom duration
dispatch(addToast({ type: 'info', message: 'Long notice.', duration: 8000 }));`,
  a11y: (
    <ul>
      <li>Each toast has <code>role="alert"</code>, <code>aria-live="assertive"</code>, and <code>aria-atomic="true"</code> — announced immediately by screen readers.</li>
      <li>The dismiss button has <code>aria-label="Dismiss notification"</code>.</li>
      <li>Container has <code>aria-label="Notifications"</code> for orientation.</li>
    </ul>
  ),
};

// ─── Navbar ───────────────────────────────────────────────────
const navbarDoc: ComponentDocData = {
  id: 'navbar', label: 'Navbar', category: 'Navigation',
  description: 'A sticky top navigation bar with logo, nav links, dark mode toggle, palette switcher, and a responsive hamburger menu for mobile. Fully connected to Redux for theme, palette, and mobile nav state.',
  props: [
    { name: 'items', type: 'NavItem[]', description: 'Array of { label, to } objects. Defaults to the four app pages.' },
  ],
  usage: `import Navbar from '@/components/Navbar';

// Default (uses built-in nav items)
<Navbar />

// Custom nav items
<Navbar
  items={[
    { label: 'Home',     to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Pricing',  to: '/pricing' },
    { label: 'Contact',  to: '/contact' },
  ]}
/>`,
  a11y: (
    <ul>
      <li>Root element is <code>{'<header role="banner">'}</code>.</li>
      <li>Desktop nav is <code>{'<nav aria-label="Main navigation">'}</code>; mobile nav is <code>{'<nav aria-label="Mobile navigation">'}</code> with <code>aria-hidden</code> when closed.</li>
      <li>Hamburger button has <code>aria-expanded</code>, <code>aria-controls</code>, and a dynamic <code>aria-label</code> (Open menu / Close menu).</li>
      <li>Active link is communicated via React Router's <code>aria-current</code> prop on the active NavLink.</li>
      <li>Theme toggle button has a descriptive <code>aria-label</code> that states the target mode.</li>
    </ul>
  ),
};

// ─── Tabs ─────────────────────────────────────────────────────
const tabsDoc: ComponentDocData = {
  id: 'tabs', label: 'Tabs', category: 'Navigation',
  description: 'An accessible tab panel system with line and pill visual variants. Manages focus internally with roving tabIndex and full arrow-key keyboard navigation.',
  props: [
    { name: 'tabs',       type: 'TabItem[]',           description: 'Array of { id, label, content, disabled?, icon? } objects.' },
    { name: 'defaultTab', type: 'string',              description: 'id of the initially selected tab. Defaults to the first tab.' },
    { name: 'variant',    type: "'line' | 'pill'",     default: "'line'", description: 'Visual style of the tab list.' },
    { name: 'onChange',   type: '(id: string) => void', description: 'Called when active tab changes.' },
  ],
  usage: `import Tabs from '@/components/Tabs';

const tabs = [
  { id: 'overview', label: 'Overview', content: <p>Overview content</p> },
  { id: 'details',  label: 'Details',  content: <p>Details content</p> },
  { id: 'disabled', label: 'Locked',   content: null, disabled: true },
];

// Line variant (default)
<Tabs tabs={tabs} variant="line" />

// Pill variant
<Tabs tabs={tabs} variant="pill" />

// With icon
const tabsWithIcons = [
  {
    id: 'code',
    label: 'Code',
    icon: <CodeIcon />,
    content: <pre>…</pre>,
  },
];`,
  a11y: (
    <ul>
      <li>Tab list has <code>role="tablist"</code> and <code>aria-label</code>.</li>
      <li>Each tab button has <code>role="tab"</code>, <code>aria-selected</code>, <code>aria-controls</code>, and <code>id</code>.</li>
      <li>Each panel has <code>role="tabpanel"</code>, <code>aria-labelledby</code>, and <code>tabIndex={0}</code>.</li>
      <li>Keyboard: <kbd>←</kbd>/<kbd>→</kbd> cycle between enabled tabs; <kbd>Home</kbd>/<kbd>End</kbd> jump to first/last. Focus follows selection (roving tabIndex).</li>
      <li>Disabled tabs have <code>disabled</code> and are skipped in keyboard navigation.</li>
    </ul>
  ),
};

// ─── Tooltip ──────────────────────────────────────────────────
const tooltipDoc: ComponentDocData = {
  id: 'tooltip', label: 'Tooltip', category: 'Overlay',
  description: 'A hover/focus-triggered tooltip with four placements, configurable delay, and a Framer Motion entrance animation. Content can be any ReactNode.',
  props: [
    { name: 'content',   type: 'ReactNode',                        description: 'The tooltip body — can be text or rich JSX.' },
    { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Which side of the trigger the tooltip appears on.' },
    { name: 'delay',     type: 'number',                           default: '300',   description: 'Milliseconds before the tooltip appears on hover.' },
    { name: 'disabled',  type: 'boolean',                          default: 'false', description: 'Prevents the tooltip from showing.' },
    { name: 'children',  type: 'ReactNode',                        description: 'The trigger element.' },
  ],
  usage: `import Tooltip from '@/components/Tooltip';

<Tooltip content="Save document" placement="top">
  <Button variant="ghost">
    <SaveIcon />
  </Button>
</Tooltip>

// Rich content
<Tooltip content={<span>Shortcut: <strong>⌘S</strong></span>} placement="bottom">
  <IconButton />
</Tooltip>

// No delay
<Tooltip content="Instant" delay={0} placement="right">
  <span>Hover me</span>
</Tooltip>

// Disabled
<Tooltip content="Not shown" disabled>
  <Button>No tooltip</Button>
</Tooltip>`,
  a11y: (
    <ul>
      <li>Tooltip element has <code>role="tooltip"</code> and a generated <code>id</code>.</li>
      <li>Trigger gets <code>aria-describedby</code> pointing to the tooltip id when visible.</li>
      <li>Tooltip shows on both <code>mouseenter</code> and <code>focus</code> — keyboard users get tooltips too.</li>
      <li>Hides on <code>mouseleave</code> and <code>blur</code>.</li>
    </ul>
  ),
};

// ─── Popover ──────────────────────────────────────────────────
const popoverDoc: ComponentDocData = {
  id: 'popover', label: 'Popover', category: 'Overlay',
  description: 'A click-triggered floating panel rendered via createPortal. Supports 8 placement options, auto-clamps to the viewport on resize and scroll, an optional title bar with close button, and click-outside / Escape dismiss.',
  props: [
    { name: 'trigger',        type: 'ReactNode',          description: 'Element that opens/closes the popover on click.' },
    { name: 'content',        type: 'ReactNode',          description: 'The popover body content.' },
    { name: 'title',          type: 'string',             description: 'Optional header with a close button.' },
    { name: 'placement',      type: "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'", default: "'bottom'", description: 'Preferred position relative to the trigger.' },
    { name: 'closeOnOutside', type: 'boolean',            default: 'true', description: 'Closes when clicking outside the popover.' },
  ],
  usage: `import Popover from '@/components/Popover';

<Popover
  title="What is UIForge?"
  placement="bottom-start"
  trigger={<Button variant="secondary">Learn more</Button>}
  content={
    <p>A production-quality React component library.</p>
  }
/>

// No title (no header bar)
<Popover
  trigger={<IconButton />}
  content={<QuickActions />}
  placement="bottom-end"
/>`,
  a11y: (
    <ul>
      <li>Panel has <code>role="dialog"</code>, <code>aria-modal="false"</code>, and <code>aria-label</code> from title prop.</li>
      <li>Trigger gets <code>aria-expanded</code> and <code>aria-controls</code> pointing to the panel id.</li>
      <li><kbd>Escape</kbd> closes the popover via a document-level keydown listener.</li>
      <li>Close button has <code>aria-label="Close"</code>.</li>
    </ul>
  ),
};

// ─── DropdownMenu ─────────────────────────────────────────────
const dropdownDoc: ComponentDocData = {
  id: 'dropdown', label: 'Dropdown Menu', category: 'Overlay',
  description: 'A portal-rendered contextual menu with grouped sections, keyboard shortcut hints, disabled items, danger items, and full arrow-key navigation. Closes on Escape (returning focus to trigger) or outside click.',
  props: [
    { name: 'trigger',   type: 'ReactNode',         description: 'Element that opens/closes the menu on click.' },
    { name: 'sections',  type: 'DropdownSection[]', description: 'Array of { label?, items: DropdownItem[] }.' },
    { name: 'placement', type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'", default: "'bottom-start'", description: 'Preferred position.' },
    { name: 'width',     type: 'number',            default: '220', description: 'Fixed width of the menu panel in pixels.' },
  ],
  usage: `import DropdownMenu from '@/components/DropdownMenu';

<DropdownMenu
  trigger={<Button variant="secondary">Actions ▾</Button>}
  sections={[
    {
      items: [
        { id: 'edit',  label: 'Edit',  icon: <EditIcon />, onClick: handleEdit },
        { id: 'share', label: 'Share', icon: <ShareIcon />, shortcut: '⌘⇧S', onClick: handleShare },
      ],
    },
    {
      label: 'Danger zone',
      items: [
        { id: 'delete', label: 'Delete', icon: <TrashIcon />, danger: true, onClick: handleDelete },
      ],
    },
  ]}
/>

// Disabled item
{ id: 'export', label: 'Export', disabled: true }`,
  a11y: (
    <ul>
      <li>Menu has <code>role="menu"</code>; each item has <code>role="menuitem"</code>.</li>
      <li>Trigger gets <code>aria-haspopup="menu"</code>, <code>aria-expanded</code>, and <code>aria-controls</code>.</li>
      <li>Section groups have <code>role="group"</code> and <code>aria-label</code>.</li>
      <li>Keyboard: <kbd>↑</kbd>/<kbd>↓</kbd> navigate items; <kbd>Home</kbd>/<kbd>End</kbd> jump to first/last; <kbd>Escape</kbd> closes and returns focus to trigger.</li>
      <li>Disabled items have <code>aria-disabled="true"</code> and are excluded from keyboard navigation.</li>
      <li>Keyboard shortcuts are wrapped in <code>aria-label</code> on the shortcut span.</li>
    </ul>
  ),
};

// ─── Exported list (sidebar order) ───────────────────────────
export const ALL_DOCS: ComponentDocData[] = [
  buttonDoc, inputDoc, textareaDoc, selectDoc, checkboxDoc, radioDoc, switchDoc,
  badgeDoc, avatarDoc, cardDoc, spinnerDoc, toastDoc,
  modalDoc, tooltipDoc, popoverDoc, dropdownDoc,
  navbarDoc, tabsDoc,
];

export const CATEGORIES = ['Form', 'Display', 'Feedback', 'Overlay', 'Navigation'] as const;
