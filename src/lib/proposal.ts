export type Currency = "RUB" | "USD" | "EUR";

export type ScopeItem = {
  id: string;
  title: string;
  detail: string;
};

export type Proposal = {
  id: string;
  title: string;
  clientName: string;
  clientCompany: string;
  freelancerName: string;
  freelancerTitle: string;
  freelancerContacts: string;
  summary: string;
  scope: ScopeItem[];
  price: string;
  currency: Currency;
  priceNote: string;
  timeline: string;
  timelineNote: string;
  terms: string;
  validUntil: string;
  createdAt: number;
  updatedAt: number;
};

export const CURRENCY_MARK: Record<Currency, string> = {
  RUB: "₽",
  USD: "$",
  EUR: "€",
};

export function createId(prefix = "of"): string {
  const raw = crypto.randomUUID().replace(/-/g, "").slice(0, 10);
  return `${prefix}_${raw}`;
}

export function createScopeItem(partial?: Partial<ScopeItem>): ScopeItem {
  return {
    id: createId("sc"),
    title: "",
    detail: "",
    ...partial,
  };
}

export function createProposal(partial?: Partial<Proposal>): Proposal {
  const now = Date.now();
  return {
    id: createId(),
    title: "Новое предложение",
    clientName: "",
    clientCompany: "",
    freelancerName: "",
    freelancerTitle: "",
    freelancerContacts: "",
    summary: "",
    scope: [createScopeItem()],
    price: "",
    currency: "RUB",
    priceNote: "",
    timeline: "",
    timelineNote: "",
    terms: "",
    validUntil: "",
    createdAt: now,
    updatedAt: now,
    ...partial,
  };
}

export function sampleProposal(): Proposal {
  return createProposal({
    title: "Редизайн лендинга и система заявок",
    clientName: "Анна Кравченко",
    clientCompany: "Northline Studio",
    freelancerName: "Игорь Полещук",
    freelancerTitle: "Продуктовый дизайнер и фронтенд",
    freelancerContacts: "igor@outframe.dev · t.me/outframe",
    summary:
      "Собрать новый лендинг услуги и короткий путь заявки: оффер, доказательная часть, форма. Без лишних экранов — один ясный маршрут от входа до разговора.",
    scope: [
      createScopeItem({
        title: "Каркас и оффер",
        detail: "Структура страницы, иерархия блоков, формулировки оффера и CTA.",
      }),
      createScopeItem({
        title: "Визуал и UI-kit",
        detail: "Типографика, цвет, компоненты формы и карточек. Адаптив до 375px.",
      }),
      createScopeItem({
        title: "Сборка и сдача",
        detail: "Верстка в Next.js, состояния формы, передача исходников и короткая инструкция.",
      }),
    ],
    price: "180000",
    currency: "RUB",
    priceNote: "Фикс. 50% до старта, 50% по сдаче. Правки в рамках двух циклов.",
    timeline: "3 недели",
    timelineNote: "Старт в течение 5 рабочих дней после предоплаты.",
    terms:
      "В scope не входят фотосъёмка, копирайт с нуля и интеграции с CRM.\nСрок ответа на промежуточные материалы — 2 рабочих дня, иначе сдвигается дата сдачи.\nИсходники передаются после финального платежа.",
    validUntil: "14 дней",
  });
}

export function formatPrice(value: string, currency: Currency): string {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return "—";
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const mark = CURRENCY_MARK[currency];
  return currency === "USD" || currency === "EUR" ? `${mark}${grouped}` : `${grouped} ${mark}`;
}

export function formatUpdatedAt(ts: number): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(ts);
}
