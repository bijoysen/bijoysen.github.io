# Bijay Sen - Portfolio

A personal portfolio website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It is configured as a **static export**, so it runs on both **GitHub Pages** and **Vercel** from the same codebase.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router, static export)
- React 18 + TypeScript
- Tailwind CSS 3
- Google Fonts via `next/font` (Caveat, Baloo 2, Poppins)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

This produces a fully static site in the `out/` folder.

## Editing content

All text and data live in one file: [`lib/data.ts`](lib/data.ts).
Update your name, tagline, services, skills, projects, experience, email, and social links there.

## Replacing assets

- `public/portrait.svg` - replace with your own photo (e.g. `portrait.jpg`) and update `profile.photo` in `lib/data.ts`.
- `public/cv.pdf` - replace with your real CV. The **Download CV** button links to this file.

## Deployment

### GitHub Pages (automatic)

This repo includes a workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push to the `main` branch.
2. In the repo, go to **Settings -> Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` builds and deploys automatically to `https://bijoysen.github.io`.

### Vercel

1. Go to [vercel.com](https://vercel.com) and import this GitHub repo.
2. Framework preset is auto-detected as **Next.js**. No extra configuration is needed.
3. Deploy.

## Project structure

```
app/            Layout, page, and global styles
components/     Navbar, Hero, About, Services, Projects, Experience, Contact, Footer
lib/data.ts     All editable content
public/         Static assets (portrait, cv, .nojekyll)
```
