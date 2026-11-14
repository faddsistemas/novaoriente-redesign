import fs from "node:fs";
import path from "node:path";

export type ImageManifest = Record<
  string,
  { placeholder?: boolean; images?: { large: string; thumb: string }[] }
>;

let cached: ImageManifest | null = null;

export function loadImageManifest(): ImageManifest {
  if (cached) return cached;
  const file = path.join(process.cwd(), "public/imoveis/manifest.json");
  if (!fs.existsSync(file)) {
    cached = {};
    return cached;
  }
  cached = JSON.parse(fs.readFileSync(file, "utf8")) as ImageManifest;
  return cached;
}