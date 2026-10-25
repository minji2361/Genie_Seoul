import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

// 신청 건 삭제는 관리자 계정만 가능
export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다." }, { status: 500 });
  }

  const { error } = await admin.from("home_popup_applications").delete().eq("id", params.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
