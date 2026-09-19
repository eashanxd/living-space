alter table public.properties
  add column if not exists videos text[] not null default '{}'::text[];

alter table public.properties enable row level security;

drop policy if exists "Public can read properties" on public.properties;
drop policy if exists "Authenticated users can insert properties" on public.properties;
drop policy if exists "Admin can insert properties" on public.properties;

create policy "Public can read properties"
on public.properties
for select
to anon, authenticated
using (true);

create policy "Admin can insert properties"
on public.properties
for insert
to authenticated
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

insert into storage.buckets (id, name, public)
values
  ('property-images', 'property-images', true),
  ('property-videos', 'property-videos', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can view property images" on storage.objects;
drop policy if exists "Public can view property videos" on storage.objects;
drop policy if exists "Authenticated users can upload property images" on storage.objects;
drop policy if exists "Authenticated users can upload property videos" on storage.objects;
drop policy if exists "Authenticated users can remove property images" on storage.objects;
drop policy if exists "Authenticated users can remove property videos" on storage.objects;
drop policy if exists "Admin can upload property images" on storage.objects;
drop policy if exists "Admin can upload property videos" on storage.objects;
drop policy if exists "Admin can remove property images" on storage.objects;
drop policy if exists "Admin can remove property videos" on storage.objects;

create policy "Public can view property images"
on storage.objects
for select
to public
using (bucket_id = 'property-images');

create policy "Public can view property videos"
on storage.objects
for select
to public
using (bucket_id = 'property-videos');

create policy "Admin can upload property images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'property-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admin can upload property videos"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'property-videos' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admin can remove property images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'property-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admin can remove property videos"
on storage.objects
for delete
to authenticated
using (bucket_id = 'property-videos' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
