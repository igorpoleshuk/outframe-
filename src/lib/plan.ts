export const FREE_DRAFT_LIMIT = 2;
export const FREE_WATERMARK = "Собрано в Outframe · free";
export const OWNER_EMAIL = "igorpoleshuk@gmail.com";

export const PRO_SUPPORT_PRICE_USD = 1;
export const PRO_SUPPORT_PRICE_RUB = 99;
export const PRO_SUPPORT_PRICE_LABEL = `$${PRO_SUPPORT_PRICE_USD} / мес`;
export const PRO_SUPPORT_PRICE_RUB_LABEL = `${PRO_SUPPORT_PRICE_RUB} ₽`;
export const PRO_SUPPORT_PRICE_FULL = `${PRO_SUPPORT_PRICE_LABEL} (${PRO_SUPPORT_PRICE_RUB_LABEL})`;

export type OfferId = "donate" | "monthly";
export type LicenseOfferId = "monthly";

type OfferBase = {
  name: string;
  priceUsd: number | null;
  priceRub: number | null;
  priceLabel: string;
  cadenceLabel: string;
  recommended: boolean;
};

export type Offer =
  | (OfferBase & {
      id: "donate";
      kind: "donate";
      keyPrefix: null;
    })
  | (OfferBase & {
      id: "monthly";
      kind: "pro";
      keyPrefix: "OF-M";
    });

export const OFFERS: Record<OfferId, Offer> = {
  donate: {
    id: "donate",
    name: "Донат / поддержать",
    priceUsd: null,
    priceRub: null,
    priceLabel: "сколько сэкономил",
    cadenceLabel: "без обязательств",
    recommended: true,
    kind: "donate",
    keyPrefix: null,
  },
  monthly: {
    id: "monthly",
    name: "Pro",
    priceUsd: PRO_SUPPORT_PRICE_USD,
    priceRub: PRO_SUPPORT_PRICE_RUB,
    priceLabel: PRO_SUPPORT_PRICE_FULL,
    cadenceLabel: "символическая поддержка",
    recommended: false,
    kind: "pro",
    keyPrefix: "OF-M",
  },
};

export const DEFAULT_OFFER_ID: OfferId = "donate";
export const PRO_UNLOCKS = ["Черновики без лимита", "PDF без метки free"] as const;
export const DONATE_POINTS = [
  "Без обязательств и без подписки",
  "Скинуть столько, сколько инструмент сэкономил",
  "Письмо на почту или ссылка, если подключена",
] as const;

export function isOfferId(value: string | null | undefined): value is OfferId {
  return value === "donate" || value === "monthly";
}

export function asLicenseOfferId(value: string | null | undefined): LicenseOfferId | null {
  if (value === "monthly" || value === "lifetime") return "monthly";
  return null;
}

export function getOffer(value: string | null | undefined): Offer {
  return isOfferId(value) ? OFFERS[value] : OFFERS[DEFAULT_OFFER_ID];
}

export function checkoutPath(offer: OfferId = DEFAULT_OFFER_ID): string {
  return `/checkout?offer=${offer}`;
}

export function payUrl(offer: OfferId): string {
  const raw =
    offer === "donate"
      ? process.env.NEXT_PUBLIC_DONATE_URL
      : process.env.NEXT_PUBLIC_PAY_MONTHLY_URL;
  return raw?.trim() ?? "";
}

export function donateMailto(): string {
  const subject = encodeURIComponent("Outframe — донат / поддержать");
  const body = encodeURIComponent(
    [
      "Хочу поддержать Outframe.",
      "",
      "Скину столько, сколько инструмент сэкономил.",
    ].join("\n"),
  );
  return `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
}

export function proSupportMailto(): string {
  const subject = encodeURIComponent(`Outframe — хочу Pro за $${PRO_SUPPORT_PRICE_USD}`);
  const body = encodeURIComponent(
    [
      `Хочу Pro за ${PRO_SUPPORT_PRICE_FULL}.`,
      "",
      "Нужен ключ, чтобы снять лимит черновиков и метку на PDF.",
      "Активирую его на /pro.",
    ].join("\n"),
  );
  return `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
}

export function offerMailto(offer: OfferId): string {
  return offer === "donate" ? donateMailto() : proSupportMailto();
}

export function offerHref(offer: OfferId): string {
  return payUrl(offer) || offerMailto(offer);
}
