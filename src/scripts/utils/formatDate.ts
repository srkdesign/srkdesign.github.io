export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("ru-RU", { dateStyle: "long" });
}
