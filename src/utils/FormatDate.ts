export default function FormatDate(date: Date) {
  const formattedDate = new Date();
  return formattedDate.toLocaleDateString("ru-ru", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
