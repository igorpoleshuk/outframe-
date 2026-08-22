import { formatPrice, type Proposal } from "@/lib/proposal";

type ProposalSheetProps = {
  proposal: Proposal;
  compact?: boolean;
};

function display(value: string, fallback: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

export function ProposalSheet({ proposal, compact = false }: ProposalSheetProps) {
  const scope = proposal.scope.filter((item) => item.title.trim() || item.detail.trim());

  return (
    <article
      className={`proposal-sheet bg-paper text-ink shadow-sheet ${
        compact ? "px-8 py-8" : "px-10 py-11 sm:px-12 sm:py-12"
      }`}
    >
      <header className="flex items-start justify-between gap-6 border-b border-pine-900/10 pb-6">
        <div>
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-pine-500">
            Outframe · коммерческое предложение
          </p>
          <h1 className="mt-3 font-display text-[1.65rem] font-semibold leading-tight tracking-tight sm:text-[1.85rem]">
            {display(proposal.title, "Название проекта")}
          </h1>
        </div>
        <div className="hidden text-right sm:block">
          <p className="text-[11px] uppercase tracking-[0.16em] text-pine-400">Для</p>
          <p className="mt-1 font-display text-sm font-semibold">
            {display(proposal.clientName, "Имя клиента")}
          </p>
          <p className="text-sm text-pine-500">
            {display(proposal.clientCompany, "Компания")}
          </p>
        </div>
      </header>

      <section className="mt-6 grid gap-6 sm:grid-cols-[1.3fr_0.7fr]">
        <p className="text-[15px] leading-relaxed text-pine-800">
          {display(
            proposal.summary,
            "Кратко опишите, что получит клиент и зачем это делать сейчас.",
          )}
        </p>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-1">
          <div className="sm:hidden">
            <dt className="text-[11px] uppercase tracking-[0.16em] text-pine-400">Клиент</dt>
            <dd className="mt-0.5 font-medium">
              {display(proposal.clientName, "Имя клиента")}
              {proposal.clientCompany.trim() ? (
                <span className="block text-pine-500">{proposal.clientCompany}</span>
              ) : null}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-pine-400">Исполнитель</dt>
            <dd className="mt-0.5 font-medium">
              {display(proposal.freelancerName, "Ваше имя")}
              <span className="block text-pine-500">
                {display(proposal.freelancerTitle, "Роль")}
              </span>
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-pine-500">
          Scope
        </h2>
        <ol className="mt-4 divide-y divide-pine-900/8">
          {(scope.length ? scope : [{ id: "empty", title: "", detail: "" }]).map((item, index) => (
            <li key={item.id} className="grid grid-cols-[2rem_1fr] gap-3 py-3 first:pt-0 last:pb-0">
              <span className="font-display text-sm font-semibold text-lime-dim">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-display text-[15px] font-semibold">
                  {display(item.title, "Пункт работ")}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-pine-600">
                  {display(item.detail, "Что входит в этот блок и что остаётся за рамкой.")}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-sm bg-pine-900 px-5 py-5 text-paper">
          <p className="text-[11px] uppercase tracking-[0.18em] text-pine-300">Цена</p>
          <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-lime">
            {formatPrice(proposal.price, proposal.currency)}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-pine-200">
            {display(proposal.priceNote, "Как платим и что входит в цифру.")}
          </p>
        </div>
        <div className="rounded-sm border border-pine-900/10 bg-white/60 px-5 py-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-pine-400">Срок</p>
          <p className="mt-2 font-display text-3xl font-semibold tracking-tight">
            {display(proposal.timeline, "—")}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-pine-600">
            {display(proposal.timelineNote, "Когда старт и от чего зависит сдвиг.")}
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-pine-500">
          Terms
        </h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-pine-700">
          {display(
            proposal.terms,
            "Условия, исключения из scope, сроки ответа и момент передачи исходников.",
          )}
        </p>
      </section>

      <footer className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-pine-900/10 pt-6">
        <div>
          <p className="font-display text-sm font-semibold">
            {display(proposal.freelancerName, "Исполнитель")}
          </p>
          <p className="text-sm text-pine-500">
            {display(proposal.freelancerContacts, "Почта или Telegram")}
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.16em] text-pine-400">
          Действует {display(proposal.validUntil, "2 недели")}
        </p>
      </footer>
    </article>
  );
}
