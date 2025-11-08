
# Zadonetske App v1.4 (Next.js + Tailwind + i18n — no next-intl)

Готовый стартовый проект с 4 темами (ethno/river/forest/minimal), border-radius 12px, свитчер языков всегда справа-вверху. Без `next-intl`, чтобы избежать ошибок npm (ETARGET).

## Запуск
```bash
npm i
npm run dev    # http://localhost:3000 → редирект на /uk
```

### Windows: если папка с пробелом
```bash
cd "C:\Users\User\Projects\village development\zadonetske-app-v1.4"
npm i
npm run dev
```

## Структура i18n
- URL: /uk, /en, /ru
- Файлы переводов: /messages/*.json
- Вёрстка: app/[locale]/*
