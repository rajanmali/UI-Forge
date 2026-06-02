# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.6.1](https://github.com/rajanmali/UI-Forge/compare/v1.6.0...v1.6.1) (2026-06-02)

### Bug Fixes

- **ci:** fix detached HEAD and add release push diagnostics ([e15b80b](https://github.com/rajanmali/UI-Forge/commit/e15b80ba5bdf00fd4f85f8a0fc7860af83b3d315))

## [1.6.0](https://github.com/rajanmali/UI-Forge/compare/v1.5.4...v1.6.0) (2026-06-02)

### Features

- **accordion:** add Accordion disclosure component ([063670e](https://github.com/rajanmali/UI-Forge/commit/063670e8d7e086b9878d9d0caf8000bbeb9d5743))
- **command-palette:** add global ⌘K command palette ([c17b824](https://github.com/rajanmali/UI-Forge/commit/c17b824cf75c3b60500f5df03939a8b98c0c10b6))
- **datatable:** add DataTable component and integrate into Dashboard ([53e66e7](https://github.com/rajanmali/UI-Forge/commit/53e66e72f9e38e83f3207a9047248c45dd74096e))
- **datatable:** add virtual scrolling via @tanstack/react-virtual ([857dd04](https://github.com/rajanmali/UI-Forge/commit/857dd0469abc97d0195cc1c0cff582c282c9214c))
- **error-boundary:** add ErrorBoundary component and wrap route area ([ef94ace](https://github.com/rajanmali/UI-Forge/commit/ef94acec560f1613459a2904ff311b17d3ee41f9))
- **msw:** add Mock Service Worker for deterministic API tests ([8bc9061](https://github.com/rajanmali/UI-Forge/commit/8bc906173134e1f11e76624cf190b92314df76b6))

### Bug Fixes

- **ci:** fix shell syntax error in release workflow ([89085d8](https://github.com/rajanmali/UI-Forge/commit/89085d88c81fa220d54eb3408138be56b33b956d))
- **ci:** use annotated tag so --follow-tags pushes it ([131df45](https://github.com/rajanmali/UI-Forge/commit/131df450901ffbebd47e0cb48e11033a08aaf1fb))
- **docs:** sidebar active item matches hash on command palette navigation ([d9d1724](https://github.com/rajanmali/UI-Forge/commit/d9d1724112362935ea4e0beb5b780324b44b5f6a))
- syntax highlighting in Docs, FormDemo bg, palette centering, hash scroll ([efb02cf](https://github.com/rajanmali/UI-Forge/commit/efb02cf29aa36776e9c26a2185afc8f7099d59da)), closes [#1e1e1](https://github.com/rajanmali/UI-Forge/issues/1e1e1) [#2d2319](https://github.com/rajanmali/UI-Forge/issues/2d2319)

### Tests

- add unit tests for all 16 previously-untested components ([def1671](https://github.com/rajanmali/UI-Forge/commit/def167177c51b3254994cabefc35137d137ca4fa))
- **e2e:** add Playwright E2E tests for 4 critical user paths ([210a334](https://github.com/rajanmali/UI-Forge/commit/210a3346b71f02325ae8edcecbd67fa470d52996))

## [1.5.4] (2026-06-02)

### Bug Fixes

- Docs: search input max-width: 32rem replaced with width: 100% — bar now spans the full header column, consistent with the title and subtitle above it

## [1.5.3] (2026-06-02)

### Bug Fixes

- Tooltip: useEffect cleanup clears pending setTimeout on unmount — prevents stale setVisible(true) firing during route transitions
- Tooltip: scroll and resize listeners (capture, passive) re-run calcPos() while visible — portal position tracks trigger as page scrolls
- Dashboard handleRefresh: checks result.error before dispatching success toast — RTK Query refetch() resolves on network error rather than rejecting
- Dashboard usersTab: single O(n) useMemo Map replaces 2x10 filter() scans per render
- Dashboard pagination: setPage clamps via Math.min/Math.max — rapid double-click cannot advance beyond valid bounds
- Dashboard: Tabs onChange dispatches setActiveTab — Redux activeTab reflects real UI state
- api.ts createPost: module-level decrementing counter replaces Date.now() optimistic ID — always negative, never collides

### Improvements

- FormDemo steps: single fieldset disabled={submitting} replaces 14 individual disabled prop threads

## [1.5.2] (2026-06-02)

### Bug Fixes

- Tooltip: converted to createPortal(document.body) — position computed via getBoundingClientRect, z-index relative to document root
- Tooltip: centering transform moved to portal wrapper div; Framer Motion animates inner span only — transforms no longer conflict
- Tooltip: background hardcoded to #1a1a1a instead of $color-gray-900 which became warm brown after v1.3.0 palette migration

## [1.5.1] (2026-06-02)

### Bug Fixes

- RadioGroup: top-level disabled prop added — all options disable together
- Step1Personal, Step2Account, Step3Preferences: accept disabled prop, pass to every field
- FormDemo: disabled={submitting} passed to steps 1–3 via stepComponents array
- Dashboard ComposeModal: Select, Input, Textarea receive disabled={isLoading}

## [1.5.0] (2026-06-02)

### Features

- Dashboard pagination: dashboardSlice gains page counter (20 posts per page); filter and sort changes reset to page 0; Prev/Next dispatch setPage
- Compose Post: Auto-fill button pre-populates title, body, and author with seed data

### Bug Fixes

- Dashboard list: removed max-height + overflow-y — panel no longer scrolls internally
- Refresh button: async, awaits refetchPosts(), shows loading spinner, fires completion toast

## [1.4.0] (2026-06-02)

### Features

- Dashboard: RTK Query createPost mutation with optimistic update middleware — new post appears instantly, rolls back on failure
- Dashboard: dashboardSlice — filterUserId, sortBy, compactView cleanly separated from server cache state
- Dashboard: full 100-post dataset with client-side filter by author (Select) and sort by date/title/author (DropdownMenu)
- Dashboard: Tabs splits Posts/Users panels; Switch toggles compact view; Tooltip on stat card deltas and post IDs
- Dashboard: Compose Post modal (Modal + Input + Textarea + Select) demonstrates full mutation flow

### Improvements

- Badge: padding increased at all sizes (sm 2px→4px, md 4px→8px vertical) for better readability

### Bug Fixes

- Badge: added align-items: flex-start to FormDemo and Docs headers — prevents full-width stretch in flex column
- Tabs: scrollbar-width: none hides horizontal scrollbar on tabs list
- Home hero version badge wired to APP_VERSION constant

## [1.3.0] (2026-06-02)

### Features

- New warm pastel colour system: primary teal anchored at Zibbet Green #1BAAA0, accent cornflower at #669DEC, warm greige gray from Taupe #5F4C41
- All 5 palettes remapped — Ocean, Forest, Sunset, Violet, Rose

### Improvements

- Semantic colour scales remapped: success teal, warning topaz/peach, error jellybean/coral, info cornflower/aero

### Bug Fixes

- Light/dark mode text and background vars pinned to original cool-gray values — surface readability unaffected by greige token changes
- Avatar.tsx AVATAR_COLORS updated to new palette hex values
- ThemeSwitcher.tsx palette swatch gradients updated to match each palette's new primary/accent
- \_light.scss :root fallback palette block updated to teal/cornflower

### Infrastructure

- vite.config.ts: base path is '/' in dev and '/UI-Forge/' in production builds only

## [1.2.0] (2026-06-01)

### Features

- Storybook 10 scaffolded with @storybook/react-vite — runs on port 6006 via npm run storybook
- Stories for all 18 components with all prop variants
- Global Theme + Palette toolbar in Storybook — switch light/dark and all 5 palettes
- Redux Provider decorator in preview.tsx — stateful components work correctly in isolation

### Infrastructure

- viteFinal strips /UI-Forge/ base path from Storybook config
- Story files excluded from tsconfig.app.json so npm run build stays clean

## [1.1.0] (2026-06-01)

### Features

- /changelog page — timeline layout with tagged release entries, lazy-loaded as its own chunk
- Version badge in Navbar — pill chip showing current version, links to /changelog

### Improvements

- Inter font wired via Google Fonts (weights 300–800)

### Infrastructure

- Vitest + React Testing Library — 61 tests across 6 suites: Button, Modal, Tabs, Select, Switch, Input
- Framer Motion test mock — Proxy-based, strips animation props, renders plain HTML
- Global scrollIntoView stub in test setup

### Bug Fixes

- Git global identity configured — all commits carry correct author name and email

## [1.0.0] (2026-06-01)

### Features

- 18 fully accessible components: Avatar, Badge, Button, Card, Checkbox, DropdownMenu, Input, Modal, Navbar, Popover, Radio, Select, Spinner, Switch, Tabs, Textarea, ThemeSwitcher, Toast
- Dual-layer CSS custom property theming — light/dark + 5 brand palettes via data-theme / data-palette
- Multi-step form demo with React Hook Form + Zod v4: 4 steps, per-step validation, animated transitions, auto-fill
- Dashboard page with RTK Query live data from JSONPlaceholder
- Full Docs page with prop tables, live examples, a11y notes, live search, and sticky sidebar
- Framer Motion throughout — page transitions, scroll entrance, stagger hero, button/card animations
- SASS 7-1 architecture with complete design token system — zero hardcoded values in any component

### Improvements

- Route-level code splitting with React.lazy + Suspense — 28% reduction in initial bundle size
- Inter font via Google Fonts

### Infrastructure

- GitHub Actions CI/CD — automated build and deploy to GitHub Pages on every push to main
- GitHub Pages SPA routing — 404.html encode/decode pattern for deep links and refreshes

### Bug Fixes

- Password toggle unresponsive — pointer-events: none on Input right icon slot blocked click; fixed with pointer-events: auto
