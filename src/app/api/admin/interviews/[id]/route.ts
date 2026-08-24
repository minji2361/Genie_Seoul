import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase-admin";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const authorized = await isAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.retain !== "boolean") {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY가 설정되지 않아 처리할 수 없습니다." },
      { status: 500 },
    );
  }

  const { data, error } = await admin
    .from("int_interviews")
    .update({ retain: body.retain })
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}
