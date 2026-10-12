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
  <img src="docs/screenshots/anasayfa.jpg" alt="Home: terminal-style intro, project list and stats" width="100%">
</p>

<p align="center">
  <img src="docs/screenshots/projeler.jpg" alt="Projects: a list filterable by category and status" width="49%">
  <img src="docs/screenshots/proje-detay.jpg" alt="Project page: description, features and tech" width="49%">
</p>

<p align="center">
  <img src="docs/screenshots/cv.jpg" alt="CV page: technologies and projects fill in automatically" width="49%">
  <img src="docs/screenshots/giris.jpg" alt="Admin sign-in page" width="49%">
</p>

<p align="center">
  <img src="docs/screenshots/acik-tema.jpg" alt="Light theme" width="49%">
  <img src="docs/screenshots/ingilizce.jpg" alt="English version" width="49%">
</p>

<p align="center">
  <img src="docs/screenshots/mobil.jpg" alt="Home page on a phone" width="30%">
</p>

<p align="center"><sub>Home · Projects · Project page · CV · Admin sign-in · Light theme · English version · Mobile</sub></p>

## What's inside

- **Projects:** LumoraRPG, LumoraSocial, LumoraBoard, LumoraLink, LumoraTools and LumoraFiles are live; Lumora Forge and Lumora Academy are in development.
- **Two languages:** Turkish at `/`, English at `/en/`. The TR | EN switch in the top right opens the same page in the other language, the choice is remembered, and first-time visitors are redirected by browser language.
- **Developer-site look:** a terminal-style home page, code-comment headings, a status-bar footer and light animations (disabled when reduced motion is on).
- **CV page:** technologies and projects fill in automatically from the projects on the site; printable with a "Save as PDF" button.
- **Admin sign-in:** the site owner signs in with GitHub to add blog posts and choose featured projects.
- **Dark and light theme:** toggled from the top right, the choice is stored in the browser.
- **Blog:** announcements, release notes and posts with charts; in Turkish and English.
- **GitHub data:** stars, last update and latest release are fetched at build time and kept fresh by a daily automatic rebuild.
- **SEO and sharing:** sitemap, hreflang, Open Graph image and security headers are set up.
- **Fast and light:** pages are pre-rendered HTML, with no cookies and no tracking script of our own.

## Pages

| Page | Address |
| --- | --- |
| Home | `/` · `/en/` |
| Projects and project details | `/projeler/` · `/en/projects/` |
| Blog | `/blog/` · `/en/blog/` |
| CV | `/cv/` · `/en/cv/` |
| About | `/hakkinda/` · `/en/about/` |
| Contact | `/iletisim/` · `/en/contact/` |
| Admin sign-in | `/giris/` · `/en/login/` |

## Tech

Astro, Tailwind CSS, TypeScript; Cloudflare Pages and Pages Functions; GitHub OAuth for admin sign-in, Cloudflare KV for favorites and blog posts.
