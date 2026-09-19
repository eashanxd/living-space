alter table public.properties enable row level security;

drop policy if exists "Admin can delete properties" on public.properties;

create policy "Admin can delete properties"
on public.properties
for delete
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');