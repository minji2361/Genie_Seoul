import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { isAuthenticated } from "@/lib/auth";
import { deleteSignatureFiles } from "@/lib/signature-storage";
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

  // admin 클라이언트(서비스 롤)는 RLS를 우회하므로, 관리자가 "보관" 처리한 데이터는
  // 여기서 직접 retain 조건을 걸어서 코치가 지울 수 없도록 막는다.
  const { data, error } = await supabase
    .from("participant")
    .delete()
    .eq("id", params.id)
    .eq("counselors", counselorId)
    .eq("retain", false)
    .select("id, signatureurl");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json(
      { error: "삭제할 수 없습니다. 데이터가 없거나 관리자가 보관 처리한 항목입니다." },
      { status: 403 },
    );
  }

  await deleteSignatureFiles(supabase, data.map((row) => row.signatureurl));

  return NextResponse.json({ ok: true });
}
