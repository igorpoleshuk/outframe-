import { STORE } from "@/lib/products";

export const metadata = {
  title: "Доставка",
};

export default function DeliveryPage() {
  return (
    <div className="bg-paper pt-28 md:pt-32">
      <div className="mx-auto max-w-3xl px-5 pb-20 md:px-8 md:pb-28">
        <h1 className="font-display text-5xl text-ink md:text-6xl">Доставка и оплата</h1>
        <p className="mt-4 text-sm text-mist">
          Онлайн-оплаты пока нет — сначала заявка, потом подтверждение и оплата.
        </p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="font-display text-3xl text-ink">Европочта</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              Доставляем по Беларуси через Европочту. В комментарии к заявке укажите удобное
              отделение. Срок и стоимость уточняем при подтверждении заказа.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-ink">Самовывоз</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              {STORE.pickupAddress}. Время и точку встречи согласуем по телефону после заявки.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-ink">Оплата</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              Оплата после подтверждения заявки — способ обсуждаем при звонке. Если остались
              вопросы:{" "}
              <a href={STORE.phoneHref} className="text-petal hover:underline">
                {STORE.phone}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl text-ink">Возврат</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              Если размер не подошёл и вещь без следов носки — поможем обменять или вернуть в
              разумный срок. Напишите или позвоните сразу после получения.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
