-- 코치 계정 jn@jn.com 수동 설정 (Supabase SQL Editor에서 1회 실행)
-- 주의: auth.users 직접 INSERT는 권장되지 않습니다.
-- 가장 쉬운 방법은 대시보드에서 사용자 추가입니다 (아래 README 참고).

-- 1) counselors 테이블만 미리 확인
-- select * from public.counselors where email = 'jn@jn.com';

-- 2) 이미 auth.users에 jn@jn.com 이 있을 때 counselors 행 추가 예시
-- (USER_UUID를 Authentication → Users에서 해당 사용자 id로 바꾸세요)
/*
insert into public.counselors (user_id, name, email, region)
values (
  '00000000-0000-0000-0000-000000000000',
  'jn',
  'jn@jn.com',
  '미지정'
)
on conflict (user_id) do nothing;
*/
