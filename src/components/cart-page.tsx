"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { cartKey, deliveryLabel, type DeliveryMethod } from "@/lib/cart";
import { STORE, formatPrice } from "@/lib/products";

export function CartPage() {
  const { items, total, ready, updateQty, removeItem, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState<string>(STORE.city);
  const [delivery, setDelivery] = useState<DeliveryMethod>("europost");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!items.length || !name.trim() || !phone.trim()) return;
    setSubmitted(true);
    clear();
  };

  if (!ready) {
    return <p className="text-sm text-mist">Загрузка корзины…</p>;
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl animate-rise border border-mist-faint bg-white px-5 py-9 text-center sm:px-6 sm:py-10 md:px-10">
        <p className="font-display text-3xl text-ink sm:text-4xl">Заявка принята</p>
        <p className="mt-4 text-sm leading-relaxed text-mist">
          Мы свяжемся с вами по указанному телефону, подтвердим наличие и способ получения:
          Европочта или самовывоз в Бресте.
        </p>
        <Link href="/catalog" className="btn-ghost mt-8 inline-flex w-full sm:w-auto">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-xl border border-mist-faint bg-white px-5 py-9 text-center sm:px-6 sm:py-10 md:px-10">
        <p className="font-display text-3xl text-ink sm:text-4xl">Корзина пуста</p>
        <p className="mt-3 text-sm text-mist">Выберите вещи в каталоге и добавьте размер с цветом.</p>
        <Link href="/catalog" className="btn-petal mt-8 inline-flex w-full sm:w-auto">
          Открыть каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
      <section className="space-y-3 sm:space-y-4">
        {items.map((item) => {
          const key = cartKey(item);
          return (
            <article
              key={key}
              className="flex flex-col gap-4 border border-mist-faint bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <Link
                  href={`/product/${item.slug}`}
                  className="font-display text-xl text-ink hover:text-petal sm:text-2xl"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-mist">
                  {item.color} · {item.size}
                </p>
                <p className="mt-2 text-sm font-medium">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="flex items-center border border-mist-soft">
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center text-lg hover:bg-paper active:bg-paper"
                    onClick={() => updateQty(key, item.qty - 1)}
                    aria-label="Уменьшить"
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center text-sm">{item.qty}</span>
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center text-lg hover:bg-paper active:bg-paper"
                    onClick={() => updateQty(key, item.qty + 1)}
                    aria-label="Увеличить"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="inline-flex h-11 items-center px-2 text-sm text-mist transition hover:text-petal"
                  onClick={() => removeItem(key)}
                >
                  Убрать
                </button>
              </div>
            </article>
          );
        })}
        <p className="text-right text-lg font-medium text-ink">Итого: {formatPrice(total)}</p>
      </section>

      <section className="border border-mist-faint bg-white p-4 sm:p-5 md:p-7">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Оформление заявки</h2>
        <p className="mt-2 text-sm text-mist">
          Без онлайн-оплаты. Мы перезвоним, подтвердим заказ и способ получения.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="field-label" htmlFor="name">
              Имя
            </label>
            <input
              id="name"
              className="field-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              enterKeyHint="next"
            />
          </div>
          <div>
            <label className="field-label" htmlFor="phone">
              Телефон
            </label>
            <input
              id="phone"
              className="field-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              type="tel"
              inputMode="tel"
              placeholder="+375…"
              autoComplete="tel"
              enterKeyHint="next"
            />
          </div>
          <div>
            <label className="field-label" htmlFor="city">
              Город
            </label>
            <input
              id="city"
              className="field-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              autoComplete="address-level2"
              enterKeyHint="next"
            />
          </div>
          <fieldset>
            <legend className="field-label">Получение</legend>
            <div className="space-y-2">
              {(
                [
                  ["europost", "Европочта"],
                  ["pickup", "Самовывоз в Бресте"],
                ] as const
              ).map(([value, label]) => (
                <label
                  key={value}
                  className={`flex min-h-12 cursor-pointer items-center gap-3 border px-3 py-3 text-sm transition ${
                    delivery === value
                      ? "border-petal bg-petal-mist"
                      : "border-mist-soft hover:border-ink/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={value}
                    checked={delivery === value}
                    onChange={() => setDelivery(value)}
                    className="h-4 w-4 accent-petal"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label className="field-label" htmlFor="comment">
              Комментарий
            </label>
            <textarea
              id="comment"
              className="field-textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Отделение Европочты, удобное время звонка…"
            />
          </div>

          <p className="text-xs leading-relaxed text-mist">
            Способ: {deliveryLabel(delivery)}. Оплата после подтверждения заявки.
          </p>

          <div className="sticky-action !mx-[-1rem] sm:!mx-[-1.25rem] md:!mx-0">
            <button type="submit" className="btn-petal w-full">
              Отправить заявку
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
