import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { FREE_DRAFT_LIMIT, PRO_PRICE_LABEL, WAITLIST_EMAIL, WAITLIST_MAILTO } from "@/lib/plan";

export const metadata: Metadata = {
  title: "Pro",
  description: "Outframe Pro — больше черновиков и PDF без водяного знака.",
};

const freePoints = [
  `${FREE_DRAFT_LIMIT} черновика в браузере`,
  "Live preview и Print / PDF",
  "Водяной знак «Собрано в Outframe · free»",
];

const proPoints = [
  "Больше черновиков без потолка free",
  "PDF без водяного знака",
  "Приоритет в списке следующих фич",
];

export default function ProPage() {
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
          <a href={WAITLIST_MAILTO} className="btn-lime">
            В waitlist
          </a>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 pb-20 pt-10 sm:px-8">
        <p className="font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-lime">
          Outframe Pro
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Рамка без лимита и без водяного знака
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-pine-200">
          Free оставляет два черновика и метку на PDF. Pro снимает это, когда будете готовы
          отправлять КП клиентам без рамки «free».
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
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

          <article className="border border-lime/40 bg-pine-850 px-6 py-7">
            <p className="text-[11px] uppercase tracking-[0.16em] text-lime">Следующий шаг</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">Pro</h2>
            <p className="mt-1 font-display text-3xl font-semibold text-lime">{PRO_PRICE_LABEL}</p>
            <ul className="mt-5 space-y-2 text-sm text-pine-200">
              {proPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a href={WAITLIST_MAILTO} className="btn-lime mt-8">
              Написать в waitlist
            </a>
            <p className="mt-3 text-xs text-pine-300">
              Письмо откроется на {WAITLIST_EMAIL}. Оплата ещё не подключена.
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}
