import { NextResponse } from "next/server";

import { getSessionRole } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

// 미들웨어 매처에 없는 경로이므로 여기서 직접 권한을 검사한다 (코치 또는 관리자만 조회 가능)
export async function GET() {
  const role = await getSessionRole();
  if (role !== "coach" && role !== "admin") {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다." }, { status: 500 });
  }

  const { data, error } = await admin
    .from("home_popup_applications")
    .select("id, name, age, gender, region, phone, popup_title, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data: data ?? [] });
}
