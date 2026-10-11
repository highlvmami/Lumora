<div align="center">

# Lumora

**The showcase site for Lumora projects: games, social networks, real-time tools and more in one place. Turkish and English, dark and light theme, fast and static.**

**[Open the site → lumorahub.pages.dev](https://lumorahub.pages.dev)**

[Türkçe](README.md) · English

<p>
  <img src="https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white" alt="Astro 5">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare Pages">
  <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions&logoColor=white" alt="GitHub Actions">
</p>

</div>

Lumora is the main site where our projects live together. Each project has its own page with a description, screenshots, features, tech and "Visit site / Download / Source" links. Stars, last update and latest release are pulled from GitHub automatically and refreshed every day. The site is fully static: there is no server to go down, and it is served from Cloudflare's worldwide network.

## Screenshots

<p align="center">
  <img src="docs/screenshots/anasayfa.jpg" alt="Home: intro and featured projects" width="100%">
</p>

<p align="center">
  <img src="docs/screenshots/projeler.jpg" alt="Projects: a list filterable by category and status" width="49%">
  <img src="docs/screenshots/proje-detay.jpg" alt="Project page: description, features and tech" width="49%">
</p>

<p align="center">
  <img src="docs/screenshots/acik-tema.jpg" alt="Light theme" width="49%">
  <img src="docs/screenshots/ingilizce.jpg" alt="English version" width="49%">
</p>

<p align="center">
  <img src="docs/screenshots/mobil.jpg" alt="Home page on a phone" width="30%">
</p>

<p align="center"><sub>Ana sayfa · Projeler · Proje sayfası · Light theme · English version · Mobil görünüm</sub></p>

## What's inside

- **Projects:** LumoraRPG, LumoraSocial, LumoraBoard, LumoraLink and LumoraTools are live; Lumora Forge and Lumora Academy are in development.
- **Two languages:** Turkish at `/`, English at `/en/`. The TR | EN switch in the top right opens the same page in the other language, the choice is remembered, and first-time visitors are redirected by browser language.
- **Dark and light theme:** toggled from the top right, the choice is stored in the browser.
- **Blog:** for announcements and release notes; posts are Markdown files.
- **GitHub data:** stars, last update and latest release are fetched at build time and kept fresh by a daily automatic rebuild.
- **SEO and sharing:** sitemap, hreflang, Open Graph image and security headers are set up.
- **Fast and light:** pages are pre-rendered HTML, with no cookies and no tracking script of our own.

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output: dist/
```

Node 22 is required (`.nvmrc`).

## Adding a project

Add a new `.json` file to `src/content/projects/` (copying an existing one is easiest). The file name becomes the address: `lumora-new.json` → `/projeler/lumora-new/` and `/en/projects/lumora-new/`.

| Field | Description |
| --- | --- |
| `status` | `live`, `beta` or `development` |
| `order` | Sort order |
| `repo` | `user/repo`; stars, last update and latest release are fetched from it automatically |
| `links` | Buttons such as "Visit site" or "Download"; the first one is the primary button |
| `screenshots` | Images under `public/projects/`; the first is the card cover. Without any, the card shows an icon and color. Use `"portrait": true` for phone screenshots |
| `accent`, `icon` | The project's accent color and emoji |

All text fields have the shape `{ "tr": "...", "en": "..." }`. UI strings live in `src/lib/i18n.ts`.

## Adding a blog post

Create `src/content/posts/<slug>/` and put `tr.md` and/or `en.md` in it (both languages are optional; with only one, the other language's blog page redirects). Front matter:

```md
---
title: Title
description: Short description shown in the list
date: 2026-10-10
---

Post text (Markdown).
```

Posts are published under `/blog/<slug>/` and `/en/blog/<slug>/`, and the latest two appear on the home page.

## Theme

The light theme is the `html[data-theme='light']` block in `src/styles/global.css`; colors are variables, so existing Tailwind classes invert with the theme automatically.

## Deploying (Cloudflare Pages, free)

1. Create a free account at [dash.cloudflare.com](https://dash.cloudflare.com).
2. **Workers & Pages → Create → Pages → Connect to Git** and pick this repository.
3. Settings: framework preset **Astro**, build command `npm run build`, output directory `dist`.
4. Name the project `lumorahub`; the site opens at `https://lumorahub.pages.dev`. If the address changes, update `site` in `astro.config.mjs` and the address in `public/robots.txt`.
5. (Optional) Add `GITHUB_TOKEN` under **Settings → Environment variables** to avoid GitHub rate limits.

Every merge to `main` updates the site automatically, and every PR gets its own preview link.

### Daily refresh

To refresh the GitHub data on the project cards every day, create a hook in Cloudflare under **Settings → Builds → Deploy hooks** and add its URL as `CLOUDFLARE_DEPLOY_HOOK` under this repository's **Settings → Secrets and variables → Actions**. `.github/workflows/daily-rebuild.yml` rebuilds the site every day at 04:00 UTC.

### Visitor statistics

Open the project in Cloudflare and choose **Metrics → Web Analytics → Enable**. No code changes needed; it uses no cookies.

### 24/7 monitoring

Set up HTTP monitors for the site and the projects' live addresses on [UptimeRobot](https://uptimerobot.com) (free); you get an email or Telegram alert on downtime, and a free status page can be opened.

## Admin sign-in and featuring

The site owner can sign in with GitHub and star projects to choose the "Featured projects" section at the very top of the home page; an "All projects" section always sits below it. The **Admin sign-in** link in the footer starts GitHub OAuth; only the `ADMIN_LOGIN` account (default `highlvmami`) is allowed. Once signed in, a ☆/★ button appears on the cards; the choice is written to Cloudflare KV and the public home page reads it. If nothing is starred, the top section is hidden.

The code is Cloudflare Pages Functions under `functions/` (`/api/auth/*`, `/api/favorites`). One-time setup in Cloudflare:

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**: Homepage `https://lumorahub.pages.dev`, Authorization callback URL `https://lumorahub.pages.dev/api/auth/callback`. Note the **Client ID** and generate a **client secret**.
2. Cloudflare → **Workers & Pages → KV → Create namespace** (e.g. `lumora-favorites`).
3. Cloudflare → `lumorahub` project → **Settings → Bindings → Add → KV namespace**: variable name `FAVORITES`.
4. Same project, **Settings → Variables and Secrets** (Production): `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (as a secret), `SESSION_SECRET` (a long random string, as a secret). Optional: `ADMIN_LOGIN`.
5. Redeploy (Deployments → latest → Retry deployment).

### Admin blog editor

Once signed in, a **+ New post** button appears on the blog page. The editor takes a title, short description, language, address and Markdown text, with a live preview. Posts are saved to the same Cloudflare KV (the `FAVORITES` binding) under `post:<address>`, appear in the blog list sorted by date among the static posts, and admins see **Edit** and **Delete** buttons on the post page. No extra setup is needed. The post page is rendered client-side at `/blog/post/?s=<address>` and is hidden from search engines; for permanent, searchable posts keep adding Markdown files under `src/content/posts/`. Because of the security headers (CSP), posts can only show images served from the site itself (such as `/projects/...`).

## Project structure

| Folder | Contents |
| --- | --- |
| `src/content/` | Projects (JSON) and blog posts (Markdown) |
| `src/pages/` | Turkish pages; English counterparts under `src/pages/en/` |
| `src/views/` | Page bodies shared by both languages |
| `src/components/`, `src/layouts/` | Header, footer, cards, shared page shell |
| `src/lib/` | UI strings, GitHub data, project and post helpers |
| `functions/` | Sign-in and featuring API (Cloudflare Pages Functions) |
| `public/` | Logo, images, `robots.txt`, security headers |
| `.github/workflows/` | Build check and daily rebuild |
