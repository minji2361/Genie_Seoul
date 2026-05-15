import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  SESSION_COOKIE,
  createSessionToken,
  validateAdminCredentials,
} from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!id || !password) {
    return NextResponse.json({ error: "아이디와 비밀번호를 입력해 주세요." }, { status: 400 });
  }

  if (!validateAdminCredentials(id, password)) {
    return NextResponse.json({ error: "아이디 또는 비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  let supabaseConnected = false;
  let supabaseError: string | null = null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    supabaseError = "NEXT_PUBLIC_SUPABASE_URL / ANON_KEY가 .env.local에 설정되지 않았습니다.";
  } else if (!id.includes("@")) {
    supabaseError = "이메일 형식의 아이디가 필요합니다.";
  } else {
    const supabase = createRouteHandlerClient({ cookies });

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: id,
      password,
    });

    if (!signInError && signInData.session) {
      supabaseConnected = true;
    } else {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: id,
        password,
      });

      if (!signUpError && signUpData.user) {
        const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
          email: id,
          password,
        });
        if (!retryError && retryData.session) {
          supabaseConnected = true;
        } else {
          supabaseError =
            retryError?.message ??
            "회원가입은 되었지만 로그인에 실패했습니다. Supabase에서 이메일 인증(Confirm)을 끄거나 사용자를 확인해 주세요.";
        }
      } else if (signUpError?.message?.includes("already") || signUpError?.message?.includes("registered")) {
        supabaseError =
          "Supabase에 jn@jn.com 계정은 있지만 비밀번호가 일치하지 않습니다. Supabase 대시보드 → Authentication → Users → 해당 사용자 → Reset password 를 Jn1234! 로 맞춘 뒤 다시 로그인하세요.";
      } else if (signInError?.message?.includes("Invalid login") || signInError?.message?.includes("invalid_credentials")) {
        supabaseError =
          "Supabase 비밀번호가 .env.local 의 Jn1234! 와 다릅니다. Supabase 대시보드에서 비밀번호를 재설정해 주세요.";
      } else {
        supabaseError =
          signInError?.message ??
          signUpError?.message ??
          "Supabase 로그인/가입에 실패했습니다.";
      }
    }

    if (supabaseConnected) {
      const { data: sessionData } = await supabase.auth.getSession();
      const uid = sessionData.session?.user.id;
      const email = sessionData.session?.user.email ?? id;
      if (uid) {
        await ensureCounselorRow(supabase, uid, email);
      }
    }
  }

  const response = NextResponse.json({
    ok: true,
    supabaseConnected,
    supabaseError: supabaseConnected ? null : supabaseError,
  });

  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 12 * 60 * 60,
  });

  return response;
}

async function ensureCounselorRow(
  supabase: ReturnType<typeof createRouteHandlerClient>,
  userId: string,
  email: string,
) {
  const { data: existing } = await supabase
    .from("counselors")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) return;

  await supabase.from("counselors").insert([
    {
      user_id: userId,
      name: email.split("@")[0] || "코치",
      email,
      region: "미지정",
    },
  ]);
}
