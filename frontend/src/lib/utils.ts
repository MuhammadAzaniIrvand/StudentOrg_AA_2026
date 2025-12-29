import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import config from "@/config/env"; // Import config env Anda

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TAMBAHKAN FUNGSI INI
export function getFileUrl(path: string | undefined | null): string {
  if (!path) return "/placeholder-image.jpg"; // Gambar default jika kosong

  if (path.startsWith("http")) {
    return path;
  }

  // Hapus slash di awal jika ada untuk menghindari double slash
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Pastikan URL backend tidak diakhiri slash
  const baseUrl = config.apiUrl.replace(/\/api\/v1$/, ""); // Hapus /api/v1 dari base URL jika ada

  return `${baseUrl}/${cleanPath}`;
}
