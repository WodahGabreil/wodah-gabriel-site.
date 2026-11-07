# Wodah Gabriel: Portfolio Website

Five-page personal brand site (Home, Services, Portfolio, About, Contact). Each nav item opens its own page; routing uses the URL hash (#services, #about ...), so it works on any static host with no extra setup.
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
  site.ts                 Upwork link, email, WhatsApp, form endpoint, portrait
  services.ts             the four services
  caseStudies.ts          case studies (add more here)
  testimonials.ts         empty = section hidden
  process.ts              the five-stage framework
  stats.ts                key figures strip under the hero (counts up on scroll)
  home.ts                 all copy for the Home page blocks under the hero (platforms, why strategy, services preview, FAQ, final call to action ...)
src/components/           Nav, Hero, Services, CaseStudies, About, Contact, ...
src/components/home/      one component per Home block, assembled in HomePage.tsx (testimonials and the Hire strip hide themselves when empty)
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

## Upwork and WhatsApp links
Edit `links.upwork` and `contact.whatsappLink` in `src/content/site.ts`. Until replaced, the buttons show "Profile link coming soon" instead of a broken link. Contact email and WhatsApp work the same way.

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

## Home page blocks
Under the hero the Home page tells a fuller story in this order: key figures, platform expertise, why strategy, featured result, services preview, process preview, who I work with, hire through platforms, FAQ, testimonials (hidden until `src/content/testimonials.ts` has real entries), and a closing call to action. Edit the text in `src/content/home.ts`. The featured result reads its figures from the TikTok case study, and the process steps come from `process.ts`. Links in these blocks jump to the matching service card, the working framework, or the open case study on the other pages.
