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

The Team page loads its members from the backend API (`../backend`), so start that too (`cd ../backend && yarn dev`). See "Team members" below.

## Tech stack

| Tool | Version | What it's used for |
|---|---|---|
| [Vite](https://vite.dev) | 8 | Dev server with hot reload, production bundler |
| [React](https://react.dev) | 19 | UI components |
| [TypeScript](https://www.typescriptlang.org) | 6 | Type safety (`.tsx` / `.ts` files) |
| [React Compiler](https://react.dev/learn/react-compiler) | 1 | Automatic memoization, via `@rolldown/plugin-babel` |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility classes for layout and spacing, via `@tailwindcss/vite` |
| [AOS](https://michalsnik.github.io/aos/) | 2 | Scroll-reveal animations (see "Animations") |
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
    ├── index.css           # Tailwind import + maps CSS tokens to Tailwind classes, AOS "reduce motion" fix
    ├── styles/
    │   ├── theme.css       # Design tokens: colours, fonts, font sizes, layout sizes
    │   └── components.css  # Custom CSS classes too complex for inline Tailwind
    ├── data/
    │   ├── site.ts         # All page text (see "Editing content")
    │   ├── teamMembers.ts  # Loads the Team page's people from the backend (see "Team members")
    │   └── searchIndex.ts  # What each page can be found by in the header search
    ├── utils/
    │   ├── assets.ts       # byFileName() — look up a glob-imported image by its file name
    │   ├── api.ts          # getJson() — GET request to the backend API
    │   └── cloudinary.ts   # facePhoto() — face-centred crop of a Cloudinary photo
    ├── pages/              # One file per route; each just stacks that page's sections
    │   ├── HomePage.tsx · AboutPage.tsx · CompetitionsPage.tsx · TechnologyPage.tsx
    │   ├── TeamPage.tsx · SponsorsPage.tsx · JoinPage.tsx · NewsPage.tsx
    │   └── CompetitionEventPage.tsx  # One page per competition in the header dropdown ("coming soon" for now)
    ├── components/
    │   ├── Header.tsx      # Shared by every page
    │   ├── SearchBox.tsx   # Header search with page suggestions
    │   ├── Footer.tsx
    │   ├── PageHero.tsx    # Eyebrow + title (+ description) block at the top of inner pages
    │   ├── SocialIcon.tsx  # Inline SVG icons (email, Instagram, LinkedIn, GitHub, website)
    │   ├── home/           # Hero, Announcement, Benchmarks, Platforms
    │   ├── about/          # Origin
    │   ├── competitions/   # Track (one competition track), Milestones
    │   ├── technology/     # Deployments, Gallery
    │   ├── team/           # Advisors, Members (year list + department tabs + member cards)
    │   ├── sponsors/       # CorePartners, SponsorWall, PartnerCta
    │   ├── join/           # ApplyCta, Faq
    │   └── news/           # NewsGrid
    └── assets/
        ├── logo.jpg        # Full logo (footer, favicon)
        ├── logo-mark.webp  # Logo artwork cropped from its black square — used on the black header
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
- **Sections alternate white / light grey** (`section-alt`) so each one reads as its own block. This happens automatically for every `<section>` a page puts directly inside `<main>` (the rule is at the top of `components.css`), so:
  - give every section its own top **and** bottom padding (e.g. `py-[64px] md:py-[96px]`), not just top padding that relies on the next section;
  - `<main>` has `overflow-x-clip` to trim the grey where it runs past the screen edges. Don't change it to `overflow-hidden`, which breaks the sticky header;
  - a section that is only sometimes shown flips the colours of the sections after it, so keep it in place while its data loads (see `Advisors.tsx`);
  - to keep a section white and out of the count, so it reads as part of the section above, give it `className="section-plain"` (Technology's Robot Deployments, which follows straight on from the page title).
- `components.css` is imported into Tailwind's `components` layer, so a Tailwind class on an element always overrides the shared class.

### How design tokens become Tailwind classes

1. Define the value in `theme.css`: `--color-ink: #111827;`
2. Map it in the `@theme inline` block of `index.css`: `--color-ink: var(--color-ink);`
3. Tailwind generates `text-ink`, `bg-ink`, `border-ink`, …

The same applies to fonts (`--font-display` → `font-display`) and font sizes (`--fs-h2` → `text-h2`).
Responsive font sizes are set with `@media` blocks at the bottom of `theme.css`.

### Colours

The palette is taken from the logo: **cyan** artwork with **silver** shading on **black**. All values live in `theme.css`.

| Token | Value | Used for |
|---|---|---|
| `logo-cyan` / `primary` | `#00f5ff` | Bright accents: footer hover, glows, focus rings, text selection; cyan text on black buttons |
| `logo-black` / `footer` | `#000000` | Main buttons (with cyan text), selected Team tab, footer background |
| `logo-silver` / `line-strong` | `#a8a8a8` | Borders that need to stand out (Team department tabs) |
| `primary-dark` | `#007f86` | Logo cyan darkened for text on white (4.8:1 contrast): tagline, active nav link, accent labels |
| `primary-soft` | `#e6feff` | Light cyan tint backgrounds |
| `header`, `header-*` | `#000000` + dark greys | The black header (same black as the logo, so the logo artwork sits straight on it) and its dropdown, search box and mobile menu |
| `ink` | `#0a0a0a` | Headings |
| `body` | `#474747` | Paragraph text |
| `muted` | `#6b6b6b` | Labels, captions |
| `line` | `#e5e5e5` | Borders, dividers |
| `section-alt` | `#f5f5f5` | Background of every other page section |

Pure logo cyan is unreadable as text on white, so text accents use `primary-dark`; use `primary`/`logo-cyan` on black or as a highlight only.

### Fonts

| Token | Font | Used for |
|---|---|---|
| `font-display` | Unbounded | Headings (via `.display-heading`) |
| `font-body` | Geist | Body text (default on `<body>`) |
| `font-code` | Geist Mono | Small uppercase labels (via `.eyebrow`) |

## Responsive layout notes

- **Header:** black, with the cropped logo artwork (`logo-mark.webp`) at 56px tall (44px on phones). Full nav (8 links) + search from 1024px; from 640px the search sits next to the hamburger button. On these sizes the search is a magnifier icon that opens into the box on hover, click/tap or keyboard focus (its full width is reserved, so the links don't move). On phones a full search box is at the top of the hamburger menu (menu closes on link click or Esc).
- **Hero:** text and photo sit side by side from 1024px; below that the photo stacks under the text at full width in a 4:3 frame.
  The image column grows 420px → 480px → 520px at 1024 / 1280 / 1440px.
- **Hero title width:** "ROBO@EEE" is 7.09 × the font size wide in Unbounded 700 and cannot wrap. If you change the hero font size, weight or letter-spacing, make sure the text column stays at least `7.09 × font size + ~20px` (the extra covers the desktop scrollbar).
- **Footer:** centred and stacked below 1024px; split left/right in 3 columns from 1024px.

## Animations

Scroll-reveal animations use [AOS](https://michalsnik.github.io/aos/), set up in `App.tsx`: 900ms with `ease-out-cubic`, each element playing **once**, the first time it scrolls into view. They are off for visitors with "reduce motion" turned on.

Keep it balanced: **animate the visual blocks, not the text.**

- Cards fade up one by one: `data-aos="fade-up"` with a small stagger, e.g. `data-aos-delay={index * 150}` (or `(index % 3) * 100` in 3-column grids, so each row starts again).
- Photos beside text slide in from their side: `fade-left` / `fade-right` (home hero photo, About info card, Technology deployment photos).
- Big standalone photos fade up (Competitions track photos, Prototype Gallery).
- Headings, paragraphs, page titles, the call-to-action sections, the announcement, the FAQ list, milestone rows, the Team members panel, the header and the footer don't animate.

```tsx
{items.map((item, index) => (
  <article key={item.id} className="team-card" data-aos="fade-up" data-aos-delay={index * 150}>…</article>
))}
```

Things to watch for:

- Don't put `data-aos` on a page's `<section>` itself: its grey background would fade in with it.
- AOS sets `transform`, which overrides hover effects that also use `transform`. For cards with a hover lift, put `data-aos` on a **wrapper** around the card (see the cards in `Platforms.tsx`, `NewsGrid.tsx`, `SponsorWall.tsx`).
- Cards loaded later (the Team page advisors from the API) still animate, because AOS watches for new elements. For "reduce motion" visitors, a rule in `index.css` makes sure they show.

## Editing content

Most page text lives in `src/data/site.ts`:

- `navLinks` — header page links (`children` = a hover dropdown under the link); `footerLinks` — the first four, shown in the footer
- `competitionEvents` — the header's Competitions dropdown: `name`, `href` (its page URL, a route is created automatically) and `comingSoon` (shows a placeholder page until the page is written)
- Header search: page descriptions and extra keywords live in `src/data/searchIndex.ts`. Every page linked from the header is searchable, dropdown pages included (e.g. each competition), so new pages are found automatically once they're in `navLinks`; in development, the browser console warns about any page that isn't. If the query matches a page name, only page names are shown ("home" → Home, "i" → ICRA BARN 2026/2027). Otherwise, with 3+ letters, content keywords are searched (robots, news titles, … are pulled from `site.ts` automatically; member names aren't, since they come from the backend). Matching is by word start, so "ace" doesn't match "placements"
- `contactLinks` — footer social icons (`icon`, `label` for the tooltip, `href`)
- `benchmarks` — competition results
- `platforms` — robot platform cards (Home) and robot deployments (Technology, incl. `label` and `specs`)
- `teamDepartments` — Team page department tabs (Leads, Software, Hardware, …): name + one-line description, in tab order. The people are in the database (see "Team members")
- `applyUrl`, `faqs` — Join Us page
- `newsPosts` — News page, newest first (photos: `post-N` by position); optional `href` for Read More (defaults to Instagram)
- `corePartners` (the "Collaborations" cards; logos: `partner-N` by position, `mark` shows if there's no logo), `sponsors` (logos: `sponsor-N` by position; optional `href` makes the card a link), `sponsorshipEmail` — Sponsors page
- `barnResults`, `robocupFocus` — results row under each Competitions track (`highlight: true` colours a value teal)
- `milestones` — Competitions roadmap

To add a new social icon, add an entry to `contactLinks` and draw its SVG in `SocialIcon.tsx`.

## Team members

The Team page's advisors and members come from the backend (`GET /api/team-members`, MongoDB), with photos on Cloudinary. They are added and edited through the backend, not in this project: see `../backend/README.md`. The current roster is in `../backend/seed/teamMembers.data.js`.

- Each person has one entry per department per academic year. Department leads have one in `leads` and one in their own department. Advisors use the department `advisors` and appear in the Advisors section, not in a tab.
- The year list is built from the years in the data, newest first, so adding `AY27/28` members adds that year automatically.
- No photo → default avatar. The GitHub, LinkedIn and website icons only show for the links a person has (`MemberLinks.tsx`).
- Photos are cropped around the face by Cloudinary (`facePhoto()` in `utils/cloudinary.ts`), so any photo shape works.
- The API address is `http://localhost:5000/api` in development. **For the deployed site, set `VITE_API_URL`** (e.g. in Vercel → Settings → Environment Variables) to the deployed backend's URL. Without it, the deployed Team page shows "The member list couldn't be loaded". The backend's `CLIENT_ORIGIN` must also include the site's URL.

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
| `team/` | `default-avatar.svg` | Member and advisor cards without a photo (real photos are on Cloudinary, see "Team members") |
| `news/` | `post-1.webp` … `post-6.webp` | News cards in reading order, same order as `newsPosts` in `site.ts` |
| `sponsors/` | `sponsor-1.webp`, `sponsor-2.webp`, … | Sponsor logos in card order, same order as `sponsors` in `site.ts` (real logos, not demo) |
| | `partner-1.webp`, `partner-2.webp`, … | Collaboration logos (MLDA@EEE, Garage@EEE) in card order, same order as `corePartners` in `site.ts`; shown square, so use square images |

- For news posts, sponsors and collaborations, the image is picked by the card's position, so **if you reorder or add entries in `site.ts`, rename the images to match**. For example, a 7th news post needs `post-7.webp`.
- Prefer **WebP** for photos. The hero photo went from 1.53 MB (PNG) to 108 KB (WebP) with no visible loss.
- Photos fill their frame with `object-fit: cover`, so any aspect ratio works. The edges may be cropped.

## To do

- Article pages (or real links) for each News post's **Read More**.
- Replace `applyUrl` (currently an email) with the real application form link.
- A sponsorship deck PDF for the Sponsors page.
