# UIForge

> A production-quality React component library and live demo app built to showcase agency-level front-end engineering.

25 fully accessible components, dual-layer CSS custom property theming, a global command palette, sortable data tables with virtual scrolling, a multi-step form, a live RTK Query dashboard, comprehensive Vitest + Playwright test coverage, and automated CI releases — all in one coherent codebase.

**Live demo:** [rajanmali.github.io/UI-Forge](https://rajanmali.github.io/UI-Forge/)  
**Storybook:** [rajanmali.github.io/UI-Forge/storybook](https://rajanmali.github.io/UI-Forge/storybook/)  
**Version:** ![version](https://img.shields.io/github/package-json/v/rajanmali/UI-Forge)

---

## Tech stack

| Layer            | Technology                     | Version |
| ---------------- | ------------------------------ | ------- |
| UI               | React                          | 19      |
| Language         | TypeScript                     | 6       |
| Bundler          | Vite                           | 8       |
| Styling          | SASS (7-1 architecture)        | 1.100   |
| State            | Redux Toolkit + RTK Query      | 2.12    |
| Routing          | React Router                   | 7       |
| Animation        | Framer Motion                  | 12      |
| Forms            | React Hook Form + Zod          | 7 / 4   |
| Stories          | Storybook                      | 10      |
| Unit tests       | Vitest + React Testing Library | —       |
| API mocking      | Mock Service Worker (MSW)      | 2       |
| E2E tests        | Playwright                     | 1.60    |
| Virtual scroll   | TanStack Virtual               | 3       |
| Syntax highlight | prism-react-renderer           | —       |

---

## Getting started

```bash
git clone git@github.com:rajanmali/UI-Forge.git
cd UI-Forge
npm install
npm run dev        # app      →  http://localhost:5173
npm run storybook  # stories  →  http://localhost:6006
```

### All scripts

| Script                    | What it does                                    |
| ------------------------- | ----------------------------------------------- |
| `npm run dev`             | Vite dev server on port 5173                    |
| `npm run build`           | TypeScript check + production build             |
| `npm run preview`         | Serve the production build locally              |
| `npm run storybook`       | Storybook dev on port 6006                      |
| `npm run build-storybook` | Build a static Storybook                        |
| `npm run test`            | Run all 154 Vitest unit tests                   |
| `npm run test:watch`      | Vitest in watch mode                            |
| `npm run coverage`        | Generate a coverage report                      |
| `npm run e2e`             | Run 23 Playwright E2E tests (starts dev server) |
| `npm run e2e:ui`          | Playwright with the interactive UI runner       |
| `npm run lint`            | ESLint across the codebase                      |
| `npm run release`         | Bump version + generate CHANGELOG (run by CI)   |

---

## Components

25 components, each as `ComponentName.tsx` + `ComponentName.module.scss` + `index.ts`.

| Component              | Category   | Description                                                                                                                                                     |
| ---------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Accordion**          | Display    | Disclosure component — single or multi-open, `default`/`bordered` variants, Framer height animation, Arrow/Home/End keyboard nav                                |
| **Avatar**             | Display    | Initials with deterministic colour, image fallback, 5 sizes, 4 status indicators                                                                                |
| **Badge**              | Display    | 7 semantic variants, dot indicator, 3 sizes                                                                                                                     |
| **Button**             | Action     | 4 variants, 3 sizes, loading spinner, left/right icon slots, Framer whileHover/whileTap                                                                         |
| **Card**               | Display    | Elevated / outlined / filled, hoverable Framer lift, clickable role                                                                                             |
| **Checkbox**           | Form       | Custom styled, indeterminate state, 3 sizes, error + helper text                                                                                                |
| **CommandPalette**     | Navigation | Global ⌘K overlay — fuzzy search across pages, components, and actions; Arrow key navigation; Redux-driven state                                                |
| **DataTable**          | Display    | Generic `DataTable<T>` — debounced text filter, column sort (asc/desc/off), client-side pagination, compact mode, opt-in virtual scrolling via TanStack Virtual |
| **DropdownMenu**       | Overlay    | Portal, sections + groups, Arrow/Home/End/ESC keyboard nav, danger + disabled items                                                                             |
| **ErrorBoundary**      | Utility    | Class component — catches runtime errors, styled fallback card, Reload button                                                                                   |
| **Input**              | Form       | Label, helper/error text, left/right icon slots, 3 sizes                                                                                                        |
| **Modal**              | Overlay    | Portal, focus trap, ESC-close, scroll lock, slide-up animation                                                                                                  |
| **Navbar**             | Navigation | Sticky, dark mode toggle, palette switcher, ⌘K search button, hamburger menu                                                                                    |
| **PageLoader**         | Feedback   | Fullscreen skeleton shown during lazy-loaded route chunks                                                                                                       |
| **PageTransition**     | Utility    | `AnimatePresence` fade-up wrapper for every route change                                                                                                        |
| **Popover**            | Overlay    | Portal, 8 placements, viewport clamping, click-outside + ESC                                                                                                    |
| **Radio / RadioGroup** | Form       | Vertical + horizontal orientation, per-option helper text, group error state                                                                                    |
| **Select**             | Form       | Custom combobox, option groups, full keyboard navigation                                                                                                        |
| **Spinner**            | Feedback   | SVG arc, 4 sizes, 3 colour modes                                                                                                                                |
| **Switch**             | Form       | Animated thumb, 3 sizes, left/right label, `role="switch"`                                                                                                      |
| **Tabs**               | Navigation | Line + pill variants, Arrow key nav, full ARIA tablist roles                                                                                                    |
| **Textarea**           | Form       | Label, helper/error text, configurable resize                                                                                                                   |
| **ThemeSwitcher**      | Navigation | 5 brand palettes, animated dropdown, persisted to localStorage                                                                                                  |
| **Toast**              | Feedback   | Redux-driven queue, 4 types, auto-dismiss, fixed-position                                                                                                       |
| **Tooltip**            | Overlay    | 4 placements, configurable delay, portal rendering, Framer Motion enter/exit                                                                                    |

---

## Pages

| Route        | Description                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `/`          | Showcase — every component with all variants and interactive states                                                             |
| `/dashboard` | RTK Query live data (JSONPlaceholder) — stat cards, DataTable with filter + sort, Compose Post modal with optimistic updates    |
| `/form-demo` | 4-step multi-step form — React Hook Form + Zod v4, per-step validation, password strength meter, auto-fill seed data            |
| `/docs`      | Component reference — prop tables, syntax-highlighted usage examples, accessibility notes, sidebar with active-section tracking |
| `/changelog` | Auto-generated release history — synced from CHANGELOG.md on every CI release                                                   |

---

## Theming

Two independent CSS custom property layers let you mix light/dark mode with any brand palette.

**Light / dark mode** — toggled via `data-theme` on `<html>`, persisted to localStorage:

```
--bg-primary     --bg-secondary    --text-primary    --text-secondary
--surface        --border          --border-strong   --text-muted
```

**Brand palette** — toggled via `data-palette` on `<html>`:

| Palette           | Primary               | Accent               |
| ----------------- | --------------------- | -------------------- |
| `ocean` (default) | Zibbet teal `#1BAAA0` | Cornflower `#669DEC` |
| `forest`          | Aqua `#79D2B8`        | Weldon `#7CB3AC`     |
| `sunset`          | Jellybean `#DB6557`   | Salmon `#FF9F7A`     |
| `violet`          | Mauve `#AEA0E8`       | Periwinkle `#B6C1FF` |
| `rose`            | Coral `#FC7E8A`       | Flamingo `#FC91AD`   |

```
--palette-primary  --palette-accent  --palette-accent-light
--palette-focus    --palette-shadow-primary
```

Every interactive component reads `var(--palette-*)` tokens — one palette swap cascades everywhere instantly.

---

## Testing

### Unit tests · 154 tests / 22 suites

All 25 components have Vitest + React Testing Library coverage. RTK Query endpoints are mocked via **Mock Service Worker** so no real network requests are made during tests.

```bash
npm run test       # run once
npm run test:watch # watch mode
npm run coverage   # HTML coverage report
```

### E2E tests · 23 tests / 4 suites

Playwright (Chromium) covers the four critical user flows:

| Suite                | What it tests                                                 |
| -------------------- | ------------------------------------------------------------- |
| `form-demo.spec.ts`  | 4-step form: auto-fill, validation, back navigation           |
| `dashboard.spec.ts`  | DataTable: filter, column sort, compact view, pagination      |
| `theme.spec.ts`      | Dark mode toggle + palette switch, localStorage persistence   |
| `navigation.spec.ts` | Command palette: keyboard open, filter, navigation, ESC close |

```bash
npm run e2e       # headless
npm run e2e:ui    # interactive UI runner
```

---

## CI / CD

All three workflows run on every push to `main`:

| Workflow    | What it does                                                                                                                                                                              |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Release** | Runs `standard-version` → bumps `package.json` version, generates `CHANGELOG.md`, syncs `Changelog.tsx` and `src/version.ts`, commits `chore(release): vX.Y.Z [skip ci]`, tags and pushes |
| **Deploy**  | Builds app + Storybook, deploys both to GitHub Pages (`/` and `/storybook/`)                                                                                                              |
| **CI**      | Runs unit tests and Playwright E2E tests on every PR and push                                                                                                                             |

Commit message format is enforced by **commitlint** (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `ci:`, `chore:`). Pre-commit hooks run ESLint + Prettier via **Husky** + **lint-staged**.

---

## Design tokens

Single source of truth: `src/styles/abstracts/_variables.scss`

All component files reference SASS variables or CSS custom properties — zero hardcoded colour or spacing values in any component.

```scss
// Colours
$color-primary-600:  #1BAAA0   // Zibbet teal
$color-accent-500:   #669DEC   // Cornflower blue

// Spacing (rem scale)
$space-1:   0.25rem   //  4px
$space-4:   1rem      // 16px
$space-8:   2rem      // 32px
$space-16:  4rem      // 64px

// Radii
$radius-sm:   0.25rem
$radius-md:   0.5rem
$radius-lg:   0.75rem
$radius-xl:   1rem
$radius-full: 9999px
```

---

## Project structure

```
src/
├── App.tsx                    # Provider → BrowserRouter → AppShell → ErrorBoundary → Routes
├── version.ts                 # APP_VERSION — auto-updated by CI on every release
├── store/
│   ├── index.ts               # configureStore, typed hooks
│   ├── uiSlice.ts             # theme, palette, toasts, navOpen, commandPaletteOpen
│   ├── dashboardSlice.ts      # filterUserId, sortBy, compactView, activeTab, page
│   └── api.ts                 # RTK Query: getPosts, getPost, getUsers, createPost
├── styles/                    # SASS 7-1: abstracts, themes, base, layout
├── mocks/
│   ├── handlers.ts            # MSW request handlers (JSONPlaceholder endpoints)
│   └── server.ts              # setupServer() — used by Vitest test setup
├── components/                # 25 components — .tsx + .module.scss + index.ts each
└── pages/
    ├── Home/                  # Component showcase
    ├── Dashboard/             # RTK Query live data + DataTable
    ├── FormDemo/              # 4-step validated form
    ├── Docs/                  # Component reference with syntax-highlighted usage
    └── Changelog/             # Auto-synced release timeline

.storybook/
├── main.ts                    # Framework, addon-a11y, viteFinal base override
└── preview.tsx                # Redux Provider decorator, Theme/Palette toolbar globals

e2e/                           # Playwright specs (4 suites, 23 tests)
scripts/
└── sync-changelog.js          # Parses CHANGELOG.md → updates Changelog.tsx + version.ts
.github/workflows/
├── release.yml                # Auto-release on push to main
├── deploy.yml                 # GitHub Pages deploy (app + Storybook)
└── ci.yml                     # Unit tests + Playwright on PRs and pushes
```

---

## Accessibility

Every component ships with:

- Semantic ARIA roles (`dialog`, `switch`, `combobox`, `listbox`, `menu`, `grid`, `tab`, `tooltip`, `region`, …)
- Full keyboard navigation (Tab, Enter, Space, Escape, Arrow keys, Home, End)
- `aria-*` state attributes (`expanded`, `selected`, `sort`, `invalid`, `busy`, `disabled`, `live`, …)
- `:focus-visible` rings — never `:focus` — via the `focus-visible-ring` SASS mixin
- Screen-reader-only text via the `visually-hidden` SASS mixin
- Loading states: `aria-busy` + `aria-disabled` on interactive elements

---

## License

MIT
