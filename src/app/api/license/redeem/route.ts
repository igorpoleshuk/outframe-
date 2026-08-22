import { NextResponse } from "next/server";
import { verifyLicense } from "@/lib/license-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { key?: unknown } | null;
  const key = typeof body?.key === "string" ? body.key : "";
  const result = verifyLicense(key);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, offer: result.offer });
}
