# Bijay Sen — Portfolio

Personal portfolio site for **Bijay Sen**, Senior Frontend Developer. Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, exported as a fully static site for deployment on **GitHub Pages** or **Vercel**.

**Live site:** [https://bijoysen.github.io](https://bijoysen.github.io)

---

## Features

- **Single-page layout** with anchored sections: Home, About, Skills, Projects, Experience, and Contact
- **Content-driven** — all copy, links, and lists live in one data file (`lib/data.ts`)
- **Static export** — no server required; builds to the `out/` folder
- **Responsive design** — mobile-first layout with a collapsible navigation menu
- **Scroll-spy navbar** — highlights the active section while scrolling
- **SEO & discoverability** — Open Graph metadata, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`, and web app manifest
- **Accessible patterns** — keyboard support for the mobile menu, focus states, and semantic HTML
- **CI quality gate** — ESLint runs on every deploy via GitHub Actions

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, `output: "export"`) |
| UI | [React 19](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| Icons | [@hugeicons/react](https://hugeicons.com/) (skill categories) + inline SVGs (social, UI) |
| Fonts | Google Fonts via `next/font` — Poppins, Baloo 2, Caveat |
| Linting | ESLint 9 + `eslint-config-next` |

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ (CI uses Node 24)
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Production static export → `out/` |
| `npm run start` | Serve a production build (not used for static hosting) |
| `npm run lint` | Run ESLint |

---

## Editing content

All editable site content is centralized in [`lib/data.ts`](lib/data.ts).

| Export | Purpose |
|--------|---------|
| `profile` | Name, role, greeting, tagline, email, location, photo path, CV URL, about text, focus areas |
| `socials` | GitHub, LinkedIn, and other social links |
| `navLinks` | Navbar section links (`#home`, `#about`, etc.) |
| `skillCategories` | Skill groups with icon keys and technology tags |
| `projects` | Project cards (title, description, tags, live/repo URLs) |
| `experiences` | Work history with role, company, period, and bullet points |
| `services` | Service cards (used when the Services section is enabled) |

### Experience duration helpers

`profile.careerStart` drives auto-calculated experience in the Hero section:

- `getYearsOfExperience()` — years only
- `getExperienceDuration()` — years and months
- `formatExperienceDuration()` — human-readable string (e.g. `13 Years 1 Month`)

### Skill icons

Each skill category references an icon key (`code`, `layers`, `brush`, `wrench`, `rocket`, `plug`, `chart`, `spark`). Icons are rendered via Hugeicons in [`components/Icons.tsx`](components/Icons.tsx).

---

## Replacing assets

| File | Purpose |
|------|---------|
| `public/portrait.svg` | Profile photo in the Hero section |
| `public/cv.pdf` | CV download linked from the Hero **Download CV** button |

After replacing the portrait, update `profile.photo` in `lib/data.ts` if you change the filename or format (e.g. `/portrait.jpg`).

---

## Project structure

```
bijoysen.github.io/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata, JSON-LD
│   ├── page.tsx            # Home page — composes all sections
│   ├── globals.css         # Tailwind layers, design tokens, utility classes
│   ├── sitemap.ts          # /sitemap.xml
│   ├── robots.ts           # /robots.txt
│   ├── manifest.ts         # Web app manifest
│   └── not-found.tsx       # Custom 404 page
├── components/
│   ├── Navbar.tsx          # Sticky nav, mobile menu, scroll-spy
│   ├── Hero.tsx            # Intro, portrait, CTA, social links
│   ├── About.tsx           # Bio and focus areas
│   ├── Skills.tsx          # Skill category grid
│   ├── Projects.tsx        # Project cards
│   ├── Experience.tsx      # Work history timeline
│   ├── Contact.tsx         # Email and social links
│   ├── Footer.tsx          # Site footer
│   ├── Services.tsx        # Services grid (currently disabled on the page)
│   └── Icons.tsx           # SocialIcon, ServiceIcon, SkillIcon, UI SVGs
├── lib/
│   └── data.ts             # All site content and types
├── public/
│   ├── portrait.svg
│   └── cv.pdf
├── .github/workflows/
│   └── deploy.yml          # Lint, build, deploy to GitHub Pages
├── next.config.mjs         # Static export, unoptimized images, trailing slashes
├── tailwind.config.ts      # Colors, fonts, animations
├── tsconfig.json           # Path alias: @/* → project root
└── package.json
```

### Page section order

Defined in [`app/page.tsx`](app/page.tsx):

1. Hero (`#home`)
2. About (`#about`)
3. Skills (`#skills`)
4. Projects (`#projects`)
5. Experience (`#experience`)
6. Contact (`#contact`)

The **Services** section (`components/Services.tsx`) is kept in the codebase but not rendered. To re-enable it:

1. Import and add `<Services />` in `app/page.tsx`
2. Add a Services entry to `navLinks` in `lib/data.ts`

---

## Design system

Custom Tailwind tokens in [`tailwind.config.ts`](tailwind.config.ts):

| Token | Value | Usage |
|-------|-------|-------|
| `cream` | `#F6F3ED` | Page background |
| `teal` | `#1F5C56` | Primary accent, buttons |
| `navy` | `#14233F` | Body text |
| `amber` | `#E9A72C` | Highlights, display headings |

Shared component classes in `globals.css`: `.container-page`, `.btn-primary`, `.btn-outline`, `.section-title`, `.section-kicker`.

---

## Static export configuration

[`next.config.mjs`](next.config.mjs):

```js
output: "export"          // Generates static HTML in out/
images: { unoptimized: true }  // Required for static hosting without Next image server
trailingSlash: true         // URLs end with / (GitHub Pages friendly)
```

`npm run build` outputs the deployable site to **`out/`**.

---

## Deployment

### GitHub Pages (automatic)

Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

On every push to `main` (or manual trigger):

1. Install dependencies (`npm ci`)
2. Run ESLint (`npm run lint`)
3. Build static export (`npm run build`)
4. Upload `out/` and deploy to GitHub Pages

**One-time setup:**

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set **Source** to **GitHub Actions**

The site publishes to `https://bijoysen.github.io`.

### Vercel

1. Import the GitHub repo at [vercel.com](https://vercel.com)
2. Framework preset: **Next.js** (auto-detected)
3. Deploy — no extra configuration needed

---

## SEO

| File | Output |
|------|--------|
| `app/layout.tsx` | Page title, description, Open Graph tags, `Person` JSON-LD |
| `app/sitemap.ts` | `/sitemap.xml` |
| `app/robots.ts` | `/robots.txt` with sitemap reference |
| `app/manifest.ts` | `/manifest.webmanifest` |

Update the canonical URL (`https://bijoysen.github.io`) in `layout.tsx`, `sitemap.ts`, and `robots.ts` if you deploy to a different domain.

---

## License

Private project (`"private": true` in `package.json`). All rights reserved unless otherwise noted.
