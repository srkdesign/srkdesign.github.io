import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

export async function heroSrc(h?: string | ImageMetadata, width = 800) {
  if (!h) return undefined;
  if (typeof h === "string") return h; // public path or remote URL
  // Local file: optimized, hashed URL. 800px covers your md:w-96 at 2x.
  return h.src;
}
