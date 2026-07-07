import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { isAuthenticated } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase-admin";

async function getCounselorId() {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    return { counselorId: null, error: "Supabase 로그인 세션이 없습니다." };
  }

  return { counselorId: session.user.id, error: null };
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const loggedIn = await isAuthenticated();
  if (!loggedIn) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const { counselorId, error: sessionError } = await getCounselorId();
  if (!counselorId) {
    return NextResponse.json({ error: sessionError }, { status: 401 });
  }

  const admin = createAdminClient();
  const supabase = admin ?? createRouteHandlerClient({ cookies });

  const { data, error } = await supabase
    .from("int_interviews")
    .select("*")
    .eq("id", params.id)
    .eq("counselors", counselorId)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!data) {
    return NextResponse.json({ error: "인터뷰를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const loggedIn = await isAuthenticated();
  if (!loggedIn) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const { counselorId, error: sessionError } = await getCounselorId();
  if (!counselorId) {
    return NextResponse.json({ error: sessionError }, { status: 401 });
  }

  const admin = createAdminClient();
  const supabase = admin ?? createRouteHandlerClient({ cookies });

  const { error } = await supabase
    .from("int_interviews")
    .delete()
    .eq("id", params.id)
    .eq("counselors", counselorId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
