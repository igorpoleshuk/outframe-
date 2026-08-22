import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import {
  checkoutPath,
  DONATE_POINTS,
  getOffer,
  offerMailto,
  OWNER_EMAIL,
  payUrl,
  PRO_SUPPORT_PRICE_FULL,
  PRO_UNLOCKS,
} from "@/lib/plan";

export const metadata: Metadata = {
  title: "Поддержать",
  description: `Донат без обязательств или Pro ${PRO_SUPPORT_PRICE_FULL} — снять лимит черновиков и метку на PDF.`,
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ offer?: string }>;
}) {
  const params = await searchParams;
  const offer = getOffer(params.offer);
  const pay = payUrl(offer.id);
  const mail = offerMailto(offer.id);
  const isDonate = offer.kind === "donate";

  return (
    <div className="min-h-screen bg-pine-900">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="text-paper">
          <Logo />
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/pro" className="btn-ghost">
            Донат и Pro
          </Link>
          <Link href="/studio" className="btn-ghost">
            Студия
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 pb-20 pt-10 sm:px-8">
        <p className="font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-lime">
          {isDonate ? "Донат" : "Pro"}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">{offer.name}</h1>
        <p className="mt-3 text-base text-pine-200">
          {isDonate
            ? "Скинуть столько, сколько инструмент сэкономил. Без счёта и без подписки."
            : `${offer.priceLabel} · ${offer.cadenceLabel}. Это поддержка, не SaaS.`}
        </p>

        <article className="mt-10 border border-lime/35 bg-pine-850 px-6 py-7">
          <h2 className="font-display text-xl font-semibold">
            {isDonate ? "Как поддержать" : "Что открывается"}
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-pine-200">
            {(isDonate ? DONATE_POINTS : PRO_UNLOCKS).map((item) => (
              <li key={item}>{item}</li>
            ))}
            {isDonate ? null : <li>Ключ после перевода → активация на /pro</li>}
          </ul>
          <p className="mt-6 font-display text-3xl font-semibold text-lime">{offer.priceLabel}</p>
          <p className="mt-1 text-sm text-pine-300">{offer.cadenceLabel}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={pay || mail} className="btn-lime">
              {isDonate
                ? "Поддержать"
                : pay
                  ? `Оплатить ${offer.priceLabel}`
                  : `Написать: хочу Pro за ${PRO_SUPPORT_PRICE_FULL}`}
            </a>
            {pay ? (
              <a href={mail} className="btn-ghost">
                Написать на почту
              </a>
            ) : null}
            {isDonate ? (
              <Link href={checkoutPath("monthly")} className="btn-ghost">
                Или Pro за {PRO_SUPPORT_PRICE_FULL}
              </Link>
            ) : (
              <Link href={checkoutPath("donate")} className="btn-ghost">
                Сначала донат
              </Link>
            )}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-pine-300">
            {pay
              ? `Ссылка подключена. Если удобнее перевод — письмо на ${OWNER_EMAIL}.`
              : `Ссылка ещё не подключена. Письмо откроется на ${OWNER_EMAIL}.`}
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
