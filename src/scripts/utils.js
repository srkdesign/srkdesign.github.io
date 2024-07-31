export function formatDate(date) {
  return new Date(date).toLocaleDateString("ru-RU", { dateStyle: "long" });
}
