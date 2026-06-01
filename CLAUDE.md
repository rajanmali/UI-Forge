# UIForge — CLAUDE.md

This file gives a Claude instance full context on the UIForge project so it can audit the codebase, propose features, and implement changes without needing to re-derive the architecture.

---

## Project purpose

UIForge is a **branded React component library and live demo app** built to showcase agency-level front-end engineering skills. The goal is a polished, production-quality portfolio project demonstrating: design systems, accessibility, state management, form validation, animation, and theming — all in one coherent codebase.

**GitHub repo:** `github.com:rajanmali/UI-Forge.git` (branch: `main`)
**Dev server:** `npm run dev` → `http://localhost:5173` (base `'/'` in dev, `'/UI-Forge/'` in production builds only)
**Storybook:** `npm run storybook` → `http://localhost:6006`
**Build:** `npm run build` (tsc -b then vite build, zero warnings expected)
**Version:** 1.5.2

---

## Tech stack

| Layer | Technology | Version |
|---|---|---|
| UI | React | 19 |
| Language | TypeScript | 6 |
| Bundler | Vite | 8 |
| Styling | SASS (7-1 architecture) | 1.100 |
| State | Redux Toolkit + RTK Query | 2.12 |
| Routing | React Router v7 | 7.16 |
| Animation | Framer Motion | 12 |
| Forms | React Hook Form + Zod v4 | 7.77 / 4.4 |
| Linting | ESLint + Prettier | configured |

---

## Project structure

```
src/
├── App.tsx                  # Root: Provider → BrowserRouter → AppShell → PageTransition → Routes
├── main.tsx                 # ReactDOM.createRoot entry
│
├── store/
│   ├── index.ts             # configureStore, RootState, AppDispatch, typed hooks
│   ├── uiSlice.ts           # theme (light|dark), palette (5 options), toasts[], navOpen
│   └── api.ts               # RTK Query: getPosts, getPost, getUsers (JSONPlaceholder)
│
├── styles/                  # SASS 7-1 architecture
│   ├── main.scss            # Entry — imports: abstracts, themes, base, layout
│   ├── abstracts/
│   │   ├── _variables.scss  # ALL design tokens (colours, type, spacing, radii, shadows, z-index, breakpoints)
│   │   ├── _mixins.scss     # Breakpoint (xs–2xl up/down), flex helpers, a11y, container, elevation
│   │   └── _functions.scss  # rem(), em(), tint(), shade(), alpha()
│   ├── base/
│   │   ├── _reset.scss      # Box-sizing, body defaults, #root flex column
│   │   └── _typography.scss # h1–h6, p, code, pre, a, strong
│   ├── themes/
│   │   ├── _light.scss      # --bg-*, --text-*, --border-*, --surface-* CSS vars on :root
│   │   ├── _dark.scss       # Same vars on [data-theme='dark']
│   │   └── _palettes.scss   # --palette-accent, --palette-primary etc. on [data-palette='*']
│   └── layout/
│       └── _index.scss      # .container, .layout, .grid utilities
│
├── components/              # 21 components — each: ComponentName.tsx + .module.scss + index.ts
│   ├── Avatar/              # Initials (deterministic colour), image, status dot (online/away/busy/offline)
│   ├── Badge/               # 7 semantic variants, dot indicator, 3 sizes
│   ├── Button/              # 4 variants, 3 sizes, loading+spinner, icon slots, Framer whileHover/whileTap
│   ├── Card/                # elevated/outlined/filled, hoverable (Framer lift), clickable
│   ├── Checkbox/            # Custom styled, indeterminate, 3 sizes, error/helper
│   ├── DropdownMenu/        # Portal, sections+groups, keyboard nav (arrows/Home/End/Escape), danger/disabled items
│   ├── Input/               # Label, helper/error, left+right icon slots (right is pointer-events:auto), 3 sizes
│   ├── Modal/               # Portal, focus trap, ESC-close, scroll lock, slide-up animation
│   ├── Navbar/              # Sticky, dark mode toggle, palette switcher, hamburger menu, Redux-connected
│   ├── PageLoader/          # Fullscreen skeleton shown during lazy-loaded route chunks
│   ├── PageTransition/      # AnimatePresence fade-up on every route change
│   ├── Popover/             # Portal, 8 placement options, auto-clamps to viewport, click-outside+ESC
│   ├── Radio/               # Radio + RadioGroup (vertical/horizontal), per-option helper text
│   ├── Select/              # Custom combobox, option groups, keyboard nav (arrows/Enter/Escape/Home/End)
│   ├── Spinner/             # SVG arc, 4 sizes, 3 colour modes
│   ├── Switch/              # Animated thumb, 3 sizes, left/right label, role="switch"
│   ├── Tabs/                # line/pill variants, arrow-key keyboard nav, ARIA roles
│   ├── Textarea/            # Label, helper/error, configurable resize
│   ├── ThemeSwitcher/       # 5 palettes (Ocean/Forest/Sunset/Violet/Rose), animated dropdown, persisted
│   ├── Toast/               # Redux-driven queue, 4 types, auto-dismiss, portal-free (fixed position)
│   └── Tooltip/             # 4 placements, configurable delay, Framer Motion enter/exit
│
├── pages/
│   ├── Home/                # Live showcase of every component with all variants
│   ├── Dashboard/           # RTK Query live data (JSONPlaceholder), stat cards, posts+users panels
│   ├── FormDemo/            # 4-step validated form (see below)
│   ├── Docs/                # All components documented with prop tables, live examples, a11y notes
│   └── Changelog/           # Release timeline with Feature/Fix/Improvement/Infra badges
│
└── [stories]                # *.stories.tsx co-located with each component (excluded from tsc build)
```

---

## Design token system

**Single source of truth:** `src/styles/abstracts/_variables.scss`

All component files use **zero hardcoded colour or spacing values** — everything references SASS variables or CSS custom properties.

Key tokens:
- **Primary teal:** `$color-primary-600` = `#1BAAA0` (Zibbet Green)
- **Accent cornflower:** `$color-accent-500` = `#669DEC`
- **Gray scale:** warm greige `$color-gray-900` = `#2d2319` → `$color-gray-50` = `#faf4f1`
- **Spacing scale:** `$space-1` (4px) → `$space-32` (128px) in `rem`
- **Breakpoints:** `$bp-xs` 480 → `$bp-2xl` 1536, used via `@include md-up { }` etc.

> **Important:** `--text-*`, `--border-*`, `--bg-*`, and `--surface-*` CSS vars in
> `_light.scss` and `_dark.scss` are **hardcoded to original cool-gray hex values** (not
> interpolated from `$color-gray-*`). This keeps surface readability independent of the
> warm greige token scale. Do not change these back to SASS variable interpolations.

### Tooltip architecture note

`Tooltip` renders via `createPortal(document.body)` with `position: fixed` coordinates computed from `getBoundingClientRect`. The centering CSS transform lives on a plain `div` wrapper; Framer Motion animates an inner `span` with scale/opacity only so the two transforms never conflict. Background colour is hardcoded (`#1a1a1a`) — it must NOT reference `$color-gray-*` which is now warm greige.

### Theme system

CSS custom properties are declared in two layers:

1. **Light/dark** (`--bg-primary`, `--text-primary`, `--surface`, `--border`, etc.) — toggled by setting `data-theme` attribute on `<html>`. Persisted to `localStorage` via Redux.

2. **Brand palette** (`--palette-accent`, `--palette-primary`, `--palette-accent-light`, `--palette-shadow-primary`, `--palette-focus`) — toggled by `data-palette` attribute. 5 palettes: `ocean` (teal + cornflower, default), `forest` (aqua + weldon), `sunset` (jellybean + salmon), `violet` (mauve + periwinkle), `rose` (coral + flamingo). Every interactive component reads these vars so one palette swap cascades everywhere.

> **Runtime colour sources:** `Avatar.tsx` AVATAR_COLORS and `ThemeSwitcher.tsx` PALETTES
> contain hardcoded hex strings (inline styles / JS constants). SASS variable changes do
> NOT reach these — they must be updated manually when the palette changes.

Both are synced in `ThemeSync` (inside `App.tsx`) and persisted in `localStorage`.

---

## State (Redux)

```ts
// uiSlice
{
  theme:   'light' | 'dark'
  palette: 'ocean' | 'forest' | 'sunset' | 'violet' | 'rose'
  toasts:  Toast[]   // { id, type, message, duration }
  navOpen: boolean
}

// dashboardSlice  (src/store/dashboardSlice.ts)
{
  filterUserId: number | null   // filter posts by author; resets page on change
  sortBy:       'id' | 'title' | 'userId'  // resets page on change
  compactView:  boolean
  activeTab:    number
  page:         number          // 0-indexed; PAGE_SIZE = 20 posts per page
}

// api (RTK Query — JSONPlaceholder)
getPosts()              → Post[]   // all 100 posts (no _limit)
getPost(id)             → Post
getUsers()              → User[]
createPost(NewPost)     → Post     // mutation with optimistic update middleware
```

Typed hooks: `useAppDispatch()`, `useAppSelector()` from `src/store/index.ts`.

---

## Form Demo (`/form-demo`)

4-step multi-step form with **React Hook Form + Zod v4** + per-step field validation.

| Step | Fields | Components used |
|---|---|---|
| 1 Personal | firstName, lastName, email, phone | Input (4×) |
| 2 Account | username, password (strength meter + show/hide), confirmPassword, role | Input (3×), Select |
| 3 Preferences | bio (live char count), website, theme, experience, notifications, newsletter | Textarea, Input, RadioGroup (2×), Switch (2×) |
| 4 Review | Read-only summary, Avatar, Badges | Avatar, Badge |

**Auto-fill button** on each of steps 1–3 populates all fields with valid seed data (`AUTOFILL` in `schema.ts`) so users can navigate through steps without typing.

Architecture:
- Single `useForm<FormData>` instance with `zodResolver(fullSchema)` (merged schema)
- `methods.trigger(STEP_FIELDS[step])` validates only current step's fields on Continue
- `FormProvider` passes context; each step uses `useFormContext()`
- Animated slide between steps (direction-aware `AnimatePresence`)
- Success screen with spring-bounce icon after a 1.4s mock submit delay

---

## Routing

| Path | Page |
|---|---|
| `/` | Home — component showcase |
| `/dashboard` | Dashboard — RTK Query live data |
| `/form-demo` | Multi-step form demo |
| `/docs` | Component documentation |

All routes wrapped in `<PageTransition>` (AnimatePresence fade-up).

---

## Animation conventions

- **Page transitions:** `AnimatePresence mode="wait"` + `motion.div` per route, 280ms material easing `[0.4, 0, 0.2, 1]`
- **Scroll entrance:** `whileInView` on `<Section>` components in Home, `once: true`, 60px margin
- **Hero stagger:** `staggerChildren: 0.07` on the home hero
- **Button:** `whileHover={{ scale: 1.02 }}` + `whileTap={{ scale: 0.96 }}` spring (`stiffness: 500, damping: 30`)
- **Card:** `whileHover={{ y: -4, boxShadow: ... }}` spring on hoverable/clickable cards
- **Easing arrays** must be typed as `[number, number, number, number]` tuples (Framer Motion TS requirement)

---

## Accessibility standards

Every component ships with:
- Proper ARIA roles (`role="dialog"`, `role="tooltip"`, `role="switch"`, `role="combobox"`, `role="listbox"`, `role="menu"`, `role="menuitem"`, `role="tab"`, `role="tabpanel"`, `role="tablist"`)
- `aria-*` attributes (`aria-expanded`, `aria-haspopup`, `aria-selected`, `aria-disabled`, `aria-invalid`, `aria-describedby`, `aria-label`, `aria-live`)
- Full keyboard navigation (Tab, Enter, Space, Escape, Arrow keys, Home, End)
- `:focus-visible` rings only (not `:focus`) via the `@include focus-visible-ring` mixin
- Loading states: `aria-busy`, `aria-disabled`
- Screen-reader-only text via `@include visually-hidden`

---

## Storybook

Storybook 10 is configured at `.storybook/`:

```
.storybook/
├── main.ts      # @storybook/react-vite framework, addon-a11y, viteFinal strips /UI-Forge/ base
└── preview.tsx  # Imports main.scss, Redux Provider decorator, Theme+Palette toolbar globals
```

- Stories live at `src/components/ComponentName/ComponentName.stories.tsx` (co-located)
- `tsconfig.app.json` excludes `*.stories.tsx` so `npm run build` stays clean
- The Storybook toolbar has **Theme** (light/dark) and **Palette** (5 options) buttons that set `data-theme` / `data-palette` on `<html>`, cascading the full CSS custom property system across every story

---

## What is NOT yet built (known gaps)

These are the remaining priorities, roughly in order:

1. **Expanded test coverage** — 61 tests exist across Button, Modal, Tabs, Select, Switch, Input. The remaining 15 components have no unit tests. Vitest + RTL per component (focus trap, keyboard nav, controlled state). Playwright E2E for critical paths.

2. **DataTable component** — A sortable, filterable table with pagination would strongly demonstrate data-handling capability on the Dashboard page.

3. **Accordion / Disclosure component** — Common pattern missing from the current set.

4. **Storybook deploy** — Build and publish Storybook to GitHub Pages or Chromatic so hiring engineers can browse stories without cloning.

5. **Chromatic visual regression** — Connect the Storybook to Chromatic so every PR screenshots all stories and flags visual diffs automatically.

---

## Development rules (enforce these in all new code)

1. **Zero hardcoded values** — all colours/spacing/radii in component files must reference SASS variables (`$space-*`, `$color-*`, `$radius-*` etc.) or CSS custom properties (`var(--palette-accent)` etc.).

2. **Design token CSS vars for theming** — anything that changes with theme or palette must use `var(--palette-*)` or `var(--text-*)` etc., never hardcoded hex.

3. **Every component ships with:** `.tsx` + `.module.scss` + `index.ts` barrel. Place in `src/components/ComponentName/`.

4. **Accessibility is non-negotiable** — ARIA roles, keyboard nav, and focus-visible rings on every interactive element.

5. **Framer Motion for all animations** — no CSS transitions on `transform` or `opacity` for interactive state changes; let Framer own those via `whileHover`/`whileTap`/`AnimatePresence`.

6. **No comments explaining what code does** — only add a comment when the *why* is non-obvious (hidden constraint, workaround, subtle invariant).

7. **Commit after each feature** — one commit per logical feature, with a descriptive multi-line message covering what changed and why.

8. **No Co-Authored-By: Claude** in commit messages.

9. **TypeScript strict** — `noUnusedLocals`, `noUnusedParameters` are on. Easing bezier arrays must be typed as `[number, number, number, number]` tuples for Framer Motion TS compatibility.

10. **Build must be clean** — `npm run build` (tsc -b && vite build) must complete with zero TypeScript errors before any commit.
