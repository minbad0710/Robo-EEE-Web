# Team Robo@EEE — Website

Front-end for the Team Robo@EEE website (NTU School of Electrical and Electronic Engineering).
It contains all eight pages — **Home**, **About**, **Competitions**, **Technology**, **Team**, **Sponsors**, **Join Us** and **News** — built from the team's Figma design.

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

There is no router library. `App.tsx` keeps a small `routes` map (path → page component + tab title) and picks the page from `window.location.pathname` on load; nav links are plain `<a href>`, so each click is a full page load. Unknown paths fall back to Home.

To add a page: create `src/pages/XxxPage.tsx` and add an entry to `routes` in `App.tsx`.

> When deploying, the host must serve `index.html` for every path (SPA fallback), otherwise `/about` returns 404. The Vite dev and preview servers already do this.

## Project structure

```
Robo@EEE-web/
├── index.html              # HTML shell, Google Fonts, favicon
├── vite.config.ts          # Vite plugins: React, React Compiler, Tailwind
├── public/
│   └── logo.jpg            # favicon
└── src/
    ├── main.tsx            # React entry point
    ├── App.tsx             # Routes, shared layout (header/footer), AOS setup
    ├── index.css           # Tailwind import + maps CSS tokens to Tailwind classes
    ├── styles/
    │   ├── theme.css       # Design tokens: colours, fonts, font sizes, layout sizes
    │   └── components.css  # Custom CSS classes too complex for inline Tailwind
    ├── data/
    │   └── site.ts         # All page text (see "Editing content")
    ├── utils/
    │   └── assets.ts       # byFileName() — look up a glob-imported image by its file name
    ├── pages/              # One file per route; each just stacks that page's sections
    │   ├── HomePage.tsx · AboutPage.tsx · CompetitionsPage.tsx · TechnologyPage.tsx
    │   └── TeamPage.tsx · SponsorsPage.tsx · JoinPage.tsx · NewsPage.tsx
    ├── components/
    │   ├── Header.tsx      # Shared by every page
    │   ├── Footer.tsx
    │   ├── PageHero.tsx    # Eyebrow + title (+ description) block at the top of inner pages
    │   ├── SocialIcon.tsx  # Inline SVG icons (email, Instagram, LinkedIn)
    │   ├── home/           # Hero, Announcement, Benchmarks, Platforms
    │   ├── about/          # Origin, Pillars
    │   ├── competitions/   # Track (one competition track), Milestones
    │   ├── technology/     # Deployments, TwoTrack, Autonomy, Gallery
    │   ├── team/           # Advisors, Members, teamPhotos.ts
    │   ├── sponsors/       # CorePartners, SponsorWall, PartnerCta
    │   ├── join/           # RecruitmentBanner, SelectionSteps, ApplyCta
    │   └── news/           # NewsGrid
    └── assets/
        ├── logo.jpg        # Shared (header + footer)
        └── <page>/         # Demo images, one folder per page, named by position (see "Images")
```

Rule of thumb: a component used by **one** page goes in that page's folder; a component used by **several** pages stays directly in `components/`.

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

- **Header:** full nav (8 links) from 1024px; below that, a hamburger button opens a dropdown menu (closes on link click or Esc).
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

- `navLinks` — header page links; `footerLinks` — the first four, shown in the footer
- `contactLinks` — footer social icons (`icon`, `label` for the tooltip, `href`)
- `benchmarks` — competition results
- `platforms` — robot platform cards (Home) and robot deployments (Technology, incl. `label` and `specs`)
- `advisors`, `members` — Team page (photos: `advisor-N` / `member-N` by position)
- `recruitment` (set `open: false` to show the closed banner), `applyUrl`, `selectionSteps` — Join Us page
- `newsPosts` — News page, newest first (photos: `post-N` by position); optional `href` for Read More (defaults to Instagram)
- `corePartners`, `sponsors`, `sponsorshipEmail` — Sponsors page
- `autonomyLayers`, `techStack` — Technology page software stack
- `pillars` — About page Three Pillars
- `barnResults`, `robocupFocus` — results row under each Competitions track (`highlight: true` colours a value teal)
- `milestones` — Competitions roadmap

To add a new social icon, add an entry to `contactLinks` and draw its SVG in `SocialIcon.tsx`.

## Images

All photos are **demo images** for now. Each page has its own folder in `src/assets/`, and every file is named after **where it appears**. To change a picture, replace the file with one of the same name. No code changes are needed.

| Folder | File | Where it appears |
|---|---|---|
| `home/` | `hero.webp` | Hero photo, right of the title |
| `competitions/` | `track-1-left.webp` | Track 01 (BARN), large photo on the left |
| | `track-1-right-top.webp` | Track 01, small photo top right |
| | `track-1-right-bottom.webp` | Track 01, small photo bottom right |
| | `track-2-banner.webp` | Track 02 (RoboCup@Home), full-width photo |
| `technology/` | `deployment-1.webp` … `deployment-3.webp` | Robot Deployments rows, top to bottom (Jackal, Galaxea R1, In-House) |
| | `gallery-banner.webp` | Prototype Gallery, wide image |
| | `gallery-1.webp` … `gallery-3.webp` | Prototype Gallery, small images left to right |
| `team/` | `advisor-1.webp`, `advisor-2.webp` | Faculty advisor cards, left to right |
| | `member-1.webp` … `member-8.webp` | Member cards in reading order, same order as `members` in `site.ts` |
| `news/` | `post-1.webp` … `post-6.webp` | News cards in reading order, same order as `newsPosts` in `site.ts` |

- On the Team and News pages, the photo is picked by the card's position, so **if you reorder or add people/posts in `site.ts`, rename the photos to match**. For example, a 9th member needs `member-9.webp`.
- Prefer **WebP** for photos. The hero photo went from 1.53 MB (PNG) to 108 KB (WebP) with no visible loss.
- Photos fill their frame with `object-fit: cover`, so any aspect ratio works. The edges may be cropped.

## To do

- Article pages (or real links) for each News post's **Read More**.
- Replace `applyUrl` (currently an email) with the real application form link.
- Real sponsor logos and a sponsorship deck PDF for the Sponsors page.
