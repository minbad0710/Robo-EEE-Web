# Team Robo@EEE — Website

Front-end for the Team Robo@EEE website (NTU School of Electrical and Electronic Engineering).
It currently contains the **homepage**, built from the team's Figma design.

## Getting started

Requires Node.js 20+ and Yarn.

```bash
yarn install     # install dependencies
yarn dev         # start the dev server (http://localhost:5173)
yarn build       # type-check + production build into dist/
yarn preview     # preview the production build
yarn lint        # run ESLint
```

## Tech stack

| Tool | Version | What it's used for |
|---|---|---|
| [Vite](https://vite.dev) | 8 | Dev server with hot reload, production bundler |
| [React](https://react.dev) | 19 | UI components |
| [TypeScript](https://www.typescriptlang.org) | 6 | Type safety (`.tsx` / `.ts` files) |
| [React Compiler](https://react.dev/learn/react-compiler) | 1 | Automatic memoization, via `@rolldown/plugin-babel` |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility classes for layout and spacing, via `@tailwindcss/vite` |
| [AOS](https://michalsnik.github.io/aos/) | 2 | Scroll-reveal animations |
| [ESLint](https://eslint.org) | 10 | Linting, with React Hooks and React Refresh rules |
| Google Fonts | — | Unbounded, Geist, Geist Mono (loaded in `index.html`) |

No router is installed yet — nav links point to `/about`, `/competitions`, etc., which don't exist yet.

## Project structure

```
Robo@EEE-web/
├── index.html              # HTML shell, Google Fonts, favicon
├── vite.config.ts          # Vite plugins: React, React Compiler, Tailwind
├── public/
│   └── logo.jpg            # favicon
└── src/
    ├── main.tsx            # React entry point
    ├── App.tsx             # Page layout + AOS setup
    ├── index.css           # Tailwind import + maps CSS tokens to Tailwind classes
    ├── styles/
    │   ├── theme.css       # Design tokens: colours, fonts, font sizes, layout sizes
    │   └── components.css  # Custom CSS classes too complex for inline Tailwind
    ├── data/
    │   └── site.ts         # Page text: nav links, contact links, benchmarks, platforms
    ├── assets/
    │   ├── logo.jpg
    │   └── hero-team.webp  # Hero photo (WebP, ~108 KB)
    └── components/
        ├── Header.tsx      # Sticky header, desktop nav, mobile hamburger menu
        ├── Hero.tsx        # Title, tagline, CTA buttons, team photo
        ├── Announcement.tsx
        ├── Benchmarks.tsx  # Competition results
        ├── Platforms.tsx   # Robot platform cards
        ├── Footer.tsx      # Page links, social icons, copyright
        └── SocialIcon.tsx  # Inline SVG icons (email, Instagram, LinkedIn)
```

## Styling conventions

### Where each kind of style lives

| What | Where | Example |
|---|---|---|
| Colours, fonts, font sizes | `src/styles/theme.css` (CSS variables) | `--color-primary: #00e5ff;` |
| Complex styles (hover states, animations, pseudo-selectors, media queries) | `src/styles/components.css` | `.btn`, `.menu-toggle`, `.hero-media` |
| Simple layout and spacing | Tailwind classes in the JSX | `flex items-center gap-[24px]` |

### Rules

- **Write spacing and sizes in pixels** with Tailwind's arbitrary values, so they match Figma directly:
  `h-[64px]`, `gap-[24px]`, `mt-[32px]`, `max-w-[520px]` — not `h-16`, `gap-6`.
- **Use the design tokens for colours and font sizes**, not hard-coded values:
  `text-ink`, `bg-footer`, `text-primary`, `text-h2`, `text-eyebrow`.
  To change a colour or size across the whole site, edit `theme.css` only.
- **Responsive design is mobile-first.** Unprefixed classes apply to every screen; prefixed classes apply from that width up:

  | Prefix | Min width |
  |---|---|
  | `sm:` | 640px |
  | `md:` | 768px |
  | `lg:` | 1024px |
  | `xl:` | 1280px |
  | `min-[1440px]:` | 1440px (custom) |

- **Use `.page-container`** on every section. It centres content at a max of 1280px with side gutters of 16px (mobile), 32px (≥768px) and 80px (≥1280px), matching the 1440px Figma frame.
- `components.css` is imported into Tailwind's `components` layer, so a Tailwind class on an element always overrides the shared class.

### How design tokens become Tailwind classes

1. Define the value in `theme.css`: `--color-ink: #111827;`
2. Map it in the `@theme inline` block of `index.css`: `--color-ink: var(--color-ink);`
3. Tailwind generates `text-ink`, `bg-ink`, `border-ink`, …

The same applies to fonts (`--font-display` → `font-display`) and font sizes (`--fs-h2` → `text-h2`).
Responsive font sizes are set with `@media` blocks at the bottom of `theme.css`.

### Colours

| Token | Value | Used for |
|---|---|---|
| `primary` | `#00e5ff` | Join Us button, footer hover, icons |
| `primary-dark` | `#0097a7` | Tagline, active nav link, accent labels |
| `ink` | `#111827` | Headings |
| `body` | `#4b5563` | Paragraph text |
| `muted` | `#6b7280` | Labels, captions |
| `line` | `#e5e7eb` | Borders, dividers |
| `footer` | `#0a0a0a` | Footer background |

### Fonts

| Token | Font | Used for |
|---|---|---|
| `font-display` | Unbounded | Headings (via `.display-heading`) |
| `font-body` | Geist | Body text (default on `<body>`) |
| `font-code` | Geist Mono | Small uppercase labels (via `.eyebrow`) |

## Responsive layout notes

- **Header:** full nav from 768px; below that, a hamburger button opens a dropdown menu (closes on link click or Esc).
- **Hero:** text and photo sit side by side from 1024px; below that the photo stacks under the text at full width in a 4:3 frame.
  The image column grows 420px → 480px → 520px at 1024 / 1280 / 1440px.
- **Hero title width:** "ROBO@EEE" is 7.09 × the font size wide in Unbounded 700 and cannot wrap. If you change the hero font size, weight or letter-spacing, make sure the text column stays at least `7.09 × font size + ~20px` (the extra covers the desktop scrollbar).
- **Footer:** centred and stacked below 1024px; split left/right in 3 columns from 1024px.

## Animations (AOS)

AOS is initialised once in `App.tsx`:

```ts
AOS.init({ duration: 700, easing: 'ease-out-cubic', once: false, offset: 80 })
```

- `once: false` replays the animation every time an element scrolls into view.
- Animations are disabled for users with "reduce motion" turned on in their OS.
- The footer has no animation, by design.

Add an animation to any element with data attributes:

```tsx
<div data-aos="fade-up" data-aos-delay="150" data-aos-duration="900">…</div>
```

Things to watch for:

- AOS sets `transform`, which overrides hover effects that also use `transform`. Put `data-aos` on a **wrapper** element instead (see the platform cards in `Platforms.tsx`).
- `<main>` has `overflow-x-clip` so slide-in animations don't cause horizontal scrolling. Don't change it to `overflow-hidden` — that breaks the sticky header.

## Editing content

Most page text lives in `src/data/site.ts`:

- `navLinks` — header and footer page links
- `contactLinks` — footer social icons (`icon`, `label` for the tooltip, `href`)
- `benchmarks` — competition results
- `platforms` — robot platform cards

To add a new social icon, add an entry to `contactLinks` and draw its SVG in `SocialIcon.tsx`.

## Images

- Prefer **WebP** for photos — the hero photo went from 1.53 MB (PNG) to 108 KB (WebP) with no visible loss.
- Photos inside `.hero-media` use `object-fit: cover`, so they fill the frame without stretching.

## To do

- Add a router and build the other pages (About, Competitions, Technology, Team, Join Us, News, Sponsors).
- Replace the LinkedIn placeholder link (`#`) in `site.ts`.
- Real destinations for **Join Us** and **Meet the Team**.
