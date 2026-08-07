import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SESSION_COOKIE, createSessionToken, verifySessionToken } from "@/lib/auth";

const SESSION_MAX_AGE_SECONDS = 12 * 60 * 60;

function renewSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const loggedIn = verifySessionToken(token);

  if (pathname.startsWith("/dashboard") && !loggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/interview") && !loggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && loggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();

  // 활동 중인 사용자는 매 요청마다 세션 만료 시각을 12시간 뒤로 늦춰
  // 작업 중간에 강제 로그아웃되지 않도록 한다 (슬라이딩 세션).
  if (loggedIn) {
    renewSessionCookie(response);
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/interview/:path*",
    "/login",
    "/api/interview/:path*",
    "/api/participant/:path*",
    "/api/auth/me",
  ],
};
