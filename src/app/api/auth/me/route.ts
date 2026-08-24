import { NextResponse } from "next/server";

import { getSessionRole, isAuthenticated } from "@/lib/auth";

export async function GET() {
  const authenticated = await isAuthenticated();
  const role = authenticated ? await getSessionRole() : null;
  return NextResponse.json({ authenticated, role });
}
