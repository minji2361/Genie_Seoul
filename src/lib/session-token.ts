// 세션 토큰의 "형식"만 다루는 순수 모듈 (Node crypto 등 런타임 종속 API 없음).
// middleware.ts(Edge 런타임)와 auth.ts(Node 런타임) 양쪽에서 공유해서,
// 서로 다른 HMAC 구현을 쓰더라도 토큰 형식이 어긋나지 않도록 한다.

export type SessionRole = "coach" | "admin";

export const SESSION_COOKIE = "genie_admin_session";
export const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000;

export function getSessionSecret(): string {
  return process.env.SESSION_SECRET ?? "genie-site-dev-secret-change-in-production";
}

export function buildSessionPayload(role: SessionRole): string {
  return `${Date.now()}:${role}`;
}

export function splitSessionToken(token: string): { payload: string; sig: string } | null {
  const dot = token.indexOf(".");
  if (dot === -1) return null;
  return { payload: token.slice(0, dot), sig: token.slice(dot + 1) };
}

export function parseSessionPayload(
  payload: string,
): { issuedAt: number; role: SessionRole } | null {
  // 콜론이 없는 예전 형식(순수 타임스탬프) 토큰은 코치 세션으로 취급한다.
  const colon = payload.indexOf(":");
  const issuedAtRaw = colon === -1 ? payload : payload.slice(0, colon);
  const role: SessionRole = colon !== -1 && payload.slice(colon + 1) === "admin" ? "admin" : "coach";

  const issuedAt = Number(issuedAtRaw);
  if (!Number.isFinite(issuedAt)) return null;
  if (Date.now() - issuedAt >= SESSION_MAX_AGE_MS) return null;

  return { issuedAt, role };
}
