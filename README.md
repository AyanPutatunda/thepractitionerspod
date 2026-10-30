# The Practitioners Pod

Next.js app for [thepractitionerspod.com](https://thepractitionerspod.com). Product rules live in [CLAUDE.md](./CLAUDE.md). What is done, what is next, and what is waiting on a decision live in [PROGRESS.md](./PROGRESS.md).

Phase 0 is local setup only. No hosted Supabase or Vercel project is linked, and this repo has no secrets.

## Local setup

Node.js 22 and npm. From the repo root:

```bash
npm ci
cp .env.example .env
```

Fill `.env` when you have credentials. Until then, a dummy Postgres URL is enough to generate the Prisma client and build. Page queries fail closed and render empty states:

```bash
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/postgres?connect_timeout=2"
```

`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can stay empty until a Supabase project exists. Admin login will not work without them.

```bash
npm run dev
```

App Router pages are served at [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Generate the Prisma client, then start Next.js |
| `npm run lint` | ESLint (`next lint`) |
| `npm run typecheck` | Generate the Prisma client, then `tsc --noEmit` |
| `npm test` | Vitest |
| `npm run build` | Generate the Prisma client, then production build |
| `npm run format` | Prettier write |
| `npm run db:generate` | `prisma generate` only |

`npm run lint && npm run typecheck && npm test && npm run build` is the local gate. GitHub Actions runs the same four commands on pull requests and on `main`.

## Database

New schema work goes in `supabase/migrations`. The initial migration is `supabase/migrations/20261030120000_initial_schema.sql`. It creates the §7 model, enables and forces row level security on every table, and authorizes rows from `profiles.role` (`admin`, `editor`, `viewer`).

Do not run `npm run db:push`. The Prisma schema under `prisma/` belongs to the existing prototype and does not match the migration.

Nothing here is applied to a hosted database. When you want a local database:

```bash
npx supabase start
npx supabase db reset
```

That requires Docker. `supabase/config.toml` leaves email signup off. Create the auth user in Studio, then promote them once (the SQL editor bypasses RLS):

```sql
insert into public.profiles (user_id, role)
values ('<auth.users.id>', 'admin');
```

`SUPABASE_SERVICE_ROLE_KEY` bypasses RLS. Use it only on the server. Public pages must query with the anon key so guest email, notes, and pipeline fields stay hidden.

Generate TypeScript types after the local database is up:

```bash
npx supabase gen types typescript --local > lib/supabase/database.types.ts
```

## Two trees

`app/`, `components/`, `lib/`, and `prisma/` are the Next.js prototype this phase continues. `web/` is an Astro site with its own `npm` project, Netlify config, and GitHub Actions deploy. It is still in the repo. Treat the Next.js app as the path forward. See the audit in [PROGRESS.md](./PROGRESS.md) before deleting `web/`.

`SETUP.md`, `SUPABASE_SETUP.md`, and `MIGRATION_TO_SUPABASE.md` are historical.
