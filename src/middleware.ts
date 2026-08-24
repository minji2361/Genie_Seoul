import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  SESSION_COOKIE,
  buildSessionPayload,
  getSessionSecret,
  parseSessionPayload,
  splitSessionToken,
  type SessionRole,
} from "@/lib/session-token";

// 미들웨어는 Edge 런타임에서 실행되어 Node.js의 crypto 모듈을 쓸 수 없다.
// 그래서 auth.ts(Node 전용)를 그대로 가져오지 않고, Web Crypto(crypto.subtle)로
// 별도의 서명/검증 로직을 둔다. 토큰 "형식"은 session-token.ts를 공유해서
// 로그인 API(Node)에서 만든 토큰과 여기서 만든 토큰이 서로 호환되게 한다.

const SESSION_MAX_AGE_SECONDS = 12 * 60 * 60;

async function hmacSha256Hex(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function verifyEdgeToken(
  token: string | undefined,
): Promise<{ issuedAt: number; role: SessionRole } | null> {
  if (!token) return null;

  const split = splitSessionToken(token);
  if (!split) return null;

  const expected = await hmacSha256Hex(getSessionSecret(), split.payload);
  if (!timingSafeEqualHex(split.sig, expected)) return null;

  return parseSessionPayload(split.payload);
}

async function createEdgeToken(role: SessionRole): Promise<string> {
  const payload = buildSessionPayload(role);
  const sig = await hmacSha256Hex(getSessionSecret(), payload);
  return `${payload}.${sig}`;
}

function renewSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(SESSION_COOKIE, token, {
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
  const session = await verifyEdgeToken(token);
  const loggedIn = session !== null;
  const role = session?.role ?? null;

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/interview")) {
    if (!loggedIn) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // 관리자 계정은 코치 화면(대시보드/인터뷰)에 접근할 수 없다.
    if (role !== "coach") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!loggedIn) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // 코치 계정은 관리자 화면에 접근할 수 없다.
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname === "/login" && loggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();

  // 활동 중인 사용자는 매 요청마다 세션 만료 시각을 12시간 뒤로 늦춰
  // 작업 중간에 강제 로그아웃되지 않도록 한다 (슬라이딩 세션).
  if (loggedIn && role) {
    renewSessionCookie(response, await createEdgeToken(role));
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/interview/:path*",
    "/admin/:path*",
    "/login",
    "/api/interview/:path*",
    "/api/participant/:path*",
    "/api/admin/:path*",
    "/api/auth/me",
  ],
};
