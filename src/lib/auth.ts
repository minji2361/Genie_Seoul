import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "genie_admin_session";
const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000;

function getSessionSecret(): string {
  return process.env.SESSION_SECRET ?? "genie-site-dev-secret-change-in-production";
}

export function createSessionToken(): string {
  const payload = String(Date.now());
  const sig = createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const dot = token.indexOf(".");
  if (dot === -1) return false;

  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", getSessionSecret()).update(payload).digest("hex");

  try {
    const sigBuf = Buffer.from(sig, "hex");
    const expectedBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
      return false;
    }
  } catch {
    return false;
  }

  const issuedAt = Number(payload);
  if (!Number.isFinite(issuedAt)) return false;

  return Date.now() - issuedAt < SESSION_MAX_AGE_MS;
}

export function validateAdminCredentials(id: string, password: string): boolean {
  const adminId = process.env.ADMIN_ID?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  if (!adminId || !adminPassword) return false;

  const normalizedId = id.trim().toLowerCase();
  const normalizedAdminId = adminId.toLowerCase();

  return normalizedId === normalizedAdminId && password === adminPassword;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
