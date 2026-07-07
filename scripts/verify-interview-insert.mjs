/**
 * Supabase SQL Editor에서 policies-int-interviews.sql 실행 후,
 * 인터뷰 INSERT가 되는지 확인합니다.
 *
 * 사용: node scripts/verify-interview-insert.mjs
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://arqinkxqokwzjidflaen.supabase.co';
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!anon) {
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY 가 필요합니다.');
  process.exit(1);
}

const email = process.env.ADMIN_ID ?? 'jn@jn.com';
const password = process.env.ADMIN_PASSWORD ?? 'Jn1234!';

const authRes = await fetch(`${url}/auth/v1/token?grant_type=password`, {
  method: 'POST',
  headers: { apikey: anon, 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
const auth = await authRes.json();

if (!auth.access_token) {
  console.error('Supabase 로그인 실패:', auth.error?.message ?? auth);
  process.exit(1);
}

const insertRes = await fetch(`${url}/rest/v1/int_interviews`, {
  method: 'POST',
  headers: {
    apikey: anon,
    Authorization: `Bearer ${auth.access_token}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
  body: JSON.stringify({
    counselors: auth.user.id,
    name: 'policy-test',
    age: '20',
    gender: 'F',
    mbti: 'INTJ',
    region: 'test',
    signatureurl: 'https://example.com/sig.png',
  }),
});

const text = await insertRes.text();
console.log('status', insertRes.status, text);

if (insertRes.status === 201 || insertRes.status === 200) {
  const row = JSON.parse(text)[0];
  await fetch(`${url}/rest/v1/int_interviews?id=eq.${row.id}`, {
    method: 'DELETE',
    headers: { apikey: anon, Authorization: `Bearer ${auth.access_token}` },
  });
  console.log('OK: insert/delete works');
}
