-- 지니커스텀 인터뷰지 저장 테이블 (int_ 접두사)
-- Supabase 대시보드 → SQL Editor 에서 실행하세요.
-- 기존 genie_interviews 를 쓰던 경우: 하단 DROP 주석 해제 후 실행

-- drop table if exists public.genie_interviews cascade;

create table if not exists public.int_interviews (
    id uuid primary key default gen_random_uuid(),
    counselors uuid not null references auth.users (id) on delete cascade,

    -- 기본정보
    name text not null,
    age text not null,
    gender text not null,
    mbti text not null,
    region text not null,
    hobby text not null default '',
    dream text not null default '',

    -- 인터뷰 질문 (1~12)
    q1_why_qa text not null default '',
    q2_current_interest text not null default '',
    q3_one_hour_wish text not null default '',
    q4_what_tires text not null default '',
    q5_energy_focus text not null default '',
    q6_what_lacking text not null default '',
    q7_local_taste text not null default '',
    q8_ideal_day text not null default '',
    q9_needed_gathering text not null default '',
    q10_life_priority text not null default '',
    q11_one_wish text not null default '',
    q12_interview_thoughts text not null default '',

    signatureurl text not null,
    created_at timestamptz not null default now()
);

create index if not exists idx_int_interviews_counselors on public.int_interviews (counselors);
create index if not exists idx_int_interviews_created_at on public.int_interviews (created_at desc);

alter table public.int_interviews enable row level security;

drop policy if exists "int_interviews_counselor_all" on public.int_interviews;
create policy "int_interviews_counselor_all" on public.int_interviews
  for all to authenticated
  using (auth.uid() = counselors)
  with check (auth.uid() = counselors);
