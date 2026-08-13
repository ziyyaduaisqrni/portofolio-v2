-- Run this in Supabase SQL Editor.
-- Public visitors can read portfolio content.
-- Only authenticated Supabase users can create/update/delete content and upload files.

create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  image_url text not null default '',
  tech_stack text[] not null default '{}',
  features text[] not null default '{}',
  live_url text not null default '',
  github_url text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  issue_date text not null default '',
  image text not null default '',
  credential_url text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.certificates enable row level security;

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects" on public.projects for select using (true);

drop policy if exists "Authenticated can manage projects" on public.projects;
create policy "Authenticated can manage projects" on public.projects for all to authenticated using (true) with check (true);

drop policy if exists "Public can read certificates" on public.certificates;
create policy "Public can read certificates" on public.certificates for select using (true);

drop policy if exists "Authenticated can manage certificates" on public.certificates;
create policy "Authenticated can manage certificates" on public.certificates for all to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('projects', 'projects', true)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public)
values ('certificates', 'certificates', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read portfolio images" on storage.objects;
create policy "Public can read portfolio images"
on storage.objects for select
using (bucket_id in ('projects', 'certificates'));

drop policy if exists "Authenticated can upload portfolio images" on storage.objects;
create policy "Authenticated can upload portfolio images"
on storage.objects for insert to authenticated
with check (bucket_id in ('projects', 'certificates'));

drop policy if exists "Authenticated can update portfolio images" on storage.objects;
create policy "Authenticated can update portfolio images"
on storage.objects for update to authenticated
using (bucket_id in ('projects', 'certificates'))
with check (bucket_id in ('projects', 'certificates'));

drop policy if exists "Authenticated can delete portfolio images" on storage.objects;
create policy "Authenticated can delete portfolio images"
on storage.objects for delete to authenticated
using (bucket_id in ('projects', 'certificates'));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists certificates_set_updated_at on public.certificates;
create trigger certificates_set_updated_at before update on public.certificates
for each row execute function public.set_updated_at();
