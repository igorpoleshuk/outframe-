import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ProposalSheet } from "@/components/proposal/sheet";
import { sampleProposal } from "@/lib/proposal";
import { DEMO_ID } from "@/lib/site";

export const metadata: Metadata = {
  title: "Пример КП",
  description:
    "Живой пример коммерческого предложения Outframe: редизайн лендинга, 180 000 ₽, 3 недели. Можно открыть, напечатать и собрать своё.",
  alternates: { canonical: "/example" },
  openGraph: {
    title: "Пример КП · Outframe",
    description: "Редизайн лендинга и система заявок — 180 000 ₽, 3 недели.",
  },
};

export default function ExamplePage() {
  const proposal = { ...sampleProposal(), id: DEMO_ID };

  return (
    <div className="print-root min-h-screen bg-pine-900">
      <header className="no-print flex items-center justify-between gap-3 border-b border-pine-800 px-4 py-3 sm:px-6">
        <Link href="/" className="text-paper">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/studio?sample=1" className="btn-ghost">
            Собрать своё
          </Link>
          <Link href={`/p/${DEMO_ID}`} className="btn-lime">
            Открыть как клиент
          </Link>
        </div>
      </header>
      <main className="px-4 py-8 sm:px-8">
        <div className="no-print mx-auto mb-6 max-w-[720px]">
          <p className="font-display text-[12px] font-semibold uppercase tracking-[0.2em] text-lime">
            Публичный пример
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
            Так выглядит КП, которое можно скинуть
          </h1>
          <p className="mt-2 text-sm text-pine-200">
            Эту страницу можно открыть с любого устройства. Не из localStorage — из самого продукта.
          </p>
        </div>
        <div className="mx-auto max-w-[720px]">
          <ProposalSheet proposal={proposal} />
        </div>
      </main>
    </div>
  );
}
