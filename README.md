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
- **Validated contact form** — Name / Email / Phone / Message fields with real-time client-side validation and inline error messages (empty fields, name format, email format, phone format, minimum lengths)
- **Serverless contact backend** — form submissions are logged to a Google Sheet and emailed as a branded HTML notification via a free Google Apps Script Web App (see [Contact form setup](#contact-form-setup-google-apps-script))
- **Anti-spam protection** — honeypot field, submission time-trap, and per-email rate limiting guard the contact form without any paid service
- **SEO & discoverability** — Open Graph metadata, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`, and web app manifest
- **Accessible patterns** — keyboard support for the mobile menu, focus states, semantic HTML, and `aria-invalid`/`aria-describedby` wiring on form errors
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
| `contact` | Contact section copy, availability, timezone, privacy note, and the Apps Script form endpoint |

### Experience duration helpers

`profile.careerStart` drives auto-calculated experience in the Hero section:

- `getYearsOfExperience()` — years only
- `getExperienceDuration()` — years and months
- `formatExperienceDuration()` — human-readable string (e.g. `13 Years 1 Month`)

### Skill icons

Each skill category references an icon key (`code`, `layers`, `brush`, `wrench`, `rocket`, `plug`, `chart`, `spark`). Icons are rendered via Hugeicons in [`components/Icons.tsx`](components/Icons.tsx).

---

## Contact form setup (Google Apps Script)

The Contact section includes a real Name / Email / Phone / Message form ([`components/ContactForm.tsx`](components/ContactForm.tsx)). Since this site is a static export with no server, the form posts directly from the browser to a free **Google Apps Script Web App** that you deploy on your own Google account. Every submission is both **emailed to your inbox** (as a branded HTML notification) and **appended as a row in a Google Sheet** — no third-party service, no monthly fee.

**Client-side validation:**

| Field | Rules |
|-------|-------|
| Name | Required, min 2 characters, must contain a letter (rejects numbers/symbols-only input), letters/spaces/apostrophes/hyphens only |
| Email | Required, must match a valid email format |
| Phone | Optional; if provided, must match a valid phone number format |
| Message | Required, min 10 characters |

Errors are shown inline per field (on blur, and live as you type) with `aria-invalid`/`aria-describedby` wiring for screen readers. Submission is blocked and focus jumps to the first invalid field until all errors are resolved.

**Anti-spam layers:**

- **Honeypot** — a hidden `_honeypot` field that real users never see or fill; bots that auto-fill every field get silently dropped.
- **Time-trap** — the form records when it loaded (`_ts`) and the script rejects (silently) any submission completed in under 3 seconds, since no human fills a form that fast.
- **Rate limiting** — the script uses `CacheService` to block a second submission from the same email address within 60 seconds, guarding against accidental double-submits and basic flooding.

**Branded HTML email:** notifications use an inline-styled HTML template matching the site's teal/amber palette (`BSen.` wordmark, submission details, and a "Reply to [Name]" button) with a plain-text fallback for clients that don't render HTML. The button is a `mailto:` link with a pre-filled subject and greeting so it opens as a ready-to-send reply — it cannot thread into the original conversation or trigger the email client's native Reply action, since HTML emails can't run scripts or call into client-side APIs.

### 1. Create the Google Sheet

Create a new Google Sheet (e.g. "Portfolio Contact Submissions") with this header row:

```
Date | Time | Name | Email | Phone | Message
```

### 2. Add the Apps Script

In the Sheet, go to **Extensions → Apps Script**, delete the placeholder code, and paste:

```js
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const data = e.parameter;

    // Honeypot: if filled, silently drop the submission.
    if (data._honeypot) {
      return respond({ status: "ok" });
    }

    // Time-trap: real humans take at least a few seconds to fill the form;
    // bots that submit instantly are silently dropped.
    const MIN_FILL_TIME_MS = 3000;
    const elapsed = Date.now() - Number(data._ts || 0);
    if (!data._ts || elapsed < MIN_FILL_TIME_MS) {
      return respond({ status: "ok" });
    }

    if (!data.name || !data.email || !data.message) {
      return respond({ status: "error", message: "Missing required fields." });
    }

    // Rate limit: block a second submission from the same email within 60s.
    const cache = CacheService.getScriptCache();
    const cacheKey = "submitted_" + data.email.toLowerCase();
    if (cache.get(cacheKey)) {
      return respond({
        status: "error",
        message: "You've already submitted recently. Please wait a minute and try again.",
      });
    }
    cache.put(cacheKey, "1", 60);

    const now = new Date();
    const tz = Session.getScriptTimeZone();
    const dateStr = Utilities.formatDate(now, tz, "dd MMM yyyy");
    const timeStr = Utilities.formatDate(now, tz, "hh:mm a");

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      dateStr,
      timeStr,
      data.name,
      data.email,
      data.phone || "",
      data.message,
    ]);

    MailApp.sendEmail({
      to: "bijoysen2012@gmail.com",
      replyTo: data.email,
      subject: `New portfolio contact from ${data.name}`,
      body: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "N/A"}\n\nMessage:\n${data.message}`,
      htmlBody: buildEmailHtml(data),
    });

    return respond({ status: "ok" });
  } catch (err) {
    return respond({ status: "error", message: err.message });
  } finally {
    lock.releaseLock();
  }
}

function buildEmailHtml(data) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone || "N/A");
  const message = escapeHtml(data.message).replace(/\n/g, "<br>");

  // Pre-fill subject/body so the mailto: link opens as a ready-to-send
  // reply instead of a blank email (it still can't thread into the
  // original conversation — that's a native, client-only feature).
  const replySubject = encodeURIComponent("Re: Your message to Bijay Sen");
  const replyBody = encodeURIComponent(
    `Hi ${data.name},\n\nThanks for reaching out! `
  );
  const replyHref = `mailto:${data.email}?subject=${replySubject}&amp;body=${replyBody}`;

  return `
    <div style="background:#F6F3ED; padding:32px 16px; font-family:Arial, Helvetica, sans-serif;">
      <div style="max-width:800px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.06);">
        <div style="background:#1F5C56; padding:28px 36px; text-align:center;">
          <p style="margin:0 0 14px; font-family:Arial, Helvetica, sans-serif; font-size:22px; font-weight:800; letter-spacing:-0.3px;">
            <span style="color:#E9A72C;">B</span><span style="color:#ffffff;">Sen.</span>
          </p>
          <p style="margin:0; color:#E9A72C; font-size:12px; font-weight:bold; letter-spacing:0.5px; text-transform:uppercase;">Portfolio Contact Form</p>
          <h1 style="margin:6px 0 0; color:#ffffff; font-size:19px;">New message from ${name}</h1>
        </div>
        <div style="padding:28px 36px;">
          <table style="width:100%; border-collapse:collapse; font-size:14px; color:#14233F;">
            <tr>
              <td style="padding:6px 0; font-weight:bold; width:80px; vertical-align:top;">Name</td>
              <td style="padding:6px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:bold; vertical-align:top;">Email</td>
              <td style="padding:6px 0;"><a href="mailto:${email}" style="color:#1F5C56; text-decoration:none; font-weight:bold;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:6px 0; font-weight:bold; vertical-align:top;">Phone</td>
              <td style="padding:6px 0;">${phone}</td>
            </tr>
          </table>
          <div style="margin-top:18px; padding-top:18px; border-top:1px solid #eee;">
            <p style="margin:0 0 8px; font-weight:bold; color:#14233F; font-size:14px;">Message</p>
            <p style="margin:0; color:#333333; font-size:14px; line-height:1.6;">${message}</p>
          </div>
          <div style="margin-top:22px; text-align:center;">
            <a href="${replyHref}" style="display:inline-block; background:#E9A72C; color:#14233F; text-decoration:none; font-weight:bold; font-size:14px; padding:10px 24px; border-radius:8px;">
              Reply to ${name}
            </a>
          </div>
        </div>
      </div>
      <p style="max-width:800px; margin:16px auto 0; text-align:center; color:#999999; font-size:12px;">
        Sent automatically from your portfolio contact form.
      </p>
    </div>
  `;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Save the project (any name is fine).

### 3. Deploy as a Web App

1. Click **Deploy → New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy** and authorize the requested permissions (it needs to write to your Sheet and send email as you)
6. Copy the deployment URL — it looks like `https://script.google.com/macros/s/XXXXXXXXXXXX/exec`

### 4. Connect it to the site

Paste the URL into `contact.formEndpoint` in [`lib/data.ts`](lib/data.ts):

```ts
export const contact = {
  // ...
  formEndpoint: "https://script.google.com/macros/s/XXXXXXXXXXXX/exec",
};
```

### 5. Test it

Submit the form on the live site (or `npm run dev`). Confirm a new row appears in the Sheet and an email arrives in your inbox.

> **Note:** Any time you edit the script code, you must redeploy for changes to take effect on the same URL: **Deploy → Manage deployments → Edit (pencil icon) → Version: New version → Deploy**.

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
│   ├── Contact.tsx         # Quick info (email, location, socials, CV) + contact form
│   ├── ContactForm.tsx     # Name/Email/Phone/Message form (posts to Apps Script)
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

Shared component classes in `globals.css`: `.container-page`, `.btn-primary`, `.btn-outline`, `.section-title`, `.section-kicker`, `.input-field`, `.contact-field` (used on the dark contact form inputs; also overrides the browser's autofill background so selecting a saved suggestion doesn't break the teal styling).

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
