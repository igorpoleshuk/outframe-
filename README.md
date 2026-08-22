# Outframe

Генератор коммерческих предложений для фрилансеров.

Стек: Next.js, TypeScript, Tailwind. Черновики хранятся в `localStorage` — без аккаунта и бэкенда.

## Что внутри

- `/` — лендинг бренда Outframe
- `/studio` — редактор (scope, цена, срок, terms) и live preview
- `/p/[id]` — превью черновика
- Print / PDF — через диалог печати браузера («Сохранить как PDF»)

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).
