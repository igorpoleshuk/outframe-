"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ProposalSheet } from "@/components/proposal/sheet";
import {
  createProposal,
  createScopeItem,
  formatUpdatedAt,
  sampleProposal,
  type Currency,
  type Proposal,
} from "@/lib/proposal";
import { deleteDraft, getDraft, getLastOpen, listDrafts, saveDraft } from "@/lib/storage";

function printProposal() {
  window.print();
}

export function StudioApp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedId = searchParams.get("id");
  const wantSample = searchParams.get("sample") === "1";
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [drafts, setDrafts] = useState<Proposal[]>([]);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [showDrafts, setShowDrafts] = useState(false);
  const skipSave = useRef(true);

  const refreshDrafts = useCallback(() => {
    setDrafts(listDrafts());
  }, []);

  useEffect(() => {
    const existing = requestedId ? getDraft(requestedId) : null;
    const last = getLastOpen();
    const lastDraft = last ? getDraft(last) : null;
    const initial = existing ?? (wantSample ? sampleProposal() : lastDraft ?? sampleProposal());
    const persisted = saveDraft(initial);
    skipSave.current = true;
    setProposal(persisted);
    setSavedAt(persisted.updatedAt);
    refreshDrafts();
    if (requestedId !== persisted.id || wantSample) {
      router.replace(`/studio?id=${persisted.id}`);
    }
  }, [refreshDrafts, requestedId, router, wantSample]);

  useEffect(() => {
    if (!proposal) return;
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    const timer = window.setTimeout(() => {
      const saved = saveDraft(proposal);
      setSavedAt(saved.updatedAt);
      refreshDrafts();
    }, 280);
    return () => window.clearTimeout(timer);
  }, [proposal, refreshDrafts]);

  const update = useCallback(<K extends keyof Proposal>(key: K, value: Proposal[K]) => {
    setProposal((current) => (current ? { ...current, [key]: value } : current));
  }, []);

  const updateScope = useCallback((id: string, key: "title" | "detail", value: string) => {
    setProposal((current) => {
      if (!current) return current;
      return {
        ...current,
        scope: current.scope.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
      };
    });
  }, []);

  const openDraft = useCallback(
    (id: string) => {
      router.replace(`/studio?id=${id}`);
      setShowDrafts(false);
    },
    [router],
  );

  const createNew = useCallback(() => {
    const next = saveDraft(createProposal({ title: "Новое предложение" }));
    router.replace(`/studio?id=${next.id}`);
    setShowDrafts(false);
  }, [router]);

  const removeDraft = useCallback(
    (id: string) => {
      deleteDraft(id);
      refreshDrafts();
      if (proposal?.id === id) {
        const remaining = listDrafts();
        if (remaining[0]) {
          router.replace(`/studio?id=${remaining[0].id}`);
        } else {
          createNew();
        }
      }
    },
    [createNew, proposal?.id, refreshDrafts, router],
  );

  const status = useMemo(() => {
    if (!savedAt) return "Черновик";
    return `Сохранено ${formatUpdatedAt(savedAt)}`;
  }, [savedAt]);

  if (!proposal) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pine-900 text-pine-200">
        Собираем студию…
      </div>
    );
  }

  return (
    <div className="print-root min-h-screen bg-pine-900">
      <header className="no-print sticky top-0 z-20 border-b border-pine-800 bg-pine-950/90 backdrop-blur">
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="shrink-0 text-paper">
              <Logo />
            </Link>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate font-display text-sm font-semibold">{proposal.title}</p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-pine-300">{status}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button type="button" className="btn-ghost" onClick={() => setShowDrafts((v) => !v)}>
              Черновики
            </button>
            <button type="button" className="btn-ghost" onClick={createNew}>
              Новый
            </button>
            <Link href={`/p/${proposal.id}`} className="btn-ghost">
              Превью
            </Link>
            <button type="button" className="btn-lime" onClick={printProposal}>
              Print / PDF
            </button>
          </div>
        </div>
      </header>

      {showDrafts ? (
        <div className="no-print border-b border-pine-800 bg-pine-850 px-4 py-4 sm:px-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-display text-sm font-semibold">Черновики в этом браузере</p>
            <button type="button" className="text-sm text-pine-300 hover:text-lime" onClick={() => setShowDrafts(false)}>
              Закрыть
            </button>
          </div>
          <ul className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {drafts.map((draft) => (
              <li
                key={draft.id}
                className={`flex items-start justify-between gap-3 border px-3 py-3 ${
                  draft.id === proposal.id ? "border-lime/50 bg-pine-900" : "border-pine-700"
                }`}
              >
                <button type="button" className="min-w-0 text-left" onClick={() => openDraft(draft.id)}>
                  <p className="truncate font-display text-sm font-semibold">
                    {draft.title || "Без названия"}
                  </p>
                  <p className="mt-1 text-xs text-pine-300">{formatUpdatedAt(draft.updatedAt)}</p>
                </button>
                <button
                  type="button"
                  className="text-xs uppercase tracking-[0.12em] text-pine-300 hover:text-lime"
                  onClick={() => removeDraft(draft.id)}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid lg:grid-cols-[minmax(320px,420px)_1fr]">
        <form
          className="no-print space-y-7 overflow-y-auto border-r border-pine-800 px-4 py-6 sm:px-6 lg:h-[calc(100vh-61px)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <section>
            <h2 className="font-display text-lg font-semibold">Проект</h2>
            <label className="mt-4 block">
              <span className="field-label">Название</span>
              <input
                className="field-input"
                value={proposal.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </label>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label>
                <span className="field-label">Клиент</span>
                <input
                  className="field-input"
                  value={proposal.clientName}
                  onChange={(e) => update("clientName", e.target.value)}
                />
              </label>
              <label>
                <span className="field-label">Компания</span>
                <input
                  className="field-input"
                  value={proposal.clientCompany}
                  onChange={(e) => update("clientCompany", e.target.value)}
                />
              </label>
            </div>
            <label className="mt-3 block">
              <span className="field-label">Суть</span>
              <textarea
                className="field-textarea"
                value={proposal.summary}
                onChange={(e) => update("summary", e.target.value)}
              />
            </label>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold">Исполнитель</h2>
            <div className="mt-4 grid gap-3">
              <label>
                <span className="field-label">Имя</span>
                <input
                  className="field-input"
                  value={proposal.freelancerName}
                  onChange={(e) => update("freelancerName", e.target.value)}
                />
              </label>
              <label>
                <span className="field-label">Роль</span>
                <input
                  className="field-input"
                  value={proposal.freelancerTitle}
                  onChange={(e) => update("freelancerTitle", e.target.value)}
                />
              </label>
              <label>
                <span className="field-label">Контакты</span>
                <input
                  className="field-input"
                  value={proposal.freelancerContacts}
                  onChange={(e) => update("freelancerContacts", e.target.value)}
                />
              </label>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-semibold">Scope</h2>
              <button
                type="button"
                className="text-sm text-lime hover:underline"
                onClick={() => update("scope", [...proposal.scope, createScopeItem()])}
              >
                + пункт
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {proposal.scope.map((item, index) => (
                <div key={item.id} className="border border-pine-700 bg-pine-850 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-display text-xs font-semibold text-lime">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {proposal.scope.length > 1 ? (
                      <button
                        type="button"
                        className="text-xs uppercase tracking-[0.12em] text-pine-300 hover:text-lime"
                        onClick={() =>
                          update(
                            "scope",
                            proposal.scope.filter((entry) => entry.id !== item.id),
                          )
                        }
                      >
                        Убрать
                      </button>
                    ) : null}
                  </div>
                  <input
                    className="field-input"
                    placeholder="Название блока"
                    value={item.title}
                    onChange={(e) => updateScope(item.id, "title", e.target.value)}
                  />
                  <textarea
                    className="field-textarea mt-2 min-h-[72px]"
                    placeholder="Что входит"
                    value={item.detail}
                    onChange={(e) => updateScope(item.id, "detail", e.target.value)}
                  />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold">Цена</h2>
            <div className="mt-4 grid grid-cols-[1fr_7rem] gap-3">
              <label>
                <span className="field-label">Сумма</span>
                <input
                  className="field-input"
                  inputMode="numeric"
                  value={proposal.price}
                  onChange={(e) => update("price", e.target.value)}
                />
              </label>
              <label>
                <span className="field-label">Валюта</span>
                <select
                  className="field-input"
                  value={proposal.currency}
                  onChange={(e) => update("currency", e.target.value as Currency)}
                >
                  <option value="RUB">₽</option>
                  <option value="USD">$</option>
                  <option value="EUR">€</option>
                </select>
              </label>
            </div>
            <label className="mt-3 block">
              <span className="field-label">Как платим</span>
              <textarea
                className="field-textarea min-h-[72px]"
                value={proposal.priceNote}
                onChange={(e) => update("priceNote", e.target.value)}
              />
            </label>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold">Срок</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label>
                <span className="field-label">Длительность</span>
                <input
                  className="field-input"
                  value={proposal.timeline}
                  onChange={(e) => update("timeline", e.target.value)}
                />
              </label>
              <label>
                <span className="field-label">Оферта действует</span>
                <input
                  className="field-input"
                  value={proposal.validUntil}
                  onChange={(e) => update("validUntil", e.target.value)}
                />
              </label>
            </div>
            <label className="mt-3 block">
              <span className="field-label">Комментарий к сроку</span>
              <textarea
                className="field-textarea min-h-[72px]"
                value={proposal.timelineNote}
                onChange={(e) => update("timelineNote", e.target.value)}
              />
            </label>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold">Terms</h2>
            <label className="mt-4 block">
              <span className="field-label">Условия</span>
              <textarea
                className="field-textarea min-h-[140px]"
                value={proposal.terms}
                onChange={(e) => update("terms", e.target.value)}
              />
            </label>
          </section>
        </form>

        <div className="bg-[linear-gradient(180deg,#0d221d_0%,#0a1a16_40%)] px-4 py-8 sm:px-8">
          <div className="no-print mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-pine-300">
            <span>Live preview</span>
            <span>A4 · клиентский лист</span>
          </div>
          <div className="mx-auto max-w-[720px]">
            <ProposalSheet proposal={proposal} />
          </div>
        </div>
      </div>
    </div>
  );
}
