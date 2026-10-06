-- 홈 팝업 문구를 "텍스트" 또는 "링크"로 선택할 수 있도록 컬럼 추가
-- Supabase 대시보드 → SQL Editor 에서 전체 실행하세요. 여러 번 실행해도 안전합니다(idempotent).

alter table public.home_popup_config
  add column if not exists content_type text not null default 'text';

alter table public.home_popup_config
  add column if not exists link_url text;

alter table public.home_popup_config
  drop constraint if exists home_popup_config_content_type_check;

alter table public.home_popup_config
  add constraint home_popup_config_content_type_check
  check (content_type in ('text', 'link'));
