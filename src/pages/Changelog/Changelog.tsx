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
    version: '1.5.2',
    date: '2026-06-02',
    summary: 'Tooltip component rewritten to render via React portal — escapes all CSS stacking contexts so it no longer clips or bleeds through Card, Modal, or any transformed parent. Tooltip colour fixed to a hardcoded near-black independent of the warm palette token system.',
    changes: [
      { type: 'fix', text: 'Tooltip: converted from absolute-positioned child to createPortal(document.body) — position computed via getBoundingClientRect so z-index is always relative to the document root, not a transformed ancestor' },
      { type: 'fix', text: 'Tooltip: centering transform (translate(-50%, -100%) etc.) moved to the portal wrapper div; Framer Motion animates the inner span with scale/opacity only — the two transforms no longer conflict' },
      { type: 'fix', text: 'Tooltip: background hardcoded to #1a1a1a (near-black) instead of $color-gray-900 which had become warm brown #2d2319 after the v1.3.0 palette migration' },
    ],
  },
  {
    version: '1.5.1',
    date: '2026-06-02',
    summary: 'Inputs, Selects, Textareas, Switches, and RadioGroups now disable during form submission — wired at component level via a disabled prop so the behaviour cascades automatically.',
    changes: [
      { type: 'fix', text: 'RadioGroup: added top-level disabled prop — all radio options disable together; previously only per-option disabled was supported' },
      { type: 'fix', text: 'Step1Personal, Step2Account, Step3Preferences: each accepts disabled prop and passes it to every field — all inputs lock during the 1.4s mock submit' },
      { type: 'fix', text: 'FormDemo: stepComponents array passes disabled={submitting} to steps 1–3 so the full field set becomes non-interactive while submission is in flight' },
      { type: 'fix', text: 'Dashboard ComposeModal: Select, Input, and Textarea receive disabled={isLoading} — fields lock during the createPost RTK Query mutation' },
    ],
  },
  {
    version: '1.5.0',
    date: '2026-06-02',
    label: 'Dashboard Polish',
    summary: 'Three Dashboard fixes: internal list scroll removed in favour of Redux-driven pagination, Compose Post gains an Auto-fill button matching the FormDemo pattern, and the Refresh button now awaits the refetch and surfaces a completion toast explaining optimistic write behaviour.',
    changes: [
      { type: 'fix',         text: 'Dashboard list: removed max-height + overflow-y — panel no longer scrolls internally; page scrolls naturally' },
      { type: 'feature',     text: 'Dashboard pagination: dashboardSlice gains a page counter (20 posts per page); filter and sort changes reset to page 0; Prev/Next controls dispatch setPage' },
      { type: 'feature',     text: 'Compose Post: Auto-fill button pre-populates title, body, and author with seed data, matching the multi-step FormDemo pattern' },
      { type: 'fix',         text: 'Refresh button: now async — awaits refetchPosts(), shows a loading spinner on the button, and fires a completion toast explaining that optimistic writes are cleared on refetch because JSONPlaceholder is read-only' },
    ],
  },
  {
    version: '1.4.0',
    date: '2026-06-02',
    label: 'Dashboard v2',
    summary: 'Full Dashboard rewrite showcasing advanced Redux patterns — RTK Query mutations with optimistic updates, a dedicated dashboardSlice for client-side UI state, and six new components integrated into the page. UI polish pass fixes Badge breathability and a Tabs overflow issue.',
    changes: [
      { type: 'feature',     text: 'Dashboard: RTK Query createPost mutation with optimistic update middleware — new post appears instantly in the list before the network response lands, rolls back on failure' },
      { type: 'feature',     text: 'Dashboard: dashboardSlice — dedicated Redux slice for filterUserId, sortBy, and compactView, cleanly separating UI state from server cache state' },
      { type: 'feature',     text: 'Dashboard: full 100-post dataset from JSONPlaceholder (removed _limit=10) with client-side filter by author (Select) and sort by date/title/author (DropdownMenu)' },
      { type: 'feature',     text: 'Dashboard: Tabs component splits Posts and Users panels; Switch toggles compact/comfortable view; Tooltip on all stat card deltas and post ID chips' },
      { type: 'feature',     text: 'Dashboard: Compose Post modal (Modal + Input + Textarea + Select) demonstrates the full mutation flow with author picker and live optimistic feedback' },
      { type: 'improvement', text: 'Badge: padding increased at all three sizes (sm 2px→4px, md 4px→8px vertical) for better readability as eyebrow labels and section tags' },
      { type: 'fix',         text: 'Badge: stretching full-width inside flex column containers — added align-items: flex-start to FormDemo page_header and Docs header' },
      { type: 'fix',         text: 'Tabs: visible horizontal scrollbar on tabs list replaced with scrollbar-width: none — functionality preserved, track hidden' },
      { type: 'fix',         text: 'Home hero version badge wired to APP_VERSION constant — no longer shows hardcoded v1.0.0' },
    ],
  },
  {
    version: '1.3.0',
    date: '2026-06-02',
    label: 'Warm Palette',
    summary: 'Full design-token palette migration to a warm, muted pastel system derived from 18 hand-picked source colours — plus a dev-server base-path fix so localhost:5173/ works without a sub-directory prefix.',
    changes: [
      { type: 'feature',     text: 'New warm pastel colour system: primary teal scale anchored at Zibbet Green #1BAAA0, accent cornflower/aero/sky-blue scale anchored at #669DEC, warm greige gray scale from Taupe #5F4C41' },
      { type: 'feature',     text: 'All 5 named palettes remapped — Ocean (teal + cornflower), Forest (aqua + weldon), Sunset (jellybean + salmon), Violet (mauve + periwinkle), Rose (coral + flamingo)' },
      { type: 'improvement', text: 'Semantic colour scales (success, warning, error, info) remapped to matching image hues: success teal, warning topaz/peach, error jellybean/coral, info cornflower/aero' },
      { type: 'fix',         text: 'Light/dark mode text and background vars pinned to original cool-gray values so surface readability is unaffected by the greige token changes' },
      { type: 'fix',         text: 'Avatar.tsx AVATAR_COLORS array updated from old navy/blue hex to new palette colours — SASS migration alone could not reach these runtime JS strings' },
      { type: 'fix',         text: 'ThemeSwitcher.tsx palette swatch gradients updated to match each palette\'s new primary/accent so the picker chips reflect the actual applied colours' },
      { type: 'fix',         text: '_light.scss :root fallback palette block updated so pre-hydration first-paint uses new teal/cornflower instead of old navy/blue' },
      { type: 'infra',       text: 'vite.config.ts: base path is now \'/\' in dev (fixes localhost:5173/ redirect error) and \'/UI-Forge/\' in production builds only — GitHub Pages deployment unchanged' },
    ],
  },
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
