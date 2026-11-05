# Wodah Gabriel: Portfolio Website

One-page personal brand site: Home, Services, Case Studies, About, Contact.
Stack: React, TypeScript, Tailwind CSS v4, Vite. Icons and motion are built in (inline SVG, CSS and IntersectionObserver), so there are no extra runtime dependencies.

## Run it
```bash
npm install
npm run dev        # local preview
npm run build      # outputs dist/
```
`scripts/build-local.mjs` is an optional helper for environments where Vite cannot be installed. You can ignore it.

## Project structure
```
index.html                SEO + social meta, fonts
public/                   favicon, og-image.png, apple-touch-icon.png, evidence/ (screenshots)
src/content/              EDIT HERE: all site text and data
  site.ts                 Fiverr/Upwork links, email, WhatsApp, form endpoint, portrait
  services.ts             the four services
  caseStudies.ts          case studies (add more here)
  testimonials.ts         empty = section hidden
  process.ts              the five-stage framework
src/components/           Nav, Hero, Services, CaseStudies, About, Contact, ...
```

## Update content
Edit files in `src/content/`. Anything left empty shows an "Add details" placeholder. Nothing is invented: only confirmed figures appear.

## Add case study screenshots
1. Copy images into `public/evidence/` (PNG or JPG; keep each under ~300 KB for speed).
2. Match the filenames in `src/content/caseStudies.ts` under `evidence` (defaults: `tiktok-01.png` to `tiktok-03.png`, `youtube-01.png`, `youtube-02.png`), or edit the list: `{ src, alt, caption }`.
3. Until a file exists, a "Screenshot coming soon" tile shows. Once present, visitors can click to enlarge (arrow keys and Esc work).

## Complete the YouTube case study
In `caseStudies.ts`, fill `comparison.before` / `comparison.after` (numbers), `channelInfo`, `extraMetrics`, `overview`, `objectives`, `workPerformed`, `approach`, `resultsSummary`, then set `status: "published"` to remove the "Awaiting project data" tag.

## Add a new case study
Copy an object in `caseStudies.ts`, give it a new `id`, set `platform` (`youtube | tiktok | twitch | kick`). Filter chips appear automatically once there are more than three.

## Fiverr and Upwork links
Edit `links.fiverr` and `links.upwork` in `src/content/site.ts`. Until replaced, the buttons show "Profile link coming soon" instead of a broken link. Contact email and WhatsApp work the same way.

## Contact form configuration
The form validates and is accessible, but **it only counts as working once a backend is connected**.
1. Create a free form endpoint (Formspree, Web3Forms, Basin, or Netlify Forms with a proxy).
2. Paste its URL into `formEndpoint` in `site.ts` (and `formAccessKey` if the service requires one, e.g. Web3Forms).
3. Submit a test inquiry and confirm it arrives in your inbox.

Without an endpoint the form falls back to opening the visitor's email app (if `contact.email` is set); it never shows a false "sent" message.

## Social sharing and SEO
Set `VITE_SITE_URL` (e.g. `https://yourdomain.com`) in `.env` or your host's environment settings, so canonical and share-image URLs are absolute. Replace `public/og-image.png` (1200x630) with your own artwork if you like.

## Deploy
- **Vercel / Netlify**: import the repo; build command `npm run build`, output `dist`. Add `VITE_SITE_URL` in project settings.
- **GitHub Pages**: build locally with `npm run build`, publish `dist/` (for example with the `gh-pages` branch or a Pages workflow). Asset paths are relative, so project sub-paths work.
