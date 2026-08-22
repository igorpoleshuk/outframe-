import { type Proposal } from "./proposal";

export const STORAGE_KEY = "outframe.drafts.v1";
export const LAST_OPEN_KEY = "outframe.lastOpen.v1";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readAll(): Proposal[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Proposal[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(drafts: Proposal[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
}

export function listDrafts(): Proposal[] {
  return readAll().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getDraft(id: string): Proposal | null {
  return readAll().find((item) => item.id === id) ?? null;
}

export function saveDraft(proposal: Proposal): Proposal {
  const next = { ...proposal, updatedAt: Date.now() };
  const drafts = readAll();
  const index = drafts.findIndex((item) => item.id === next.id);
  if (index >= 0) {
    drafts[index] = next;
  } else {
    drafts.unshift(next);
  }
  writeAll(drafts);
  setLastOpen(next.id);
  return next;
}

export function deleteDraft(id: string) {
  writeAll(readAll().filter((item) => item.id !== id));
  if (getLastOpen() === id) {
    window.localStorage.removeItem(LAST_OPEN_KEY);
  }
}

export function setLastOpen(id: string) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(LAST_OPEN_KEY, id);
}

export function getLastOpen(): string | null {
  if (!canUseStorage()) return null;
  return window.localStorage.getItem(LAST_OPEN_KEY);
}
