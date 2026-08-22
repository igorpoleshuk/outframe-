import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { RedeemForm } from "@/components/pro/redeem-form";
import {
  checkoutPath,
  DONATE_POINTS,
  FREE_DRAFT_LIMIT,
  OFFERS,
  OWNER_EMAIL,
  PRO_SUPPORT_PRICE_FULL,
  PRO_UNLOCKS,
} from "@/lib/plan";

export const metadata: Metadata = {
  title: "Донат и Pro",
  description: `Free уже собирает КП. Донат — без обязательств. Pro ${PRO_SUPPORT_PRICE_FULL} снимает лимит черновиков и метку на PDF.`,
};

const freePoints = [
  `${FREE_DRAFT_LIMIT} черновика в браузере`,
  "Полный редактор, ссылка клиенту и печать",
  "Print / PDF с меткой «Собрано в Outframe · free»",
];

export default function ProPage() {
  const donate = OFFERS.donate;
  const pro = OFFERS.monthly;

  return (
    <div className="min-h-screen bg-pine-900">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="text-paper">
          <Logo />
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/studio" className="btn-ghost">
            Студия
          </Link>
          <Link href={checkoutPath(donate.id)} className="btn-lime">
            Поддержать
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 pb-20 pt-10 sm:px-8">
        <p className="font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-lime">
          Донат / поддержать
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Free — это продукт. Донат — если рамка сэкономила время.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-pine-200">
          Два черновика, ссылка клиенту и печать уже работают без аккаунта. Скиньте столько, сколько
          инструмент сэкономил. Pro за {PRO_SUPPORT_PRICE_FULL} — необязательная поддержка, не
          подписка SaaS.
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <article className="border border-pine-700 bg-pine-850 px-6 py-7">
            <p className="text-[11px] uppercase tracking-[0.16em] text-pine-300">Продукт</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">Free</h2>
            <p className="mt-1 font-display text-3xl font-semibold text-paper">0 ₽</p>
            <ul className="mt-5 space-y-2 text-sm text-pine-200">
              {freePoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href="/studio" className="btn-ghost mt-8">
              Остаться на free
            </Link>
          </article>

          <article className="border border-lime/50 bg-pine-850 px-6 py-7">
            <p className="text-[11px] uppercase tracking-[0.16em] text-lime">Главное</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">{donate.name}</h2>
            <p className="mt-1 font-display text-3xl font-semibold text-lime">{donate.priceLabel}</p>
            <p className="mt-1 text-sm text-pine-300">{donate.cadenceLabel}</p>
            <ul className="mt-5 space-y-2 text-sm text-pine-200">
              {DONATE_POINTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href={checkoutPath(donate.id)} className="btn-lime mt-8">
              Поддержать
            </Link>
          </article>

          <article className="border border-pine-700 bg-pine-850 px-6 py-7">
            <p className="text-[11px] uppercase tracking-[0.16em] text-pine-300">По желанию</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">{pro.name}</h2>
            <p className="mt-1 font-display text-3xl font-semibold text-paper">{pro.priceLabel}</p>
            <p className="mt-1 text-sm text-pine-300">{pro.cadenceLabel}</p>
            <ul className="mt-5 space-y-2 text-sm text-pine-200">
              {PRO_UNLOCKS.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li>Это поддержка, не тариф SaaS</li>
            </ul>
            <Link href={checkoutPath(pro.id)} className="btn-ghost mt-8">
              Хочу Pro за {PRO_SUPPORT_PRICE_FULL}
            </Link>
          </article>
        </div>

        <p className="mt-6 text-sm text-pine-300">
          Письмо откроется на {OWNER_EMAIL}. Ключ после перевода активируется ниже.
        </p>

        <div className="mt-10">
          <RedeemForm />
        </div>
      </main>
    </div>
  );
}
