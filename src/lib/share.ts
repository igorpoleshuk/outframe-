import { type Proposal } from "./proposal";

export function encodeShare(proposal: Proposal): string {
  const json = JSON.stringify(proposal);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decodeShare(token: string): Proposal | null {
  try {
    const padded = token.replace(/-/g, "+").replace(/_/g, "/");
    const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
    const binary = atob(padded + pad);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes)) as Proposal;
    if (!parsed || typeof parsed.id !== "string" || typeof parsed.title !== "string") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function sharePath(proposal: Proposal): string {
  return `/p/${proposal.id}?d=${encodeShare(proposal)}`;
}
