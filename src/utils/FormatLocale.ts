export default function FormatLocale(locale: string) {
  return new Intl.DisplayNames([locale], { type: "language" }).of(locale);
}
