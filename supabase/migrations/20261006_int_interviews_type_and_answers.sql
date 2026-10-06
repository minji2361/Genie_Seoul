-- 인터뷰 유형(직장인/성인, 대학생) 구분 + 대학생 인터뷰 응답 저장
-- Supabase 대시보드 → SQL Editor 에서 실행하세요.
-- 기존 데이터는 모두 'adult'(직장인/성인)로 간주됩니다.

alter table public.int_interviews
  add column if not exists interview_type text not null default 'adult';

alter table public.int_interviews
  add column if not exists answers jsonb not null default '{}'::jsonb;

alter table public.int_interviews
  drop constraint if exists int_interviews_interview_type_check;

alter table public.int_interviews
  add constraint int_interviews_interview_type_check
  check (interview_type in ('adult', 'college'));

create index if not exists idx_int_interviews_interview_type on public.int_interviews (interview_type);
