import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import {
  getOffer,
  invoiceMailto,
  OWNER_EMAIL,
  payUrl,
  PRO_UNLOCKS,
} from "@/lib/plan";

export const metadata: Metadata = {
  title: "Счёт",
  description: "Счёт на Outframe Pro: Lifetime 2 490 ₽ разово или 990 ₽/мес.",
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ offer?: string }>;
}) {
  const params = await searchParams;
  const offer = getOffer(params.offer);
  const pay = payUrl(offer.id);
  const invoice = invoiceMailto(offer);

  return (
    <div className="min-h-screen bg-pine-900">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="text-paper">
          <Logo />
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/pro" className="btn-ghost">
            Тарифы
          </Link>
          <Link href="/studio" className="btn-ghost">
            Студия
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 pb-20 pt-10 sm:px-8">
        <p className="font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-lime">
          Счёт
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
          {offer.name}
        </h1>
        <p className="mt-3 text-base text-pine-200">
          {offer.priceLabel} · {offer.cadenceLabel}
          {offer.recommended ? " · основной тариф" : ""}
        </p>

        <article className="mt-10 border border-lime/35 bg-pine-850 px-6 py-7">
          <h2 className="font-display text-xl font-semibold">Что открывается</h2>
          <ul className="mt-4 space-y-2 text-sm text-pine-200">
            {PRO_UNLOCKS.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>Ключ после оплаты → активация на /pro</li>
          </ul>
          <p className="mt-6 font-display text-3xl font-semibold text-lime">{offer.priceLabel}</p>
          <p className="mt-1 text-sm text-pine-300">{offer.cadenceLabel}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {pay ? (
              <a href={pay} className="btn-lime">
                Оплатить {offer.priceLabel}
              </a>
            ) : (
              <a href={invoice} className="btn-lime">
                Открыть письмо со счётом
              </a>
            )}
            {pay ? (
              <a href={invoice} className="btn-ghost">
                Счёт на почту
              </a>
            ) : null}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-pine-300">
            {pay
              ? `Ссылка на оплату подключена. Если удобнее перевод — письмо на ${OWNER_EMAIL}.`
              : `Оплата по ссылке ещё не подключена. Письмо откроется на ${OWNER_EMAIL}: тариф, сумма и запрос ключа.`}
          </p>
        </article>

        <p className="mt-6 text-sm text-pine-300">
          Ключ уже есть?{" "}
          <Link href="/pro" className="text-lime hover:underline">
            Активировать на /pro
          </Link>
        </p>
      </main>
    </div>
  );
}
