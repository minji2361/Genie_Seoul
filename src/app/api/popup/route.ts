import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const BASE_COLUMNS = "title, description, image_url, is_active, content_type, link_url";

export async function GET() {
  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ data: null });
  }

  const { data, error } = await admin
    .from("home_popup_config")
    .select(`${BASE_COLUMNS}, apply_enabled`)
    .eq("id", 1)
    .maybeSingle();

  if (!error) {
    return NextResponse.json({ data });
  }

  // apply_enabled 컬럼 마이그레이션 전에도 기존 팝업은 계속 보이도록 한다
  const fallback = await admin.from("home_popup_config").select(BASE_COLUMNS).eq("id", 1).maybeSingle();
  if (fallback.error || !fallback.data) {
    return NextResponse.json({ data: null });
  }

  return NextResponse.json({ data: { ...fallback.data, apply_enabled: false } });
}
