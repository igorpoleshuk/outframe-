import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { OFFERS, type OfferId } from "./plan";

const BODY_HEX_LENGTH = 22;
const ID_HEX_LENGTH = 12;
const SIG_HEX_LENGTH = 10;

function hmacHex(secret: string, payload: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function groupHex(hex: string): string {
  return hex
    .toUpperCase()
    .replace(/(.{4})/g, "$1-")
    .replace(/-$/, "");
}

function normalizeKey(key: string): string {
  return key.trim().toUpperCase().replace(/\s+/g, "");
}

function allowlistKeys(): string[] {
  return (process.env.PRO_LICENSE_KEYS ?? "")
    .split(",")
    .map((item) => normalizeKey(item))
    .filter(Boolean);
}

function offerFromPrefix(normalized: string): OfferId {
  return normalized.startsWith(`${OFFERS.monthly.keyPrefix}-`) ||
    normalized.startsWith(OFFERS.monthly.keyPrefix)
    ? "monthly"
    : "lifetime";
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function formatLicenseKey(offer: OfferId, idHex: string, sigHex: string): string {
  return `${OFFERS[offer].keyPrefix}-${groupHex(idHex + sigHex)}`;
}

export function issueLicense(offer: OfferId): string {
  const secret = process.env.LICENSE_SECRET?.trim();
  if (!secret) {
    throw new Error("LICENSE_SECRET is not set");
  }
  const id = randomBytes(ID_HEX_LENGTH / 2).toString("hex");
  const sig = hmacHex(secret, `${OFFERS[offer].keyPrefix}:${id}`).slice(0, SIG_HEX_LENGTH);
  return formatLicenseKey(offer, id, sig);
}

export function verifyLicense(
  key: string,
): { ok: true; offer: OfferId } | { ok: false; error: "missing" | "invalid" } {
  const normalized = normalizeKey(key);
  if (!normalized) return { ok: false, error: "missing" };

  if (allowlistKeys().includes(normalized)) {
    return { ok: true, offer: offerFromPrefix(normalized) };
  }

  const offer = offerFromPrefix(normalized);
  const prefix = OFFERS[offer].keyPrefix;
  if (!normalized.startsWith(`${prefix}-`)) {
    return { ok: false, error: "invalid" };
  }

  const secret = process.env.LICENSE_SECRET?.trim();
  if (!secret) return { ok: false, error: "invalid" };

  const body = normalized.slice(prefix.length + 1).replace(/-/g, "").toLowerCase();
  if (body.length !== BODY_HEX_LENGTH || !/^[0-9a-f]+$/.test(body)) {
    return { ok: false, error: "invalid" };
  }

  const id = body.slice(0, ID_HEX_LENGTH);
  const sig = body.slice(ID_HEX_LENGTH);
  const expected = hmacHex(secret, `${prefix}:${id}`).slice(0, SIG_HEX_LENGTH);
  if (!safeEqual(sig, expected)) {
    return { ok: false, error: "invalid" };
  }

  return { ok: true, offer };
}

export function adminTokenMatches(header: string | null): boolean {
  const token = process.env.LICENSE_ADMIN_TOKEN?.trim() ?? "";
  if (!token || !header?.startsWith("Bearer ")) return false;
  const got = header.slice("Bearer ".length);
  return safeEqual(got, token);
}
