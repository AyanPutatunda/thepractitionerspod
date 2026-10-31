# The Practitioners Pod

Next.js site for [thepractitionerspod.com](https://thepractitionerspod.com). Product rules live in [CLAUDE.md](./CLAUDE.md). Status lives in [PROGRESS.md](./PROGRESS.md).

Public v1 is a Broadsheet editorial site. Episodes come from the YouTube channel. Guest applications and contact messages go to Netlify Forms. There is no Supabase project yet, and the public pages do not need one.

## Local setup

Node.js 22 and npm. From the repo root:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

App Router pages are served at [http://localhost:3000](http://localhost:3000). `NEXT_PUBLIC_SITE_URL` can stay empty locally; metadata falls back to `https://thepractitionerspod.com`.

Netlify Forms are collected in production. A local `POST` to `/__forms.html` is not stored. Use the on-page validation, and email `thepractitionerspod@gmail.com` if you need to confirm a message by hand.

## Scripts

| Script              | What it does       |
| ------------------- | ------------------ |
| `npm run dev`       | Next.js dev server |
| `npm run lint`      | ESLint             |
| `npm run typecheck` | `tsc --noEmit`     |
| `npm test`          | Vitest             |
| `npm run build`     | Production build   |
| `npm run format`    | Prettier write     |

`npm run lint && npm run typecheck && npm test && npm run build` is the local gate. GitHub Actions runs the same four commands. It does not deploy. Netlify builds from [`netlify.toml`](./netlify.toml) when the repo is pushed.

## Episodes

The show channel is [youtube.com/@thepractitionerspod](https://www.youtube.com/@thepractitionerspod). The site reads YouTube’s public uploads feed at build time and revalidates about hourly. Set `YOUTUBE_API_KEY` (and optionally `YOUTUBE_CHANNEL_ID`) to add duration and view counts. Unpublished videos are not in that feed, so they are not on the site. This repo does not publish an RSS feed.

## Database

New schema work goes in `supabase/migrations`. The initial migration is `supabase/migrations/20261030120000_initial_schema.sql`. It is not applied to a hosted database. `/admin` is 404 until `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` point at a real project and a user has a session.

`SETUP.md`, `SUPABASE_SETUP.md`, and `MIGRATION_TO_SUPABASE.md` are historical.
