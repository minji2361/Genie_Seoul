-- 인터뷰 목록 조회 시 성별을 자동으로 "여자"/"남자"로 보여주기 위한 계산 컬럼
-- gender 가 'F'/'M' 이면 "여자"/"남자"로, 그 외(자유입력 텍스트 등)는 원본 그대로 반환
-- Supabase 대시보드 → SQL Editor 에서 전체 실행하세요. 여러 번 실행해도 안전합니다(idempotent).

alter table public.int_interviews
  drop column if exists gender_label;

alter table public.int_interviews
  add column gender_label text generated always as (
    case
      when gender = 'F' then '여자'
      when gender = 'M' then '남자'
      else gender
    end
  ) stored;
