-- int_interviews 컬럼 추가 (인터뷰 폼 확장)
-- Supabase SQL Editor에서 실행하세요. 여러 번 실행해도 안전합니다.

alter table public.int_interviews
  add column if not exists major_job text not null default '';

alter table public.int_interviews
  add column if not exists schedule text not null default '';

alter table public.int_interviews
  add column if not exists oneday_classes_etc text not null default '';

alter table public.int_interviews
  add column if not exists clubs_etc text not null default '';
