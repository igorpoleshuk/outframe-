"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ProposalSheet } from "@/components/proposal/sheet";
import { type Proposal } from "@/lib/proposal";
import { getDraft } from "@/lib/storage";

type PreviewAppProps = {
  id: string;
};

export function PreviewApp({ id }: PreviewAppProps) {
  const [proposal, setProposal] = useState<Proposal | null | undefined>(undefined);

  useEffect(() => {
    setProposal(getDraft(id));
  }, [id]);

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
          Outframe хранит предложения в localStorage этого браузера. Откройте студию там, где
          собирали КП, или создайте новое.
        </p>
        <Link href="/studio" className="btn-lime mt-6">
          В студию
        </Link>
      </div>
    );
  }

  return (
    <div className="print-root min-h-screen bg-pine-900">
      <header className="no-print flex items-center justify-between gap-3 border-b border-pine-800 px-4 py-3 sm:px-6">
        <Link href="/" className="text-paper">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <Link href={`/studio?id=${proposal.id}`} className="btn-ghost">
            Править
          </Link>
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
