import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ProposalSheet } from "@/components/proposal/sheet";
import { sampleProposal } from "@/lib/proposal";
import { DEMO_ID, SITE_URL } from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "Собери рамку",
    text: "Проект, scope, цифра, срок и terms — в одном редакторе, без простыни в Docs.",
  },
  {
    n: "02",
    title: "Скинь ссылку",
    text: "Клиент открывает лист в браузере. Не нужно быть в вашем аккаунте и не нужно Google Docs.",
  },
  {
    n: "03",
    title: "Печатай PDF",
    text: "Тот же лист уходит в печать. На free — с меткой Outframe, без аккаунта.",
  },
];

const points = [
  {
    title: "Scope держит рамку",
    text: "Пункты работ видны клиенту так же, как вам. Легче сказать, что не входит.",
  },
  {
    title: "Цена не прячется",
    text: "Фикс, валюта и как платим — отдельным блоком, без мелкого шрифта в конце.",
  },
  {
    title: "Ссылка живёт отдельно",
    text: "Пример и шаринг не завязаны на ваш браузер. Черновики по-прежнему остаются локально.",
  },
];

export default function HomePage() {
  const demo = { ...sampleProposal(), id: DEMO_ID };

  return (
    <div className="min-h-screen bg-pine-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,_rgba(200,245,66,0.08),_transparent_55%)]" />

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Logo />
        <nav className="flex items-center gap-3">
          <Link href="/example" className="btn-ghost hidden sm:inline-flex">
            Пример
          </Link>
          <Link href="/pro" className="btn-ghost">
            Pro
          </Link>
          <Link href="/studio" className="btn-lime">
            Собрать КП
          </Link>
        </nav>
      </header>

      <main className="relative">
        <section className="mx-auto grid w-full max-w-6xl items-end gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16">
          <div>
            <p className="font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-lime">
              Outframe · КП для фрилансеров
            </p>
            <h1 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              КП, которое
              <span className="block text-lime">можно скинуть ссылкой.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-pine-200 sm:text-lg">
              Scope, цена, срок и условия в одной рамке. Клиент видит лист, а не чат с правками.
              Откройте публичный пример — его не нужно собирать заново.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/studio" className="btn-lime px-5 py-3">
                Открыть студию
              </Link>
              <Link href="/example" className="btn-ghost px-5 py-3">
                Смотреть пример
              </Link>
            </div>
            <p className="mt-5 text-sm text-pine-300">
              {SITE_URL.replace("https://", "")} · без почты · 2 черновика на free
            </p>
          </div>

          <aside className="relative">
            <div className="absolute -left-6 top-8 hidden h-24 w-24 border border-lime/30 lg:block" />
            <div className="overflow-hidden rounded-sm border border-pine-700 bg-pine-850 p-3 shadow-sheet">
              <div className="mb-3 flex items-center justify-between px-1 text-[11px] uppercase tracking-[0.16em] text-pine-300">
                <span>Публичный лист</span>
                <span className="text-lime">180 000 ₽</span>
              </div>
              <div className="bg-paper px-6 py-6 text-ink">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pine-500">
                  Outframe · предложение
                </p>
                <p className="mt-2 font-display text-xl font-semibold leading-tight">
                  Редизайн лендинга и система заявок
                </p>
                <p className="mt-3 text-sm leading-relaxed text-pine-700">
                  Один маршрут: оффер, доказательства, форма. Без лишних экранов.
                </p>
                <ul className="mt-5 space-y-2 text-sm">
                  <li className="flex gap-3">
                    <span className="font-display text-lime-dim">01</span>
                    Каркас и оффер
                  </li>
                  <li className="flex gap-3">
                    <span className="font-display text-lime-dim">02</span>
                    Визуал и UI-kit
                  </li>
                  <li className="flex gap-3">
                    <span className="font-display text-lime-dim">03</span>
                    Сборка и сдача
                  </li>
                </ul>
                <div className="mt-6 flex items-center justify-between border-t border-pine-900/10 pt-4">
                  <span className="font-display text-2xl font-semibold text-pine-900">3 недели</span>
                  <span className="text-xs uppercase tracking-[0.14em] text-pine-400">
                    50% / 50%
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="border-y border-pine-800 bg-pine-950/60">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.n}>
                <p className="font-display text-sm font-semibold text-lime">{step.n}</p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-pine-200">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Лист, который можно переслать
              </h2>
              <p className="mt-4 text-base leading-relaxed text-pine-200">
                Это тот же документ, что видит клиент. Откройте{" "}
                <Link href="/example" className="text-lime hover:underline">
                  /example
                </Link>{" "}
                или{" "}
                <Link href={`/p/${DEMO_ID}`} className="text-lime hover:underline">
                  /p/demo
                </Link>
                .
              </p>
            </div>
            <Link href="/example" className="btn-ghost shrink-0">
              Открыть пример
            </Link>
          </div>
          <div className="mx-auto mt-10 max-w-[720px]">
            <ProposalSheet proposal={demo} compact />
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {points.map((point) => (
              <article key={point.title} className="border border-pine-700 bg-pine-850 px-5 py-6">
                <h3 className="font-display text-lg font-semibold">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-pine-200">{point.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 border border-lime/25 bg-pine-850 px-6 py-10 sm:flex-row sm:items-center sm:px-10">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Собери своё и скопируй ссылку
              </h2>
              <p className="mt-2 text-sm text-pine-200">
                В студии есть кнопка «Ссылка клиенту». Пример уже можно шарить как есть.
              </p>
            </div>
            <Link href="/studio" className="btn-lime px-5 py-3">
              Перейти в /studio
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-pine-800 px-5 py-6 text-sm text-pine-300 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3">
          <Logo className="text-pine-200" markClassName="h-5 w-5" />
          <p>{SITE_URL.replace("https://", "")} · пример · Print / PDF</p>
        </div>
      </footer>
    </div>
  );
}
