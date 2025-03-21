export default function FormatLink(link: string) {
  return link.replace(/^https?:\/\//, "").split("/")[0];
}
