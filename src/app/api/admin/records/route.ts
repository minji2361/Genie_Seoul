import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/auth";
import { deleteSignatureFiles } from "@/lib/signature-storage";
import { createAdminClient } from "@/lib/supabase-admin";

type DeleteBody = {
  participantIds?: unknown;
  interviewIds?: unknown;
};

function toIdArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string" && v.length > 0);
}

export async function DELETE(request: Request) {
  const authorized = await isAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as DeleteBody | null;
  const participantIds = toIdArray(body?.participantIds);
  const interviewIds = toIdArray(body?.interviewIds);

  if (participantIds.length === 0 && interviewIds.length === 0) {
    return NextResponse.json({ error: "삭제할 항목이 없습니다." }, { status: 400 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY가 설정되지 않아 삭제할 수 없습니다." },
      { status: 500 },
    );
  }

  let deletedParticipants = 0;
  let deletedInterviews = 0;
  const skippedIds: string[] = [];

  if (participantIds.length > 0) {
    const { data: deleted, error } = await admin
      .from("participant")
      .delete()
      .in("id", participantIds)
      .eq("retain", false)
      .select("id, signatureurl");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    deletedParticipants = deleted?.length ?? 0;
    const deletedIdSet = new Set((deleted ?? []).map((row) => row.id));
    skippedIds.push(...participantIds.filter((id) => !deletedIdSet.has(id)));

    await deleteSignatureFiles(admin, (deleted ?? []).map((row) => row.signatureurl));
  }

  if (interviewIds.length > 0) {
    const { data: deleted, error } = await admin
      .from("int_interviews")
      .delete()
      .in("id", interviewIds)
      .eq("retain", false)
      .select("id, signatureurl");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    deletedInterviews = deleted?.length ?? 0;
    const deletedIdSet = new Set((deleted ?? []).map((row) => row.id));
    skippedIds.push(...interviewIds.filter((id) => !deletedIdSet.has(id)));

    await deleteSignatureFiles(admin, (deleted ?? []).map((row) => row.signatureurl));
  }

  return NextResponse.json({
    deletedParticipants,
    deletedInterviews,
    skippedRetainCount: skippedIds.length,
  });
}
