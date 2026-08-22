import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { RedeemForm } from "@/components/pro/redeem-form";
import { FREE_DRAFT_LIMIT, OFFERS, PRO_UNLOCKS } from "@/lib/plan";

export const metadata: Metadata = {
  title: "Pro",
  description: "Outframe Pro — разовый Lifetime 2 490 ₽ или 990 ₽/мес. Безлимит черновиков и PDF без метки.",
};

const freePoints = [
  `${FREE_DRAFT_LIMIT} черновика в браузере`,
  "Полный редактор и ссылка клиенту",
  "Print / PDF с меткой «Собрано в Outframe · free»",
];

export default function ProPage() {
  const lifetime = OFFERS.lifetime;
  const monthly = OFFERS.monthly;

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
          <Link href={`/checkout?offer=${lifetime.id}`} className="btn-lime">
            Купить Lifetime
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 pb-20 pt-10 sm:px-8">
        <p className="font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-lime">
          Outframe Pro
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Один платёж. Чистый PDF клиенту.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-pine-200">
          Free уже собирает КП и даёт ссылку. Pro снимает лимит черновиков и метку на листе — когда
          отправляете клиенту без рамки «free».
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <article className="border border-pine-700 bg-pine-850 px-6 py-7">
            <p className="text-[11px] uppercase tracking-[0.16em] text-pine-300">Сейчас</p>
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
            <p className="text-[11px] uppercase tracking-[0.16em] text-lime">Рекомендуем</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">{lifetime.name}</h2>
            <p className="mt-1 font-display text-3xl font-semibold text-lime">
              {lifetime.priceLabel}
            </p>
            <p className="mt-1 text-sm text-pine-300">{lifetime.cadenceLabel}</p>
            <ul className="mt-5 space-y-2 text-sm text-pine-200">
              {PRO_UNLOCKS.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li>Без ежемесячной подписки</li>
            </ul>
            <Link href={`/checkout?offer=${lifetime.id}`} className="btn-lime mt-8">
              Оплатить разово
            </Link>
          </article>

          <article className="border border-pine-700 bg-pine-850 px-6 py-7">
            <p className="text-[11px] uppercase tracking-[0.16em] text-pine-300">Иначе</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">{monthly.name}</h2>
            <p className="mt-1 font-display text-3xl font-semibold text-paper">
              {monthly.priceLabel}
            </p>
            <p className="mt-1 text-sm text-pine-300">{monthly.cadenceLabel}</p>
            <ul className="mt-5 space-y-2 text-sm text-pine-200">
              {PRO_UNLOCKS.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li>Если удобнее помесячно</li>
            </ul>
            <Link href={`/checkout?offer=${monthly.id}`} className="btn-ghost mt-8">
              Оплатить месяц
            </Link>
          </article>
        </div>

        <div className="mt-10">
          <RedeemForm />
        </div>
      </main>
    </div>
  );
}
