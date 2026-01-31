# How to Connect Clerk with Supabase (Required for Secure User Data)

Since you are using **Clerk** for login and **Supabase** for the database, you must connect them so Supabase knows "Who is this user?".

Without this connection:
- Users can log in, but Supabase treats them as "Anonymous".
- You cannot use policies like `auth.uid() = user_id`.
- Anyone with technical skills could potentially fake data.

## Step 1: Get Supabase JWT Secret
1. Go to your **Supabase Dashboard**.
2. Click **Project Settings** (Cog icon) -> **API**.
3. Scroll down to **JWT Settings**.
4. Copy the **JWT Secret**. (It looks like a long random string).

## Step 2: Configure Clerk
1. Go to your **Clerk Dashboard**.
2. Click **JWT Templates** in the sidebar.
3. Click **New Template** and select **Supabase**.
4. In the "Signing Key" field, paste the **JWT Secret** you copied from Supabase.
5. Name the template `supabase` (lowercase).
6. Click **Save**.

## Step 3: Update Database Schema (SQL)
You need to tell Supabase to trust the Clerk user ID. Run this in your **Supabase SQL Editor**:

```sql
-- Create a function to handle new user setup (Optional but recommended)
-- For now, just ensure your table has a user_id column
alter table public.registrations 
add column if not exists user_id text;

-- Update RLS policy to allow users to insert THEIR OWN data
drop policy if exists "Enable insert for authenticated users" on public.registrations;

create policy "Enable insert for authenticated users"
on public.registrations
for insert
to authenticated
with check (
  -- The user_id in the form MUST match the logged-in user's ID
  user_id = auth.uid()::text
);
```

## Step 4: Code Integration (I have done this for you!)
I have created a hook `useSupabaseAuth` and updated the registration form to send the user's token.

Now, when a logged-in user submits a form:
1. The app gets a secure token from Clerk.
2. It sends it to Supabase.
3. Supabase verifies the token and records the `user_id`.
