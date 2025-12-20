export default function getLocaleFromUrl(url: string) {
  const pathname = new URL(url).pathname;
  const [, locale] = pathname.split("/");
  return locale || null;
}
