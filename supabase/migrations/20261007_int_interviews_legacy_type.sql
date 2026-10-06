-- 인터뷰 유형에 'legacy'(기타: 성인/대학생 구분 이전에 작성된 구 인터뷰지) 추가
-- 20261006_int_interviews_type_and_answers.sql 실행 후 SQL Editor 에서 실행하세요.
--
-- 20261006 마이그레이션이 기존 행을 모두 'adult' 로 채웠기 때문에,
-- 이름이 '성인 테스트' 인 행만 'adult' 로 남기고 나머지 'adult' 행은 모두 'legacy' 로 되돌립니다.
-- ('college' 행은 그대로 둡니다.)

alter table public.int_interviews
  drop constraint if exists int_interviews_interview_type_check;

alter table public.int_interviews
  add constraint int_interviews_interview_type_check
  check (interview_type in ('adult', 'college', 'legacy'));

update public.int_interviews
   set interview_type = 'legacy'
 where interview_type = 'adult'
   and name <> '성인 테스트';

-- 확인용
-- select interview_type, count(*) from public.int_interviews group by interview_type;
