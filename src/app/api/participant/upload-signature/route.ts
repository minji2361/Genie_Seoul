import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { isAuthenticated } from "@/lib/auth";

export async function POST(request: Request) {
  const loggedIn = await isAuthenticated();
  if (!loggedIn) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const dataUrl = typeof body?.dataUrl === "string" ? body.dataUrl : "";
  const fileName =
    typeof body?.fileName === "string" && body.fileName.trim()
      ? body.fileName.trim()
      : `agreement-${Date.now()}.png`;

  if (!dataUrl.startsWith("data:image/")) {
    return NextResponse.json({ error: "잘못된 이미지 데이터입니다." }, { status: 400 });
  }

  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json(
      {
        error:
          "Supabase 로그인 세션이 없습니다. 로그아웃 후 다시 로그인해 주세요. (코치 계정이 Supabase에 등록되어 있어야 합니다.)",
      },
      { status: 401 },
    );
  }

  try {
    const base64 = dataUrl.split(",")[1];
    if (!base64) {
      return NextResponse.json({ error: "이미지 디코딩에 실패했습니다." }, { status: 400 });
    }

    const buffer = Buffer.from(base64, "base64");
    const filePath = fileName.replace(/^signatures\//, "");

    const { error: uploadError } = await supabase.storage
      .from("signatures")
      .upload(filePath, buffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 400 },
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("signatures").getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "업로드 중 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
