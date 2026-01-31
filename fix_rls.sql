-- Run this entire block in your Supabase SQL Editor to fix the RLS error

-- 1. Enable RLS (just in case)
alter table public.registrations enable row level security;

-- 2. Drop existing policies to avoid conflicts/errors when re-running
drop policy if exists "Enable insert for all users" on public.registrations;
drop policy if exists "Enable insert for authenticated users" on public.registrations;

-- 3. Create the policy for ANONYMOUS users (This is the critical one for public forms)
create policy "Enable insert for all users" 
on public.registrations 
for insert 
to anon 
with check (true);

-- 4. Create the policy for AUTHENTICATED users (In case you log in later)
create policy "Enable insert for authenticated users" 
on public.registrations 
for insert 
to authenticated 
with check (true);

-- 5. Grant usage on the sequence (sometimes needed for ID generation if using serial, 
-- though uuid uses gen_random_uuid() so this is just a safety measure for other permissions)
grant all on table public.registrations to anon;
grant all on table public.registrations to authenticated;
