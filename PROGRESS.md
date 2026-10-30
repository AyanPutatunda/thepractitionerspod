# Progress

Owner: Ayan Putatunda. Working rules: [CLAUDE.md](./CLAUDE.md).

## Done

Phase 0 local setup, on branch `cursor/phase-0-setup-1648`. No hosted Supabase or Vercel project. No secrets committed.

- [CLAUDE.md](./CLAUDE.md) is the brief, copied verbatim.
- TypeScript `strict` was already on. `target` is ES2017 (it was unset, so `tsc` assumed ES5). `forceConsistentCasingInFileNames` is on. The Next `tsconfig` excludes `web/` so the Astro tree is not typechecked as Next.
- ESLint (`next lint` + Prettier so the two don't fight), Prettier, and Vitest. Scripts: `lint`, `typecheck`, `test`, `format`, `format:check`.
- Vitest covers the YouTube ISO duration parser and a contract check that every `create table` in `supabase/migrations` enables and forces RLS and that `profiles.role` is `admin | editor | viewer`.
- GitHub Actions [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) runs `lint`, `typecheck`, `test`, and `build` on pull requests and `main`.
- [`.env.example`](./.env.example) lists every variable name the stack needs, with empty values.
- [`supabase/migrations/20261030120000_initial_schema.sql`](./supabase/migrations/20261030120000_initial_schema.sql) is the §7 model plus the adjustments below. RLS is enabled and forced on every table. Policies use `profiles.role`.
- The migration was applied on local PostgreSQL 16 with a stub `auth.users` / `auth.uid()` (Docker is not available here, so this was not the Supabase image, and nothing was hosted). Anon sees published episodes and public guest columns, and cannot read `email`. Anon can insert an application and a contact message; `decision` stays `pending` and `guest_id` stays null. A user with no profile sees no rows. A viewer can read pipeline email and cannot insert. An editor can insert a guest; a delete matches no rows. An admin can delete. A stranger cannot insert their own `profiles` row. `RETURNING` after an anon insert fails because anon cannot select the new row. Phase 4's form handler should respond `{ ok: true }` without reading the row back as anon.
- Root [README](./README.md) is the local setup guide.
- Prototype cleanups that were required for the gate or that the brief forbids: unused `@supabase/auth-helpers-nextjs` removed (nothing imported it); episode share button moved to a client component so the server page builds; unused imports removed; hardcoded About stats (`50+`, `45+`, `15+`, `100K+` downloads) removed; home counts stay hidden when every count is zero, and views under 1,000 are not rendered as `0K+`.

## Next

1. Ayan confirms the open decisions below. Phase 1 (tokens, type, `/styleguide`) waits on palette and type.
2. Upgrade Next.js off 14 in its own PR before any public deploy. See the audit.
3. When a local Supabase stack is wanted: `npx supabase start && npx supabase db reset`, then generate `lib/supabase/database.types.ts`. Do not create a hosted project until Ayan says so.
4. Leave Prisma in place until the prototype pages and API routes are rewritten against `supabase-js`. Do not `prisma db push` onto a database that has this migration.
5. Public pages, guest directory, application form, and admin are later phases. CSV import stays early (Phase 5, or sooner once auth exists).

## Database recommendation

Use Supabase as the only schema owner: CLI migrations in `supabase/migrations`, RLS, and `supabase gen types` when a local database exists. Keep the Prisma client installed so the current pages still compile. Stop extending `prisma/schema.prisma`.

Trade-offs:

- The brief requires SQL migrations and RLS. Prisma Migrate does not model policies, grants, or `auth.users`. A second schema will drift. The two schemas already disagree: Prisma has newsletter subscribers, phone, episode numbers, and an application-status enum; §7 has the guest pipeline, recordings, email templates, email log, and `profiles.role`.
- Prisma connects as a database owner and bypasses RLS. Guest email and notes would be readable to any server code that uses it, including public pages. That is the wrong default for this app.
- The cost of switching the queries now is a rewrite of every page and API route that imports `@/lib/prisma`. That is real product code, and Phase 0 does not need it. Those routes still talk to tables that do not exist in the new migration, so they are not wired to Supabase yet.
- `service_role` also bypasses RLS. It stays server-only. Public reads use the anon key, which can select published episodes and only `id, slug, full_name, title, company, linkedin_url, website_url, headshot_url, bio` on guests who appear on a published episode. `select *` as anon fails on purpose.

Schema choices made in the migration (adjust with a new migration, do not edit this one once it has been applied):

- No profile row is created on signup. An auth user with no profile has no access. Local config leaves email signup off. The first admin is inserted by hand in the SQL editor, which bypasses RLS. That avoids an open signup becoming a viewer who can read the whole pipeline.
- `applications` stores the applicant's name, email, title, company, LinkedIn, bio, and a `consent` flag. `guest_id` is nullable. Anonymous insert cannot set `guest_id`, `reviewed_by`, or `decision`, and `consent` must be true. Anonymous clients cannot insert into `guests`, so a public form cannot mark someone published.
- `contact_messages.subject` is `General | Guest Application | Sponsorship | Press | Other`, with `consent` required on anonymous insert. The prototype form still posts `general | guest | sponsorship | press | other` to Prisma. Align them when the form moves.
- Delete is admin-only, except an editor may remove a row in `episode_guests` (unlink a guest from an episode). Status history and the email log are append-only for editors.
- `recordings.status` is `proposed | booked | completed | cancelled`. `email_log.status` is `sent | failed` (write the row after the explicit send).
- `guests.email` is optional and unique. `guests.source` allows `network | linkedin | referral | application | other`. `guests.consent_at` is optional. Slugs are lowercase hyphenated. `episode_guests` has `created_at`.
- `newsletter_subscribers` is not in the migration. The brief's site map has no newsletter.

## Audit

The repo has two apps. The root Next.js 14 prototype (`app/`, `components/`, `lib/`, `prisma/`) matches the brief's stack and is the one this phase continues. `web/` is a later Astro site that the old README called the live site. It deploys to Netlify from [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

### Keep

- Next.js App Router, TypeScript, Tailwind, `zod`, React Hook Form, Resend, `lucide-react`, `date-fns`.
- Supabase browser/server/middleware clients in `lib/supabase/` and `middleware.ts`. They already use `@supabase/ssr`, not NextAuth.
- `lib/youtube.ts` as the start of the Data API client.
- Public routes that match the site map: `/`, `/episodes`, `/episodes/[id]`, `/guests`, `/about`, `/contact`, `/privacy`, plus `/admin` and `/admin/login`.
- `web/public/brand/` as a candidate logo kit until Ayan accepts or replaces it. Not wired into the Next app.

### Replace later

- Prisma access in pages and `app/api/**` with the anon or user-scoped Supabase client. Do not do that by pointing Prisma at the new tables.
- `@supabase/ssr` `0.0.10` and the sync `cookies()` / `get`/`set`/`remove` cookie adapter, as part of the Next upgrade. Current APIs are async `getAll` / `setAll`.
- Episode URLs are `/episodes/[youtubeId]`. The brief wants `/episodes/[slug]`.
- Guest application lives at `/apply`. The brief wants `/guest-application`.
- Guest directory is one page with anchors. The brief wants `/guests/[slug]`.
- YouTube embed is a plain `youtube.com` iframe. The brief wants a lite embed on `youtube-nocookie.com`.
- Contact and application handlers write Prisma and do not send mail, check Turnstile, or rate-limit.
- Admin is a single Supabase-authenticated page with links to routes that do not exist (`/admin/applications`, `/admin/episodes`, `/admin/messages`). No roles in the UI. RLS is what will enforce them.
- Prototype copy, gradients, and the Tailwind palette (navy plus muted blue, teal, and gold). Phase 1 replaces this after sign-off. Homepage positioning copy is not the brief's line. Left unchanged.
- `SETUP.md`, `SUPABASE_SETUP.md`, `MIGRATION_TO_SUPABASE.md`. They describe NextAuth history and `prisma db push`. A banner points at this file. Not deleted.

### Delete only after you confirm

- `web/` (Astro, RSS at `web/src/pages/rss.xml.ts`, `Player.astro`, Spotify/Apple/RSS platform links, podcast cover, Netlify Forms). This contradicts §2 and §4. It is also the tree the existing deploy publishes, so it stays until you say the live site can move.
- `netlify.toml` and the deploy job in `deploy.yml`, at the same time. The job now skips instead of failing when `NETLIFY_AUTH_TOKEN` or `NETLIFY_SITE_ID` is unset, so this PR's checks can pass. If those secrets exist, the Astro deploy still runs.
- Prisma (`prisma/`, `@prisma/client`, the `db:*` scripts) once nothing imports it.
- Newsletter UI and `app/api/newsletter/subscribe`. Not in the site map.
- `audio-only` on the application form. Recording is Riverside, publishing is YouTube.
- Fabricated or placeholder public copy still in the prototype: `[Host Name]` on About, `linkedin.com/company/thepractitionerspod` and `twitter.com` on Contact, host email `host@thepractitionerspod.com`. Marked as placeholders. Not replaced, because the real bio and handles are your call.

### Next.js

Stay on Next.js 14.2.35 (the version `npm ci` locked, and the last 14.2 security patch) for this PR. Current stable is 16.4.3 (Active LTS). 14's security support ended 2025-10-26. Jumping to 16 is not low-risk here: `cookies()` and `params` are synchronous, `@supabase/ssr` is the pre-1.0 cookie API, and the app is still on React 18. Do the upgrade in a dedicated PR before launch, landing on 16.4.x (or whatever Active LTS is then), and bump `@supabase/ssr` in the same change.

## Open decisions

Recommended default is the one to use if you don't pick.

1. **Stack (§4).** Accept the defaults: Next.js App Router, Tailwind, MDX in `/content` when content work starts, Supabase, YouTube Data API, Resend, Turnstile, GA4, Vercel. Scheduling: Cal.com embed unless v1 needs two-way Google Calendar writes. Database: Supabase-native, Prisma frozen (see above). No paid plan and no production project until you approve it.
2. **Domain.** Confirm you control `thepractitionerspod.com` and which DNS host it uses. No DNS or production deploy from this phase.
3. **Palette and type.** Navy `#1a2332`, accent blue `#3b82f6`, neutrals from §3, Inter, light default, dark mode via tokens. Sign off in Phase 1 before page builds. The prototype's gold and teal stay until that pass.
4. **Logo.** A generated kit is already in `web/public/brand/` (mark, horizontal, stacked, favicon, podcast cover). Use that wordmark if you still want it. Otherwise Phase 1 draws a type-only wordmark. Podcast cover art is not a site requirement.
5. **Host bio and photo.** Send the exact About copy, what may be said about your employer, and a photo. The Next About page still says `[Host Name]`. `web/src/site.config.ts` already calls you Staff Data Engineer and links `ayanputatunda.com` and your LinkedIn. That was not copied onto new pages.
6. **Email sender.** Resend on the show's domain after DNS exists. Notification inbox: `thepractitionerspod@gmail.com`. The Astro site uses `hello@thepractitionerspod.com`. No email is sent from this phase. No real guest mail without an explicit click from you.
7. **Social links.** YouTube channel URL (required). Confirm whether the footer should link your personal LinkedIn, a show LinkedIn page, X, or anything else. The Next.js footer already points at `youtube.com/@thepractitionerspod`, `linkedin.com/company/thepractitionerspod`, `twitter.com/practitionerspod`, and `hello@thepractitionerspod.com`. Say which of those are real. Do not invent handles.

Also blocking, and not in §12:

- Say when `web/` and the Netlify deploy can be removed.
- Confirm the Supabase-native recommendation so later phases do not grow Prisma.
