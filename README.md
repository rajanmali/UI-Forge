# UIForge

A production-quality React component library and live demo app built to showcase agency-level front-end engineering. 21 fully accessible components, a dual-layer CSS custom property theming system, Storybook integration, and four interactive demo pages — all in one coherent codebase.

**Live demo:** [rajanmali.github.io/UI-Forge](https://rajanmali.github.io/UI-Forge/)

---

## Tech stack

| Layer | Technology | Version |
|---|---|---|
| UI | React | 19 |
| Language | TypeScript | 6 |
| Bundler | Vite | 8 |
| Styling | SASS (7-1 architecture) | 1.100 |
| State | Redux Toolkit + RTK Query | 2.12 |
| Routing | React Router | 7 |
| Animation | Framer Motion | 12 |
| Forms | React Hook Form + Zod | 7 / 4 |
| Stories | Storybook | 10 |
| Tests | Vitest + React Testing Library | — |

---

## Getting started

```bash
git clone git@github.com:rajanmali/UI-Forge.git
cd UI-Forge
npm install
npm run dev        # app  →  http://localhost:5173
npm run storybook  # docs →  http://localhost:6006
```

### All scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Serve the production build locally |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build-storybook` | Build a static Storybook |
| `npm run test` | Run Vitest unit tests |
| `npm run test:watch` | Vitest in watch mode |
| `npm run coverage` | Generate test coverage report |
| `npm run lint` | ESLint check |

---

## Components

21 components, each shipping as `ComponentName.tsx` + `ComponentName.module.scss` + `index.ts`.

| Component | Description |
|---|---|
| **Avatar** | Initials with deterministic colour, image fallback, 5 sizes, 4 status dots |
| **Badge** | 7 semantic variants, dot indicator, 3 sizes |
| **Button** | 4 variants, 3 sizes, loading state with spinner, left/right icon slots |
| **Card** | Elevated / outlined / filled, hoverable Framer lift, header + footer slots |
| **Checkbox** | Custom styled, indeterminate state, 3 sizes, error + helper text |
| **DropdownMenu** | Portal, sections + groups, keyboard nav, danger + disabled items |
| **Input** | Label, helper/error text, left + right icon slots, 3 sizes |
| **Modal** | Portal, focus trap, ESC-close, scroll lock, slide-up animation |
| **Navbar** | Sticky, dark mode toggle, palette switcher, hamburger menu, Redux-connected |
| **Popover** | Portal, 8 placement options, viewport clamping, click-outside + ESC |
| **Radio / RadioGroup** | Vertical + horizontal orientation, per-option helper text, error state |
| **Select** | Custom combobox, option groups, full keyboard navigation |
| **Spinner** | SVG arc, 4 sizes, 3 colour modes |
| **Switch** | Animated thumb, 3 sizes, left/right label position, `role="switch"` |
| **Tabs** | Line + pill variants, arrow-key keyboard nav, full ARIA roles |
| **Textarea** | Label, helper/error text, configurable resize |
| **ThemeSwitcher** | 5 palettes, animated dropdown, persisted to localStorage |
| **Toast** | Redux-driven queue, 4 types, auto-dismiss, fixed-position portal |
| **Tooltip** | 4 placements, configurable delay, Framer Motion enter/exit |
| **PageTransition** | `AnimatePresence` fade-up wrapper for route changes |
| **PageLoader** | Fullscreen skeleton shown during lazy-loaded route chunks |

---

## Pages

| Route | Description |
|---|---|
| `/` | Component showcase — every component with all variants |
| `/dashboard` | Live data via RTK Query (JSONPlaceholder) — stat cards, posts, users |
| `/form-demo` | 4-step multi-step form — React Hook Form + Zod v4, per-step validation, auto-fill |
| `/docs` | Component documentation — prop tables, live examples, a11y notes |
| `/changelog` | Release history with tagged change entries |

---

## Theming

Two independent layers of CSS custom properties let you mix light/dark with any brand palette.

**Light / dark mode** — toggled via `data-theme` on `<html>`, persisted in localStorage:

```
--bg-primary  --bg-secondary  --text-primary  --text-secondary
--surface     --border        --border-strong
```

**Brand palette** — toggled via `data-palette` on `<html>`:

| `ocean` | `forest` | `sunset` | `violet` | `rose` |
|---|---|---|---|---|
| blue (default) | green | amber | purple | pink |

```
--palette-accent  --palette-primary  --palette-accent-light
--palette-shadow-primary  --palette-focus
```

Every interactive component reads `var(--palette-*)` tokens — one palette swap cascades everywhere instantly.

---

## Storybook

```bash
npm run storybook   # → http://localhost:6006
```

Every component has a dedicated story file covering all prop variants, sizes, and states. The Storybook toolbar includes **Theme** and **Palette** switchers so you can test any component across all 10 theme/palette combinations without touching code. The `@storybook/addon-a11y` panel runs an axe-core accessibility audit on every story.

---

## Design tokens

Single source of truth: `src/styles/abstracts/_variables.scss`

All component files reference SASS variables or CSS custom properties — zero hardcoded colour or spacing values anywhere in the codebase.

```scss
$color-primary-600: #1B3A6B   // Primary navy
$color-accent-500:  #2563EB   // Accent blue

$space-1:  0.25rem   // 4px
$space-4:  1rem      // 16px
$space-8:  2rem      // 32px

$radius-sm:  0.25rem
$radius-md:  0.5rem
$radius-lg:  0.75rem
```

---

## Project structure

```
src/
├── App.tsx                  # Provider → BrowserRouter → AppShell → Routes
├── store/                   # configureStore, uiSlice, RTK Query api
├── styles/                  # SASS 7-1: abstracts, themes, base, layout
├── components/              # 21 components — .tsx + .module.scss + index.ts
└── pages/                   # Home, Dashboard, FormDemo, Docs, Changelog

.storybook/
├── main.ts                  # Framework, addons, viteFinal base override
└── preview.tsx              # Global SASS, Redux decorator, Theme/Palette toolbar
```

---

## Accessibility

Every component ships with:

- Semantic ARIA roles (`dialog`, `switch`, `combobox`, `listbox`, `menu`, `tab`, `tooltip`, …)
- Full keyboard navigation (Tab, Enter, Space, Escape, Arrow keys, Home, End)
- `aria-*` state attributes (`expanded`, `selected`, `invalid`, `busy`, `disabled`, …)
- `:focus-visible` rings — never `:focus` — via the `focus-visible-ring` SASS mixin
- Screen-reader-only text via the `visually-hidden` SASS mixin

---

## License

MIT
