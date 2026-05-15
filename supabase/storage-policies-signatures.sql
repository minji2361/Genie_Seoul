-- signatures 버킷 업로드/조회 정책 (서명 업로드 실패 시 SQL Editor에서 실행)
-- Dashboard → Storage → signatures 버킷이 있어야 합니다.

create policy "signatures_public_read"
on storage.objects for select
to public
using (bucket_id = 'signatures');

create policy "signatures_authenticated_insert"
on storage.objects for insert
to authenticated
with check (bucket_id = 'signatures');

create policy "signatures_authenticated_update"
on storage.objects for update
to authenticated
using (bucket_id = 'signatures')
with check (bucket_id = 'signatures');
