import i18n from "i18next";

export const CATEGORIES = {
  design: i18n.t("blog.categories.design"),
  frontend: i18n.t("blog.categories.frontend"),
  backend: i18n.t("blog.categories.backend"),
  other: i18n.t("blog.categories.other"),
  personal: i18n.t("blog.categories.personal"),
  woocommerce: "Woocommerce",
  wordpress: "Wordpress",
} as const;

export const CATEGORY_SLUGS = Object.keys(CATEGORIES) as Array<
  keyof typeof CATEGORIES
>;
export type Category = keyof typeof CATEGORIES;
