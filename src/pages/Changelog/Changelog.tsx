import { motion } from 'framer-motion';
import styles from './Changelog.module.scss';
import Badge from '../../components/Badge/Badge';
import type { BadgeVariant } from '../../components/Badge/Badge';

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

interface ChangeEntry {
  type: 'feature' | 'fix' | 'improvement' | 'infra';
  text: string;
}

interface Release {
  version: string;
  date: string;
  label?: string;
  summary: string;
  changes: ChangeEntry[];
}

const TYPE_VARIANT: Record<ChangeEntry['type'], BadgeVariant> = {
  feature:     'success',
  fix:         'error',
  improvement: 'info',
  infra:       'warning',
};

const TYPE_LABEL: Record<ChangeEntry['type'], string> = {
  feature:     'Feature',
  fix:         'Fix',
  improvement: 'Improvement',
  infra:       'Infra',
};

const RELEASES: Release[] = [
  {
    version: '1.2.0',
    date: '2026-06-01',
    summary: 'Storybook integration — every component now has an isolated story with Controls, Actions, and accessibility checks via @storybook/addon-a11y.',
    changes: [
      { type: 'feature', text: 'Storybook 10 scaffolded with @storybook/react-vite — runs on port 6006 via `npm run storybook`' },
      { type: 'feature', text: 'Stories for all 18 components: Avatar, Badge, Button, Card, Checkbox, DropdownMenu, Input, Modal, Popover, Radio, Select, Spinner, Switch, Tabs, Textarea, Toast, Tooltip — each with multiple named stories covering all prop variants' },
      { type: 'feature', text: 'Global Theme + Palette toolbar in Storybook — switch between light/dark and all 5 palettes (Ocean, Forest, Sunset, Violet, Rose) without touching code' },
      { type: 'feature', text: 'Redux Provider decorator in preview.tsx — stateful components like Toast work correctly in isolation' },
      { type: 'infra', text: 'viteFinal override strips the /UI-Forge/ base path from the Storybook dev/build config so stories load correctly without GitHub Pages routing' },
      { type: 'infra', text: 'Story files excluded from tsconfig.app.json so `npm run build` remains clean; Storybook handles TypeScript via its own Vite pipeline' },
    ],
  },
  {
    version: '1.1.0',
    date: '2026-06-01',
    summary: 'Post-launch quality pass — adds a live changelog page, navbar version badge, Inter font, and a full Vitest + React Testing Library suite.',
    changes: [
      { type: 'feature',     text: '/changelog page — timeline layout with tagged release entries (Feature / Improvement / Fix / Infra badges), lazy-loaded as its own chunk' },
      { type: 'feature',     text: 'Version badge in Navbar — pill chip next to the UIForge logo showing the current version, links to /changelog' },
      { type: 'improvement', text: 'Inter font fully wired via Google Fonts stylesheet (weights 300–800); preconnect hints were already in place from v1.0.0' },
      { type: 'infra',       text: 'Vitest + React Testing Library — 61 tests across 6 suites: Button, Modal, Tabs, Select, Switch, Input' },
      { type: 'infra',       text: 'Framer Motion test mock — Proxy-based mock strips animation props and renders plain HTML elements so component logic and ARIA attributes are testable in jsdom' },
      { type: 'infra',       text: 'Global scrollIntoView stub in test setup — jsdom does not implement the scroll API; stub prevents false failures in Select keyboard navigation tests' },
      { type: 'fix',         text: 'Git global identity configured — all commits now carry the correct author name and email instead of the machine hostname' },
    ],
  },
  {
    version: '1.0.0',
    date: '2026-06-01',
    label: 'Initial Release',
    summary: 'Full launch of UIForge — a production-quality React component library and live demo application showcasing agency-level front-end engineering.',
    changes: [
      { type: 'feature', text: '18 fully accessible components: Avatar, Badge, Button, Card, Checkbox, DropdownMenu, Input, Modal, Navbar, Popover, Radio, Select, Spinner, Switch, Tabs, Textarea, ThemeSwitcher, Toast' },
      { type: 'feature', text: 'Dual-layer CSS custom property theming — light/dark mode + 5 brand palettes (Ocean, Forest, Sunset, Violet, Rose) via data-theme / data-palette attributes' },
      { type: 'feature', text: 'Multi-step form demo with React Hook Form + Zod v4: 4 steps, per-step validation, animated slide transitions, and auto-fill seed data' },
      { type: 'feature', text: 'Dashboard page with RTK Query live data from JSONPlaceholder — stat cards, posts panel, users panel with loading skeletons' },
      { type: 'feature', text: 'Full Docs page — all 18 components documented with prop tables, live usage examples, and accessibility notes. Live search + category filters + sticky sidebar' },
      { type: 'feature', text: 'Framer Motion throughout — page fade-up transitions, scroll entrance animations, stagger hero, button whileHover/whileTap, card lift' },
      { type: 'feature', text: 'SASS 7-1 architecture with complete design token system — zero hardcoded values in any component' },
      { type: 'improvement', text: 'Route-level code splitting with React.lazy + Suspense — 28% reduction in initial bundle size' },
      { type: 'improvement', text: 'Inter font wired up via Google Fonts — cleaner typographic baseline across all weights 300–800' },
      { type: 'infra', text: 'GitHub Actions CI/CD pipeline — automated build and deploy to GitHub Pages on every push to main' },
      { type: 'infra', text: 'GitHub Pages SPA routing — 404.html encode/decode pattern so deep links and refreshes always work' },
      { type: 'fix', text: 'Password toggle unresponsive — pointer-events: none on Input\'s right icon slot blocked click on the visibility button; fixed with pointer-events: auto on the right slot only' },
    ],
  },
];

function TagBadge({ type }: { type: ChangeEntry['type'] }) {
  return (
    <Badge variant={TYPE_VARIANT[type]} size="sm" dot>
      {TYPE_LABEL[type]}
    </Badge>
  );
}

export default function Changelog() {
  return (
    <main className={styles.page}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: EASE }}
      >
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Changelog</h1>
          <p className={styles.subtitle}>
            Every release, every fix, every improvement — tracked here.
          </p>
        </header>

        {/* Timeline */}
        <div className={styles.timeline}>
          {RELEASES.map((release, i) => (
            <motion.article
              key={release.version}
              className={styles.release}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease: EASE, delay: i * 0.08 }}
            >
              {/* Release header */}
              <div className={styles.release__meta}>
                <div className={styles.release__dot} aria-hidden="true" />
                <div className={styles.release__header}>
                  <div className={styles.release__title_row}>
                    <h2 className={styles.release__version}>v{release.version}</h2>
                    {release.label && (
                      <Badge variant="success" size="sm">{release.label}</Badge>
                    )}
                  </div>
                  <time className={styles.release__date} dateTime={release.date}>
                    {new Date(release.date).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>

              {/* Summary */}
              <p className={styles.release__summary}>{release.summary}</p>

              {/* Change list */}
              <ul className={styles.changes} aria-label={`Changes in v${release.version}`}>
                {release.changes.map((change, j) => (
                  <li key={j} className={styles.change}>
                    <TagBadge type={change.type} />
                    <span className={styles.change__text}>{change.text}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
