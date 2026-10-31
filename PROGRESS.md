# Progress

Owner: Ayan Putatunda. Working rules: [CLAUDE.md](./CLAUDE.md).

## Done

Phase 0 is on `main` (PR #3). Public v1 shipped in PR #4. This branch is the unslop pass on that site: same pages and data, a warmer human layout.

- Next.js **16.4.3** (Active LTS), React 19.3.1, `@supabase/ssr` 0.7.0. `cookies()` is async. Request interception is `proxy.ts` (the Next 16 name for middleware).
- The Astro site in `web/` and `.github/workflows/deploy.yml` are removed. Netlify Git auto-publish is the only deployer. Root [`netlify.toml`](./netlify.toml) builds with `npm run build`, publishes `.next`, Node 22. No GitHub Actions Netlify deploy job.
- Visual system is daylight glass on top of the unslop pass. Tokens and `.btn`, `.tag`, `.card`, `.nav`, `.field` live in [`app/globals.css`](./app/globals.css). Type is the SF stack with Inter as the `next/font` fallback. Headlines are weight 600. One accent, cyan, with `#006786` on small text, links, focus, and the filled button. The nav is a sticky glass capsule. Panels, forms, and the player frame are glass with a solid fallback when blur or transparency is unavailable. The signature is a short cyan tick under the home headline. The empty hero is an honest glass frame, not a fake episode. Motion uses one Apple ease, a 1px hover lift, and scroll compression on the nav, all removed under `prefers-reduced-motion`. The unslop skill, license, and attribution stay in `.cursor/skills/unslop/`.
- Public pages: `/`, `/episodes`, `/episodes/[slug]`, `/guests`, `/about`, `/guest-application`, `/contact`, `/privacy`, `/terms`, and the not-found page. No newsletter route.
- YouTube handle `https://www.youtube.com/@thepractitionerspod` was verified on 2026-10-31 (channel id `UCe21K5ANdbqOXa8dHGi6Jzg`, title ThePractitionersPod). The public uploads feed had **no videos**. Home, episodes, and guests render that empty state. Episode pages embed `youtube-nocookie.com` when a public video exists. Nothing on this site publishes an RSS feed.
- Guest application and contact post to Netlify Forms via `public/__forms.html` (honeypot included), with client-side zod checks and an on-page success state. `next start` locally returns 500 for that POST because Netlify’s form parser is not in front of it; the form then shows the email fallback.
- `/admin` and `/admin/login` return 404 while Supabase env is missing. The migration in `supabase/migrations` is unchanged.
- SEO: metadata, generated Open Graph image, `sitemap.xml`, `robots.txt`, WebSite JSON-LD, and VideoObject JSON-LD on episode pages. Canonical origin is `NEXT_PUBLIC_SITE_URL`, defaulting to `https://thepractitionerspod.com`.
- Placeholder guests, quotes, stats, Spotify, Apple, RSS, LinkedIn, X, and `hello@` / `host@` addresses are gone. The only outbound links are the verified YouTube channel, `https://ayanputatunda.com`, and `thepractitionerspod@gmail.com`.

## Next

1. Netlify Deploy Previews on this account are password-protected. Confirm the preview check on the PR is green and open it with the site password. Do not deploy to production and do not change DNS.
2. When the YouTube channel publishes a video, the next build or hourly revalidation should list it. Duration and view count appear only if `YOUTUBE_API_KEY` is set in Netlify.
3. Turn on Netlify Forms notifications to `thepractitionerspod@gmail.com` in the Netlify UI. Forms detection must be enabled for the site.
4. Supabase, auth, the pipeline, and CSV import stay later. Do not create a hosted project until Ayan says so.
5. Host photo and any employer mention stay off the site until Ayan writes them.

## Open decisions

Resolved for v1 and recorded in [CLAUDE.md](./CLAUDE.md) §12: Netlify, daylight glass (ink and cyan, system type, Inter fallback), type-only wordmark, host credit with no bio, Gmail contact, YouTube only.

Still open:

- Domain and DNS for `thepractitionerspod.com`. Do not touch them from this repo.
- Whether a hosted Supabase project should be created, and who the first admin is.
- Real episode enrichment (chapters, transcripts, guest records) once videos exist. Do not invent them.
