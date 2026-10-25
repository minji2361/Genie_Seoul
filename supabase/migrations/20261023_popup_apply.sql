-- 홈 팝업 "신청하기" 기능: 신청 버튼 노출 스위치 + 신청자 저장 테이블
-- Supabase 대시보드 → SQL Editor 에서 전체 실행하세요. 여러 번 실행해도 안전합니다(idempotent).

-- 1) 팝업 설정: 신청 버튼 노출 여부 (기본: 숨김)
alter table public.home_popup_config
  add column if not exists apply_enabled boolean not null default false;

-- 2) 신청자 테이블
create table if not exists public.home_popup_applications (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    age text not null,
    gender text not null,
    region text not null,
    phone text not null,
    popup_title text not null default '',
    created_at timestamptz not null default now(),
    constraint home_popup_applications_phone_format check (phone ~ '^[0-9]{3}-[0-9]{4}-[0-9]{4}$'),
    -- 같은 팝업(제목 기준)에는 같은 전화번호로 한 번만 신청 가능
    constraint home_popup_applications_phone_popup_unique unique (phone, popup_title)
);

create index if not exists idx_home_popup_applications_created_at
  on public.home_popup_applications (created_at desc);

-- RLS: 켜 두고 정책은 만들지 않습니다.
-- 읽기/쓰기는 모두 서버 API(서비스 롤)로만 처리하며, 로그인 여부와 권한은 API 코드에서 검사합니다.
alter table public.home_popup_applications enable row level security;
