export default function FormatDate(date: Date) {
  return date.toLocaleDateString("ru", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
