import { NextResponse } from "next/server";
import { adminTokenMatches, issueLicense, parseIssueOffer } from "@/lib/license-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!adminTokenMatches(request.headers.get("authorization"))) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { offer?: unknown } | null;
  const offer = parseIssueOffer(body?.offer ?? "monthly");
  if (!offer) {
    return NextResponse.json({ ok: false, error: "offer" }, { status: 400 });
  }

  try {
    const key = issueLicense(offer);
    return NextResponse.json({ ok: true, offer, key });
  } catch {
    return NextResponse.json({ ok: false, error: "secret" }, { status: 500 });
  }
}
