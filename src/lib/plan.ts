export const FREE_DRAFT_LIMIT = 2;
export const FREE_WATERMARK = "Собрано в Outframe · free";
export const OWNER_EMAIL = "igorpoleshuk@gmail.com";

export type OfferId = "lifetime" | "monthly";

export type Offer = {
  id: OfferId;
  name: string;
  priceRub: number;
  priceLabel: string;
  cadenceLabel: string;
  recommended: boolean;
  keyPrefix: "OF-L" | "OF-M";
};

export const OFFERS: Record<OfferId, Offer> = {
  lifetime: {
    id: "lifetime",
    name: "Pro Lifetime",
    priceRub: 2490,
    priceLabel: "2 490 ₽",
    cadenceLabel: "разово",
    recommended: true,
    keyPrefix: "OF-L",
  },
  monthly: {
    id: "monthly",
    name: "Pro Monthly",
    priceRub: 990,
    priceLabel: "990 ₽/мес",
    cadenceLabel: "каждый месяц",
    recommended: false,
    keyPrefix: "OF-M",
  },
};

export const DEFAULT_OFFER_ID: OfferId = "lifetime";
export const PRO_UNLOCKS = ["Черновики без лимита", "PDF без метки free"] as const;

export function isOfferId(value: string | null | undefined): value is OfferId {
  return value === "lifetime" || value === "monthly";
}

export function getOffer(value: string | null | undefined): Offer {
  return isOfferId(value) ? OFFERS[value] : OFFERS[DEFAULT_OFFER_ID];
}

export function payUrl(offer: OfferId): string {
  const raw =
    offer === "lifetime"
      ? process.env.NEXT_PUBLIC_PAY_LIFETIME_URL
      : process.env.NEXT_PUBLIC_PAY_MONTHLY_URL;
  return raw?.trim() ?? "";
}

export function invoiceSubject(offer: Offer): string {
  return `Outframe — счёт ${offer.name} ${offer.priceLabel}`;
}

export function invoiceBody(offer: Offer): string {
  return [
    "Outframe — счёт",
    "",
    `Тариф: ${offer.name}`,
    `Сумма: ${offer.priceLabel}`,
    `Тип: ${offer.cadenceLabel}`,
    "",
    "После оплаты пришлите лицензионный ключ (OF-L-… или OF-M-…).",
    "Активирую его на /pro.",
  ].join("\n");
}

export function invoiceMailto(offer: Offer): string {
  const subject = encodeURIComponent(invoiceSubject(offer));
  const body = encodeURIComponent(invoiceBody(offer));
  return `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
}
