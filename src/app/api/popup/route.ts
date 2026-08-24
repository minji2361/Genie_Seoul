import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ data: null });
  }

  const { data, error } = await admin
    .from("home_popup_config")
    .select("title, description, image_url, is_active")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ data: null });
  }

  return NextResponse.json({ data });
}
