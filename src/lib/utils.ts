import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Builds a URL-safe path into public/assets for a given filename.
 * Many real project photos have spaces/special characters in their
 * original filenames (e.g. "Mens #3 Photo 1.jpg") — this is the one
 * place encoding happens, so every image reference goes through it
 * rather than each call site re-deriving the same encoding.
 */
export function assetPath(filename: string, folder = "assets/projects_flat") {
  return `/${folder}/${encodeURIComponent(filename)}`;
}
