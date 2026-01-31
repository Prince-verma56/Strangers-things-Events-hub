-- Create the registrations table if it doesn't exist
create table if not exists public.registrations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text not null,
  college text not null,
  year_of_study text not null,
  team_size text not null,
  event_name text
);

-- Enable Row Level Security (RLS)
alter table public.registrations enable row level security;

-- Policy to allow anonymous inserts (if your form is public)
create policy "Enable insert for all users" 
on public.registrations 
for insert 
to anon 
with check (true);

-- Policy to allow authenticated inserts (if users are logged in)
create policy "Enable insert for authenticated users" 
on public.registrations 
for insert 
to authenticated 
with check (true);

-- Optional: Policy to allow users to see their own registrations
-- (Requires user_id column which we haven't added yet, but good for future)
-- create policy "Users can view own registrations" 
-- on public.registrations 
-- for select 
-- using (auth.uid() = user_id);
