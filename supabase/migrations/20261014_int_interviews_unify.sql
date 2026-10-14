-- 인터뷰지를 하나로 통합: 기존 모든 인터뷰를 '인터뷰지(구)'(legacy)로 분리하고, 새 인터뷰지는 'current' 로 저장
-- Supabase 대시보드 → SQL Editor 에서 실행하세요. (20261006, 20261007 실행 후)
--
-- interview_type : 'current'(새 인터뷰지) | 'legacy'(인터뷰지(구))
-- legacy_form    : 인터뷰지(구)의 원래 양식 — 'adult'(성인) | 'college'(대학생) | 'q12'(q1~q12 고정 질문)
--                  조회/수정 화면이 예전 질문 레이아웃을 그대로 보여주기 위해 사용합니다.

alter table public.int_interviews
  add column if not exists legacy_form text;

-- 1) 기존 양식 보존 (interview_type 을 바꾸기 전에 먼저 채웁니다)
update public.int_interviews
   set legacy_form = case
         when interview_type = 'college' then 'college'
         when interview_type = 'adult' and answers <> '{}'::jsonb then 'adult'
         else 'q12'
       end
 where legacy_form is null
   and interview_type in ('adult', 'college', 'legacy');

-- 2) 기존 행 전부 인터뷰지(구)로 이동
alter table public.int_interviews
  drop constraint if exists int_interviews_interview_type_check;

update public.int_interviews
   set interview_type = 'legacy'
 where interview_type in ('adult', 'college');

alter table public.int_interviews
  add constraint int_interviews_interview_type_check
  check (interview_type in ('current', 'legacy'));

alter table public.int_interviews
  drop constraint if exists int_interviews_legacy_form_check;

alter table public.int_interviews
  add constraint int_interviews_legacy_form_check
  check (legacy_form is null or legacy_form in ('adult', 'college', 'q12'));

-- 새로 저장되는 행의 기본값은 'current'
alter table public.int_interviews
  alter column interview_type set default 'current';

-- 확인용
-- select interview_type, legacy_form, count(*) from public.int_interviews group by 1, 2 order by 1, 2;
