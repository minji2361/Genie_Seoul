import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const PHONE_PATTERN = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
const AGE_PATTERN = /^[0-9]{1,3}$/;
const GENDERS = ["M", "F"];

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= max ? trimmed : null;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 봇 방지: 사람 눈에는 보이지 않는 입력란이 채워져 있으면 조용히 성공 처리하고 저장하지 않는다
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = text(body.name, 30);
  const region = text(body.region, 60);
  const age = text(body.age, 3);
  const gender = text(body.gender, 1);
  const phone = text(body.phone, 13);

  if (!name || !region || !age || !gender || !phone) {
    return NextResponse.json({ error: "모든 항목을 입력해 주세요." }, { status: 400 });
  }
  if (!AGE_PATTERN.test(age) || !GENDERS.includes(gender)) {
    return NextResponse.json({ error: "나이와 성별을 다시 선택해 주세요." }, { status: 400 });
  }
  if (!PHONE_PATTERN.test(phone)) {
    return NextResponse.json({ error: "전화번호는 000-0000-0000 형식으로 입력해 주세요." }, { status: 400 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "현재 신청을 받을 수 없습니다." }, { status: 500 });
  }

  const { data: config } = await admin
    .from("home_popup_config")
    .select("title, is_active, apply_enabled")
    .eq("id", 1)
    .maybeSingle();

  if (!config?.is_active || !config.apply_enabled) {
    return NextResponse.json({ error: "현재 신청을 받고 있지 않습니다." }, { status: 403 });
  }

  const { error } = await admin.from("home_popup_applications").insert([
    { name, age, gender, region, phone, popup_title: config.title ?? "" },
  ]);

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "이미 신청하신 번호입니다." }, { status: 409 });
    }
    return NextResponse.json({ error: "신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
