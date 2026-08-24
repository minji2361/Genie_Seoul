import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const authorized = await isAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY가 설정되지 않아 팝업 설정을 불러올 수 없습니다." },
      { status: 500 },
    );
  }

  const { data, error } = await admin
    .from("home_popup_config")
    .select("title, description, image_url, is_active")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function PATCH(request: Request) {
  const authorized = await isAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const update: Record<string, unknown> = {};

  if (typeof body.title === "string") update.title = body.title;
  if (Array.isArray(body.description) && body.description.every((line: unknown) => typeof line === "string")) {
    update.description = body.description;
  }
  if (typeof body.image_url === "string" || body.image_url === null) update.image_url = body.image_url;
  if (typeof body.is_active === "boolean") update.is_active = body.is_active;

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "변경할 값이 없습니다." }, { status: 400 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY가 설정되지 않아 팝업 설정을 저장할 수 없습니다." },
      { status: 500 },
    );
  }

  const { data, error } = await admin
    .from("home_popup_config")
    .update({ ...update, updated_at: new Date().toISOString() })
    .eq("id", 1)
    .select("title, description, image_url, is_active")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}
