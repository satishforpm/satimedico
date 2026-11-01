-- Run once in Supabase > SQL Editor (non-destructive)
create table if not exists public.admin_users(user_id uuid primary key references auth.users(id) on delete cascade, created_at timestamptz default now());
alter table public.admin_users enable row level security;
do $$ begin if not exists (select 1 from pg_policies where tablename='admin_users' and policyname='read own admin row') then
create policy "read own admin row" on public.admin_users for select to authenticated using (user_id = auth.uid()); end if; end $$;
insert into public.admin_users(user_id) select id from auth.users where email='satishforpm@gmail.com' on conflict do nothing;
