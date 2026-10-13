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
      <div className="mx-auto max-w-xl animate-rise border border-mist-faint bg-white px-6 py-10 text-center md:px-10">
        <p className="font-display text-4xl text-ink">Заявка принята</p>
        <p className="mt-4 text-sm leading-relaxed text-mist">
          Мы свяжемся с вами по телефону, подтвердим наличие и способ получения:
          Европочта или самовывоз в Бресте.
        </p>
        <p className="mt-6 text-sm text-ink">
          Вопросы:{" "}
          <a href={STORE.phoneHref} className="text-petal hover:underline">
            {STORE.phone}
          </a>
        </p>
        <Link href="/catalog" className="btn-ghost mt-8 inline-flex">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-xl border border-mist-faint bg-white px-6 py-10 text-center md:px-10">
        <p className="font-display text-4xl text-ink">Корзина пуста</p>
        <p className="mt-3 text-sm text-mist">Выберите вещи в каталоге и добавьте размер с цветом.</p>
        <Link href="/catalog" className="btn-petal mt-8 inline-flex">
          Открыть каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-4">
        {items.map((item) => {
          const key = cartKey(item);
          return (
            <article
              key={key}
              className="flex flex-col gap-4 border border-mist-faint bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <Link href={`/product/${item.slug}`} className="font-display text-2xl text-ink hover:text-petal">
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-mist">
                  {item.color} · {item.size}
                </p>
                <p className="mt-2 text-sm font-medium">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-mist-soft">
                  <button
                    type="button"
                    className="px-3 py-2 text-sm hover:bg-paper"
                    onClick={() => updateQty(key, item.qty - 1)}
                    aria-label="Уменьшить"
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center text-sm">{item.qty}</span>
                  <button
                    type="button"
                    className="px-3 py-2 text-sm hover:bg-paper"
                    onClick={() => updateQty(key, item.qty + 1)}
                    aria-label="Увеличить"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="text-sm text-mist transition hover:text-petal"
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

      <section className="border border-mist-faint bg-white p-5 md:p-7">
        <h2 className="font-display text-3xl text-ink">Оформление заявки</h2>
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
              inputMode="tel"
              placeholder="+375…"
              autoComplete="tel"
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
                  className={`flex cursor-pointer items-center gap-3 border px-3 py-3 text-sm transition ${
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
                    className="accent-petal"
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

          <button type="submit" className="btn-petal w-full">
            Отправить заявку
          </button>
        </form>
      </section>
    </div>
  );
}
