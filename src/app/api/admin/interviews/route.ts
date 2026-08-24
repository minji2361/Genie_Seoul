import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase-admin";

export async function GET() {
  const authorized = await isAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY가 설정되지 않아 전체 목록을 조회할 수 없습니다." },
      { status: 500 },
    );
  }

  const [interviewsResult, counselorsResult] = await Promise.all([
    admin.from("int_interviews").select("*").order("created_at", { ascending: false }),
    admin.from("counselors").select("user_id, name"),
  ]);

  if (interviewsResult.error) {
    return NextResponse.json({ error: interviewsResult.error.message }, { status: 400 });
  }
  if (counselorsResult.error) {
    return NextResponse.json({ error: counselorsResult.error.message }, { status: 400 });
  }

  const counselorNameByUserId = new Map(
    (counselorsResult.data ?? []).map((c) => [c.user_id, c.name]),
  );

  const data = (interviewsResult.data ?? []).map((item) => ({
    ...item,
    counselor_name: counselorNameByUserId.get(item.counselors) ?? item.counselors,
  }));

  return NextResponse.json({ data });
}
