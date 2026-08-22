"use client";

import Link from "next/link";
import { checkoutPath, PRO_SUPPORT_PRICE_FULL } from "@/lib/plan";

type PrintGateProps = {
  onPrint: () => void;
  onClose: () => void;
};

export function PrintGate({ onPrint, onClose }: PrintGateProps) {
  return (
    <div className="no-print fixed inset-0 z-40 flex items-center justify-center bg-pine-950/80 px-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="print-gate-title"
        className="w-full max-w-md border border-pine-700 bg-pine-850 px-6 py-6 shadow-sheet"
      >
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-lime">
          Print / PDF
        </p>
        <h2 id="print-gate-title" className="mt-3 font-display text-2xl font-semibold tracking-tight">
          В PDF будет метка free
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-pine-200">
          Отправку КП это не блокирует. На free лист уходит с подписью «Собрано в Outframe · free».
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" className="btn-ghost" onClick={onPrint}>
            Печатать с меткой
          </button>
          <Link href={checkoutPath("donate")} className="btn-lime">
            Донат / поддержать
          </Link>
        </div>
        <Link
          href={checkoutPath("monthly")}
          className="mt-4 inline-block text-xs uppercase tracking-[0.14em] text-pine-300 hover:text-lime"
        >
          Pro за {PRO_SUPPORT_PRICE_FULL} — снять метку
        </Link>
        <button
          type="button"
          className="mt-3 block text-xs uppercase tracking-[0.14em] text-pine-300 hover:text-lime"
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}
