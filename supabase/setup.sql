-- Run this once in the Supabase SQL Editor after the project is restored.
-- It creates the mailing list and clears the Security Definer View warning.

create table if not exists mailing_list (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text,
  created_at timestamptz not null default now(),
  constraint mailing_list_email_check
    check (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$')
);

create unique index if not exists mailing_list_email_unique
  on mailing_list (lower(email));

alter table mailing_list enable row level security;

drop policy if exists "Allow anonymous mailing list inserts" on mailing_list;
create policy "Allow anonymous mailing list inserts"
  on mailing_list
  for insert
  to anon
  with check (true);

revoke all on table mailing_list from public;
revoke all on table mailing_list from anon;
grant insert on table mailing_list to anon;

create table if not exists public.equipment_votes (
  id uuid primary key default gen_random_uuid(),
  equipment_name text not null,
  created_at timestamptz not null default now()
);

alter table public.equipment_votes enable row level security;

drop policy if exists "Allow anonymous inserts" on public.equipment_votes;
create policy "Allow anonymous inserts"
  on public.equipment_votes
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous select" on public.equipment_votes;
create policy "Allow anonymous select"
  on public.equipment_votes
  for select
  to anon
  using (true);

revoke all on table public.equipment_votes from public;
revoke all on table public.equipment_votes from anon;
grant insert, select on table public.equipment_votes to anon;

create or replace view public.community_wishlist_vote_totals
with (security_invoker = on) as
select
  equipment_name,
  count(*)::bigint as vote_count
from public.equipment_votes
group by equipment_name;

grant select on table public.community_wishlist_vote_totals to anon;
