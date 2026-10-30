-- Initial schema for The Practitioners Pod.
-- Source of truth is this file. Do not edit it after it has been applied;
-- add a new migration instead.
--
-- Apply with the Supabase CLI against a local database (`supabase start` /
-- `supabase db reset`). This repo is not linked to a hosted project.
--
-- Roles live in public.profiles.role: admin, editor, viewer.
-- There is no signup trigger. A new auth user has no profile and therefore no
-- access. Bootstrap the first admin from the SQL editor (bypasses RLS):
--
--   insert into public.profiles (user_id, role)
--   values ('<auth.users.id>', 'admin');
--
-- Public Data API access uses the anon key and can only see published episodes
-- and the non-sensitive columns of guests who appear on those episodes.
-- The service_role key bypasses RLS. It is server-only.

create type public.guest_status as enum (
  'prospect',
  'invited',
  'applied',
  'shortlisted',
  'scheduled',
  'recorded',
  'editing',
  'published',
  'declined',
  'on_hold'
);

create table public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'viewer' check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.guests (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  full_name text not null,
  email text unique check (
    email is null
    or email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  ),
  title text,
  company text,
  linkedin_url text,
  website_url text,
  headshot_url text,
  bio text,
  timezone text,
  source text check (
    source is null
    or source in ('network', 'linkedin', 'referral', 'application', 'other')
  ),
  referred_by_guest_id uuid references public.guests (id) on delete set null,
  tags text[] not null default '{}',
  status public.guest_status not null default 'prospect',
  notes text,
  consent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.guest_status_history (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null references public.guests (id) on delete cascade,
  from_status public.guest_status,
  to_status public.guest_status not null,
  changed_by uuid references auth.users (id) on delete set null,
  changed_at timestamptz not null default now(),
  note text
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid references public.guests (id) on delete cascade,
  name text not null,
  email text not null check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  title text not null,
  company text not null,
  linkedin_url text not null,
  bio text,
  proposed_topics text not null,
  story text not null,
  availability text not null,
  heard_from text,
  consent boolean not null default false,
  submitted_at timestamptz not null default now(),
  reviewed_by uuid references auth.users (id) on delete set null,
  decision text not null default 'pending' check (
    decision in ('pending', 'shortlisted', 'accepted', 'declined')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.recordings (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null references public.guests (id) on delete cascade,
  scheduled_at timestamptz,
  timezone text not null default 'UTC',
  riverside_link text,
  calendar_event_id text,
  status text not null default 'proposed' check (
    status in ('proposed', 'booked', 'completed', 'cancelled')
  ),
  reminders_sent jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.episodes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  youtube_video_id text not null unique check (char_length(youtube_video_id) > 0),
  title text not null,
  description text not null default '',
  published_at timestamptz,
  duration_s integer check (duration_s is null or duration_s >= 0),
  thumbnail_url text,
  view_count integer not null default 0 check (view_count >= 0),
  show_notes_mdx text,
  transcript text,
  chapters jsonb not null default '[]'::jsonb,
  tags text[] not null default '{}',
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.episode_guests (
  episode_id uuid not null references public.episodes (id) on delete cascade,
  guest_id uuid not null references public.guests (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (episode_id, guest_id)
);

create table public.email_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  subject text not null,
  body_md text not null,
  merge_fields text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.email_log (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null references public.guests (id) on delete cascade,
  template_id uuid references public.email_templates (id) on delete set null,
  to_email text not null,
  subject text not null,
  sent_at timestamptz not null default now(),
  sent_by uuid references auth.users (id) on delete set null,
  status text not null default 'sent' check (status in ('sent', 'failed'))
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  subject text not null check (
    subject in ('General', 'Guest Application', 'Sponsorship', 'Press', 'Other')
  ),
  message text not null,
  consent boolean not null default false,
  created_at timestamptz not null default now(),
  handled boolean not null default false,
  updated_at timestamptz not null default now()
);

create index guests_status_idx on public.guests (status);
create index guest_status_history_guest_idx
  on public.guest_status_history (guest_id, changed_at desc);
create index applications_email_idx on public.applications (email);
create index applications_submitted_at_idx on public.applications (submitted_at desc);
create index episodes_published_idx on public.episodes (is_published, published_at desc);
create index episode_guests_guest_idx on public.episode_guests (guest_id);
create index email_log_guest_idx on public.email_log (guest_id, sent_at desc);
create index contact_messages_created_at_idx on public.contact_messages (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger guests_set_updated_at
  before update on public.guests
  for each row execute function public.set_updated_at();

create trigger applications_set_updated_at
  before update on public.applications
  for each row execute function public.set_updated_at();

create trigger recordings_set_updated_at
  before update on public.recordings
  for each row execute function public.set_updated_at();

create trigger episodes_set_updated_at
  before update on public.episodes
  for each row execute function public.set_updated_at();

create trigger email_templates_set_updated_at
  before update on public.email_templates
  for each row execute function public.set_updated_at();

create trigger contact_messages_set_updated_at
  before update on public.contact_messages
  for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.profiles force row level security;
alter table public.guests enable row level security;
alter table public.guests force row level security;
alter table public.guest_status_history enable row level security;
alter table public.guest_status_history force row level security;
alter table public.applications enable row level security;
alter table public.applications force row level security;
alter table public.recordings enable row level security;
alter table public.recordings force row level security;
alter table public.episodes enable row level security;
alter table public.episodes force row level security;
alter table public.episode_guests enable row level security;
alter table public.episode_guests force row level security;
alter table public.email_templates enable row level security;
alter table public.email_templates force row level security;
alter table public.email_log enable row level security;
alter table public.email_log force row level security;
alter table public.contact_messages enable row level security;
alter table public.contact_messages force row level security;

create or replace function public.profile_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select p.role
  from public.profiles as p
  where p.user_id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.profile_role() = 'admin'
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.profile_role() in ('admin', 'editor', 'viewer')
$$;

create or replace function public.can_edit()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.profile_role() in ('admin', 'editor')
$$;

revoke all on function public.profile_role() from public, anon, authenticated;
revoke all on function public.is_admin() from public, anon, authenticated;
revoke all on function public.is_staff() from public, anon, authenticated;
revoke all on function public.can_edit() from public, anon, authenticated;
revoke all on function public.set_updated_at() from public, anon;

grant execute on function public.profile_role() to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_staff() to authenticated;
grant execute on function public.can_edit() to authenticated;
grant execute on function public.set_updated_at() to authenticated, service_role;

-- profiles: a user can read their own row. Admins manage every row.
-- No insert/update policy for non-admins, so nobody can self-promote.

create policy profiles_select
  on public.profiles
  for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

create policy profiles_admin_insert
  on public.profiles
  for insert
  to authenticated
  with check (public.is_admin());

create policy profiles_admin_update
  on public.profiles
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy profiles_admin_delete
  on public.profiles
  for delete
  to authenticated
  using (public.is_admin());

-- guests: anon sees public columns only for people on a published episode.
-- Column grants below hide email, notes, status, and the rest from anon.

create policy guests_public_read
  on public.guests
  for select
  to anon
  using (
    exists (
      select 1
      from public.episode_guests as eg
      join public.episodes as e on e.id = eg.episode_id
      where eg.guest_id = guests.id
        and e.is_published = true
    )
  );

create policy guests_staff_read
  on public.guests
  for select
  to authenticated
  using (public.is_staff());

create policy guests_editor_insert
  on public.guests
  for insert
  to authenticated
  with check (public.can_edit());

create policy guests_editor_update
  on public.guests
  for update
  to authenticated
  using (public.can_edit())
  with check (public.can_edit());

create policy guests_admin_delete
  on public.guests
  for delete
  to authenticated
  using (public.is_admin());

create policy guest_status_history_staff_read
  on public.guest_status_history
  for select
  to authenticated
  using (public.is_staff());

create policy guest_status_history_editor_insert
  on public.guest_status_history
  for insert
  to authenticated
  with check (public.can_edit());

create policy guest_status_history_admin_delete
  on public.guest_status_history
  for delete
  to authenticated
  using (public.is_admin());

-- applications: the public form can insert a pending row and nothing else.
-- Identity columns live here so anon does not write the guests table.

create policy applications_anon_insert
  on public.applications
  for insert
  to anon
  with check (
    guest_id is null
    and reviewed_by is null
    and decision = 'pending'
    and consent is true
  );

create policy applications_staff_read
  on public.applications
  for select
  to authenticated
  using (public.is_staff());

create policy applications_editor_insert
  on public.applications
  for insert
  to authenticated
  with check (public.can_edit() and consent is true);

create policy applications_editor_update
  on public.applications
  for update
  to authenticated
  using (public.can_edit())
  with check (public.can_edit());

create policy applications_admin_delete
  on public.applications
  for delete
  to authenticated
  using (public.is_admin());

create policy recordings_staff_read
  on public.recordings
  for select
  to authenticated
  using (public.is_staff());

create policy recordings_editor_insert
  on public.recordings
  for insert
  to authenticated
  with check (public.can_edit());

create policy recordings_editor_update
  on public.recordings
  for update
  to authenticated
  using (public.can_edit())
  with check (public.can_edit());

create policy recordings_admin_delete
  on public.recordings
  for delete
  to authenticated
  using (public.is_admin());

create policy episodes_public_read
  on public.episodes
  for select
  to anon
  using (is_published = true);

create policy episodes_staff_read
  on public.episodes
  for select
  to authenticated
  using (public.is_staff());

create policy episodes_editor_insert
  on public.episodes
  for insert
  to authenticated
  with check (public.can_edit());

create policy episodes_editor_update
  on public.episodes
  for update
  to authenticated
  using (public.can_edit())
  with check (public.can_edit());

create policy episodes_admin_delete
  on public.episodes
  for delete
  to authenticated
  using (public.is_admin());

create policy episode_guests_public_read
  on public.episode_guests
  for select
  to anon
  using (
    exists (
      select 1
      from public.episodes as e
      where e.id = episode_id
        and e.is_published = true
    )
  );

create policy episode_guests_staff_read
  on public.episode_guests
  for select
  to authenticated
  using (public.is_staff());

create policy episode_guests_editor_insert
  on public.episode_guests
  for insert
  to authenticated
  with check (public.can_edit());

create policy episode_guests_editor_delete
  on public.episode_guests
  for delete
  to authenticated
  using (public.can_edit());

create policy email_templates_staff_read
  on public.email_templates
  for select
  to authenticated
  using (public.is_staff());

create policy email_templates_editor_insert
  on public.email_templates
  for insert
  to authenticated
  with check (public.can_edit());

create policy email_templates_editor_update
  on public.email_templates
  for update
  to authenticated
  using (public.can_edit())
  with check (public.can_edit());

create policy email_templates_admin_delete
  on public.email_templates
  for delete
  to authenticated
  using (public.is_admin());

-- email_log is append-only for editors. Sends are logged after an explicit
-- human send; nothing in this schema sends mail by itself.

create policy email_log_staff_read
  on public.email_log
  for select
  to authenticated
  using (public.is_staff());

create policy email_log_editor_insert
  on public.email_log
  for insert
  to authenticated
  with check (public.can_edit());

create policy email_log_admin_delete
  on public.email_log
  for delete
  to authenticated
  using (public.is_admin());

create policy contact_messages_anon_insert
  on public.contact_messages
  for insert
  to anon
  with check (consent is true and handled is false);

create policy contact_messages_staff_read
  on public.contact_messages
  for select
  to authenticated
  using (public.is_staff());

create policy contact_messages_editor_update
  on public.contact_messages
  for update
  to authenticated
  using (public.can_edit())
  with check (public.can_edit());

create policy contact_messages_admin_delete
  on public.contact_messages
  for delete
  to authenticated
  using (public.is_admin());

-- Reset Data API grants, then re-grant. auto-expose would otherwise give
-- anon full access to every new table; RLS would still filter rows, but
-- column privileges are what keep guest email and notes off the public API.

revoke all on table public.profiles from public, anon, authenticated;
revoke all on table public.guests from public, anon, authenticated;
revoke all on table public.guest_status_history from public, anon, authenticated;
revoke all on table public.applications from public, anon, authenticated;
revoke all on table public.recordings from public, anon, authenticated;
revoke all on table public.episodes from public, anon, authenticated;
revoke all on table public.episode_guests from public, anon, authenticated;
revoke all on table public.email_templates from public, anon, authenticated;
revoke all on table public.email_log from public, anon, authenticated;
revoke all on table public.contact_messages from public, anon, authenticated;

grant select, insert, update, delete on public.profiles to authenticated, service_role;
grant select, insert, update, delete on public.guests to authenticated, service_role;
grant select, insert, update, delete on public.guest_status_history to authenticated, service_role;
grant select, insert, update, delete on public.applications to authenticated, service_role;
grant select, insert, update, delete on public.recordings to authenticated, service_role;
grant select, insert, update, delete on public.episodes to authenticated, service_role;
grant select, insert, update, delete on public.episode_guests to authenticated, service_role;
grant select, insert, update, delete on public.email_templates to authenticated, service_role;
grant select, insert, update, delete on public.email_log to authenticated, service_role;
grant select, insert, update, delete on public.contact_messages to authenticated, service_role;

grant select on public.episodes to anon;
grant select on public.episode_guests to anon;
grant select (
  id,
  slug,
  full_name,
  title,
  company,
  linkedin_url,
  website_url,
  headshot_url,
  bio
) on public.guests to anon;

grant insert (
  name,
  email,
  title,
  company,
  linkedin_url,
  bio,
  proposed_topics,
  story,
  availability,
  heard_from,
  consent
) on public.applications to anon;

grant insert (name, email, subject, message, consent)
  on public.contact_messages to anon;
