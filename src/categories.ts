export const CATEGORIES = {
  design: "Дизайн",
  frontend: "Фронтенд",
  backend: "Бэкенд",
  other: "Другое",
} as const;

export const CATEGORY_SLUGS = Object.keys(CATEGORIES) as Array<
  keyof typeof CATEGORIES
>;
export type Category = keyof typeof CATEGORIES;
