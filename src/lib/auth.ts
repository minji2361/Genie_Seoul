import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

import {
  SESSION_COOKIE,
  buildSessionPayload,
  getSessionSecret,
  parseSessionPayload,
  splitSessionToken,
  type SessionRole,
} from "@/lib/session-token";

export { SESSION_COOKIE };
export type { SessionRole };

export function createSessionToken(role: SessionRole = "coach"): string {
  const payload = buildSessionPayload(role);
  const sig = createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

function parseSessionToken(
  token: string | undefined,
): { issuedAt: number; role: SessionRole } | null {
  if (!token) return null;

  const split = splitSessionToken(token);
  if (!split) return null;

  const expected = createHmac("sha256", getSessionSecret()).update(split.payload).digest("hex");

  try {
    const sigBuf = Buffer.from(split.sig, "hex");
    const expectedBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
      return null;
    }
  } catch {
    return null;
  }

  return parseSessionPayload(split.payload);
}

export function verifySessionToken(token: string | undefined): boolean {
  return parseSessionToken(token) !== null;
}

export function getSessionRoleFromToken(token: string | undefined): SessionRole | null {
  return parseSessionToken(token)?.role ?? null;
}

/** 코치 로그인 — 상담사 전원이 공유하는 계정 */
export function validateAdminCredentials(id: string, password: string): boolean {
  const adminId = process.env.ADMIN_ID?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  if (!adminId || !adminPassword) return false;

  const normalizedId = id.trim().toLowerCase();
  const normalizedAdminId = adminId.toLowerCase();

  return normalizedId === normalizedAdminId && password === adminPassword;
}

/** 관리자 로그인 — 코치 계정과 별개의 관리자 전용 계정 */
export function validateSuperAdminCredentials(id: string, password: string): boolean {
  const superAdminId = process.env.SUPER_ADMIN_ID?.trim();
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD?.trim();

  if (!superAdminId || !superAdminPassword) return false;

  const normalizedId = id.trim().toLowerCase();
  const normalizedSuperAdminId = superAdminId.toLowerCase();

  return normalizedId === normalizedSuperAdminId && password === superAdminPassword;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function getSessionRole(): Promise<SessionRole | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return getSessionRoleFromToken(token);
}

export async function isAdmin(): Promise<boolean> {
  return (await getSessionRole()) === "admin";
}

export async function isCoach(): Promise<boolean> {
  return (await getSessionRole()) === "coach";
}
