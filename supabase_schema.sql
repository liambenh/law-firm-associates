-- LAW FIRM & ASSOCIATES — schéma Supabase
-- À exécuter dans Supabase > SQL Editor > New query.
create table if not exists public.clients (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 name text not null,
 category text not null default 'Entreprise',
 email text,
 phone text,
 contact_name text,
 profitability text default 'À évaluer',
 address text,
 notes text,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.cases (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 client_id uuid references public.clients(id) on delete set null,
 title text not null,
 domain text not null default 'Droit pénal',
 court text,
 status text not null default 'À ouvrir',
 next_date date,
 billed numeric(12,2) not null default 0,
 paid numeric(12,2) not null default 0,
 opponent text,
 summary text,
 evidence text,
 strategy text,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
alter table public.clients enable row level security;
alter table public.cases enable row level security;
drop policy if exists "clients_owner_all" on public.clients;
create policy "clients_owner_all" on public.clients for all to authenticated
 using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "cases_owner_all" on public.cases;
create policy "cases_owner_all" on public.cases for all to authenticated
 using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists clients_user_id_idx on public.clients(user_id);
create index if not exists cases_user_id_idx on public.cases(user_id);
create index if not exists cases_client_id_idx on public.cases(client_id);
