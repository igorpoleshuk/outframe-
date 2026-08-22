"use client";

import { useState } from "react";
import { useEntitlement } from "@/lib/license";
import { OFFERS, PRO_SUPPORT_PRICE_FULL } from "@/lib/plan";

export function RedeemForm() {
  const { isPro, offer, ready, redeem } = useEntitlement();
  const [key, setKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!ready) {
    return <div className="h-28 border border-pine-700 bg-pine-850" />;
  }

  if (isPro && offer) {
    return (
      <div className="border border-lime/35 bg-pine-850 px-6 py-6">
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-lime">
          Активно
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold">{OFFERS[offer].name}</h2>
        <p className="mt-2 text-sm text-pine-200">
          Черновики без лимита, PDF без метки. Ключ хранится в этом браузере.
        </p>
      </div>
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await redeem(key);
      if (!result.ok) {
        setError(result.error === "missing" ? "Вставьте ключ" : "Ключ не подошёл");
      }
    } catch {
      setError("Не удалось проверить ключ");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="border border-pine-700 bg-pine-850 px-6 py-6">
      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-pine-300">
        Уже есть ключ
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold">Активировать Pro</h2>
      <p className="mt-2 text-sm text-pine-200">
        После перевода за {PRO_SUPPORT_PRICE_FULL} приходит ключ OF-M-…. Проверка на сервере, затем
        Pro в этом браузере.
      </p>
      <label className="mt-5 block">
        <span className="field-label">Лицензионный ключ</span>
        <input
          className="field-input font-mono uppercase"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          placeholder="OF-M-…"
          autoComplete="off"
          spellCheck={false}
        />
      </label>
      {error ? <p className="mt-2 text-sm text-lime">{error}</p> : null}
      <button type="submit" className="btn-lime mt-5" disabled={busy}>
        {busy ? "Проверяем…" : "Активировать"}
      </button>
    </form>
  );
}
