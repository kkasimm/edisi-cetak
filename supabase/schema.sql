-- Jalankan di Supabase SQL Editor saat siap beralih dari mode demo.

create table if not exists public.rsvps (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 80),
  attending   boolean not null,
  guests      int not null default 1 check (guests between 1 and 8),
  message     text check (char_length(message) <= 500),
  created_at  timestamptz not null default now()
);

create table if not exists public.guestbook (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 80),
  message     text not null check (char_length(message) between 1 and 500),
  created_at  timestamptz not null default now()
);

alter table public.rsvps enable row level security;
alter table public.guestbook enable row level security;

-- Tamu (anon) hanya boleh mengirim. RSVP tidak bisa dibaca publik.
create policy "anon can insert rsvps"     on public.rsvps     for insert to anon with check (true);
create policy "anon can insert guestbook" on public.guestbook for insert to anon with check (true);
-- Buku tamu boleh dibaca publik agar ucapan tampil.
create policy "anon can read guestbook"   on public.guestbook for select to anon using (true);
