-- 관리자 페이지 1단계: 데이터 "보관(retain)" 플래그 + 홈 팝업 관리 테이블
-- Supabase 대시보드 → SQL Editor 에서 전체 실행하세요. 여러 번 실행해도 안전합니다(idempotent).

-- =============================================================================
-- 1) 데이터 관리 — "보관" 플래그
--    관리자가 체크하면(retain = true) 코치도 해당 건을 삭제할 수 없도록 RLS로 막습니다.
-- =============================================================================
alter table public.participant add column if not exists retain boolean not null default false;
alter table public.int_interviews add column if not exists retain boolean not null default false;

create index if not exists idx_participant_retain on public.participant (retain);
create index if not exists idx_int_interviews_retain on public.int_interviews (retain);

-- participant: 기존 "for all" 정책을 명령어별로 나누고, delete 에만 retain 조건을 추가
drop policy if exists "participant_counselor_all" on public.participant;
drop policy if exists "participant_counselor_select" on public.participant;
drop policy if exists "participant_counselor_insert" on public.participant;
drop policy if exists "participant_counselor_update" on public.participant;
drop policy if exists "participant_counselor_delete" on public.participant;

create policy "participant_counselor_select" on public.participant
  for select to authenticated
  using (auth.uid() = counselors);

create policy "participant_counselor_insert" on public.participant
  for insert to authenticated
  with check (auth.uid() = counselors);

create policy "participant_counselor_update" on public.participant
  for update to authenticated
  using (auth.uid() = counselors)
  with check (auth.uid() = counselors);

create policy "participant_counselor_delete" on public.participant
  for delete to authenticated
  using (auth.uid() = counselors and retain = false);

-- int_interviews: 동일하게 명령어별로 분리 (서버 API가 서비스 롤을 쓰는 경우 RLS를 우회하므로,
-- 이건 방어선일 뿐이고 실제 차단은 삭제 API 코드에서 retain 조건을 한 번 더 걸어야 합니다)
drop policy if exists "int_interviews_counselor_all" on public.int_interviews;
drop policy if exists "int_interviews_counselor_select" on public.int_interviews;
drop policy if exists "int_interviews_counselor_insert" on public.int_interviews;
drop policy if exists "int_interviews_counselor_update" on public.int_interviews;
drop policy if exists "int_interviews_counselor_delete" on public.int_interviews;

create policy "int_interviews_counselor_select" on public.int_interviews
  for select to authenticated
  using (auth.uid() = counselors);

create policy "int_interviews_counselor_insert" on public.int_interviews
  for insert to authenticated
  with check (auth.uid() = counselors);

create policy "int_interviews_counselor_update" on public.int_interviews
  for update to authenticated
  using (auth.uid() = counselors)
  with check (auth.uid() = counselors);

create policy "int_interviews_counselor_delete" on public.int_interviews
  for delete to authenticated
  using (auth.uid() = counselors and retain = false);


-- =============================================================================
-- 2) 팝업 관리 — 1행짜리 설정 테이블 (누구나 조회 가능, 쓰기는 관리자 서버 API만)
-- =============================================================================
create table if not exists public.home_popup_config (
    id integer primary key default 1,
    title text not null default '',
    description text[] not null default '{}'::text[],
    image_url text,
    is_active boolean not null default false,
    updated_at timestamptz not null default now(),
    constraint home_popup_config_singleton check (id = 1)
);

insert into public.home_popup_config (id)
values (1)
on conflict (id) do nothing;

alter table public.home_popup_config enable row level security;

drop policy if exists "home_popup_config_public_read" on public.home_popup_config;
create policy "home_popup_config_public_read" on public.home_popup_config
  for select to public
  using (true);

-- insert/update/delete 정책은 만들지 않습니다.
-- 관리자 화면은 서비스 롤(service role) 키를 쓰는 서버 API로만 값을 바꿀 예정이라
-- 서비스 롤은 RLS를 우회하고, 그 외 누구도 쓰기를 할 수 없습니다.


-- =============================================================================
-- 3) 팝업 이미지 저장소
-- =============================================================================
insert into storage.buckets (id, name, public)
values ('popup-images', 'popup-images', true)
on conflict (id) do nothing;

drop policy if exists "popup_images_public_read" on storage.objects;
create policy "popup_images_public_read"
  on storage.objects for select to public
  using (bucket_id = 'popup-images');

-- 업로드도 관리자 서버 API(서비스 롤)로만 처리하므로 별도 insert 정책은 만들지 않습니다.
