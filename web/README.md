# The Practitioners Pod: website

The marketing site for **thepractitionerspod.com**. It's a fast static site built with [Astro](https://astro.build), hosted on Netlify and deployed by GitHub Actions on every push to `main`.

- No database, no server, no API keys. Episodes are markdown files.
- Forms (newsletter, guest applications, contact) use **Netlify Forms**.
- The brand assets (logo, favicon, 3000×3000 podcast cover art, OG image) are generated from code in `scripts/build-brand-assets.mjs`.

## Run locally

```bash
cd web
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check + production build to web/dist
```

Requires Node 22.12+.

## Go live (one-time setup, ~15 minutes)

1. **Create the Netlify site.** In Netlify, go to *Add new project → Deploy manually* and drop in any folder (e.g. `web/dist` after a local build). This gives you an empty project without Netlify building from Git, because GitHub Actions does the deploying.
   - If you'd rather use *Import from Git*, that works too (`netlify.toml` is already configured). Then go to *Project configuration → Build & deploy → Continuous deployment* and set **Builds: Stopped** so you don't deploy twice.
2. **Copy the IDs.**
   - `NETLIFY_SITE_ID`: *Project configuration → General → Project ID*
   - `NETLIFY_AUTH_TOKEN`: *User settings → Applications → Personal access tokens → New access token*
3. **Add GitHub secrets.** In GitHub, go to *Settings → Secrets and variables → Actions → New repository secret* and add both values above.
4. **Push to `main`.** The *Build & deploy* workflow builds the site and publishes it to production. Pull requests get a preview URL in the workflow summary.
5. **Enable forms.** In Netlify, go to *Forms → Enable form detection*, then redeploy (re-run the workflow). The `newsletter`, `guest-application` and `contact` forms will appear. Add email notifications under *Forms → Form notifications*.
6. **Connect the domain.** In Netlify, go to *Domain management → Add a domain → thepractitionerspod.com*. Then either:
   - switch your registrar's nameservers to Netlify DNS (easiest), or
   - add `A @ 75.2.60.5` and `CNAME www <your-site>.netlify.app` at your registrar.

   HTTPS (Let's Encrypt) is issued automatically. `www` → apex redirect is already in `public/_redirects`.
7. **Set up email** for `hello@thepractitionerspod.com` (e.g. Google Workspace, Fastmail or ImprovMX forwarding). It's used across the site.

## Day-to-day

### Publish an episode
1. Copy `src/content/episodes/_TEMPLATE.md` to e.g. `001-jane-doe-data-contracts.md`.
2. Fill in the frontmatter. Add `youtubeId` and/or `spotifyEpisodeId` to embed a player, then set `draft: false`.
3. Commit and push to `main`. The site is live in about a minute.

The filename (without `.md`) becomes the URL: `/episodes/001-jane-doe-data-contracts`.

### Add listening platforms & socials
Edit `src/site.config.ts`. Any platform URL you fill in (YouTube, Spotify, Apple, RSS) automatically shows up as a button in the hero, episode pages and footer. While they're all empty, the site shows "Launching on YouTube, Spotify & Apple Podcasts soon."

### Add your headshot
Save a square photo as `public/images/host.jpg` and set `host.photo: '/images/host.jpg'` in `src/site.config.ts`.

### Regenerate brand assets
```bash
npm run brand
```
This rewrites the favicon, logos, cover art and OG image in `public/`. Edit colors or the mark in `scripts/build-brand-assets.mjs`.

## Structure

```
web/
├── public/               static files (favicons, _headers, _redirects, brand/ kit)
├── scripts/              brand asset generator
└── src/
    ├── site.config.ts    ← links, host info, platforms (edit me)
    ├── content/episodes/ ← one markdown file per episode
    ├── components/       Header, Footer, Logo, EpisodeCard, Player, Newsletter…
    ├── layouts/Base.astro  SEO, Open Graph, JSON-LD
    └── pages/            /, /episodes, /episodes/[id], /about, /guest, /contact, /brand, /privacy, /terms, /rss.xml
```
