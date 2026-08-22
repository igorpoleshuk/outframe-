"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ProposalSheet } from "@/components/proposal/sheet";
import { sampleProposal, type Proposal } from "@/lib/proposal";
import { decodeShare } from "@/lib/share";
import { DEMO_ID } from "@/lib/site";
import { getDraft } from "@/lib/storage";

type PreviewAppProps = {
  id: string;
};

export function PreviewApp({ id }: PreviewAppProps) {
  const searchParams = useSearchParams();
  const shareToken = searchParams.get("d");
  const [proposal, setProposal] = useState<Proposal | null | undefined>(undefined);

  useEffect(() => {
    const fromShare = shareToken ? decodeShare(shareToken) : null;
    if (fromShare) {
      setProposal(fromShare);
      return;
    }
    if (id === DEMO_ID) {
      setProposal({ ...sampleProposal(), id: DEMO_ID });
      return;
    }
    setProposal(getDraft(id));
  }, [id, shareToken]);

  if (proposal === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pine-900 text-pine-200">
        Открываем превью…
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-pine-900 px-6 text-center">
        <Logo />
        <h1 className="mt-8 font-display text-3xl font-semibold">Черновик не найден</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-pine-200">
          Локальный черновик есть только в том браузере, где его собрали. Откройте публичный пример
          или пришлите ссылку с параметром шаринга.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/example" className="btn-ghost">
            Смотреть пример
          </Link>
          <Link href="/studio" className="btn-lime">
            В студию
          </Link>
        </div>
      </div>
    );
  }

  const canEditLocally = id !== DEMO_ID && !shareToken;

  return (
    <div className="print-root min-h-screen bg-pine-900">
      <header className="no-print flex items-center justify-between gap-3 border-b border-pine-800 px-4 py-3 sm:px-6">
        <Link href="/" className="text-paper">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          {canEditLocally ? (
            <Link href={`/studio?id=${proposal.id}`} className="btn-ghost">
              Править
            </Link>
          ) : (
            <Link href="/studio?sample=1" className="btn-ghost">
              Собрать своё
            </Link>
          )}
          <button type="button" className="btn-lime" onClick={() => window.print()}>
            Print / PDF
          </button>
        </div>
      </header>
      <main className="px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-[720px]">
          <ProposalSheet proposal={proposal} />
        </div>
      </main>
    </div>
  );
}
