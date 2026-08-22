"use client";

import { useCallback, useEffect, useState } from "react";
import { isOfferId, type OfferId } from "./plan";

export const ENTITLEMENT_KEY = "outframe.entitlement.v1";

export type Entitlement = {
  offer: OfferId;
  key: string;
  redeemedAt: number;
};

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readEntitlement(): Entitlement | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(ENTITLEMENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Entitlement;
    if (!parsed || !isOfferId(parsed.offer) || typeof parsed.key !== "string") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeEntitlement(entitlement: Entitlement) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(ENTITLEMENT_KEY, JSON.stringify(entitlement));
}

export function clearEntitlement() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(ENTITLEMENT_KEY);
}

export function hasProEntitlement(): boolean {
  return readEntitlement() !== null;
}

export function useEntitlement() {
  const [entitlement, setEntitlement] = useState<Entitlement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setEntitlement(readEntitlement());
    setReady(true);
  }, []);

  const redeem = useCallback(async (key: string) => {
    const response = await fetch("/api/license/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    const data = (await response.json().catch(() => null)) as
      | { ok: true; offer: OfferId }
      | { ok: false; error?: string }
      | null;
    if (!data || !data.ok || !isOfferId(data.offer)) {
      return { ok: false as const, error: data && "error" in data ? data.error : "invalid" };
    }
    const next: Entitlement = {
      offer: data.offer,
      key: key.trim(),
      redeemedAt: Date.now(),
    };
    writeEntitlement(next);
    setEntitlement(next);
    return { ok: true as const, offer: data.offer };
  }, []);

  return {
    entitlement,
    isPro: entitlement !== null,
    offer: entitlement?.offer ?? null,
    ready,
    redeem,
  };
}
