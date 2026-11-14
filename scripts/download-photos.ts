import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const DATA_PATH = path.join(ROOT, "src/data/properties.json");
const OUT_DIR = path.join(ROOT, "public/imoveis");
const MANIFEST_PATH = path.join(ROOT, "public/imoveis/manifest.json");

const CONCURRENCY = 4;
const MAX_RETRIES = 4;
const LARGE_MAX = 1600;
const THUMB_MAX = 640;
const LARGE_QUALITY = 80;
const THUMB_QUALITY = 75;

type Photo = { url: string; filename: string };
type Property = { codigo: number; photos: Photo[] };

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchBuffer(url: string, attempt = 0): Promise<Buffer> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "NovaOriente-Redesign-Build/1.0" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 100) throw new Error("empty");
    return buf;
  } catch (e) {
    if (attempt >= MAX_RETRIES) throw e;
    await sleep(500 * 2 ** attempt);
    return fetchBuffer(url, attempt + 1);
  }
}

async function processImage(buf: Buffer, dest: string, maxSize: number, quality: number) {
  const img = sharp(buf);
  const meta = await img.metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  const resize =
    w > maxSize || h > maxSize
      ? img.resize({
          width: w >= h ? maxSize : undefined,
          height: h > w ? maxSize : undefined,
          fit: "inside",
          withoutEnlargement: true,
        })
      : img;
  await resize.webp({ quality }).toFile(dest);
}

async function processProperty(prop: Property, manifest: Record<string, unknown>) {
  const dir = path.join(OUT_DIR, String(prop.codigo));
  fs.mkdirSync(dir, { recursive: true });
  const photos = prop.photos ?? [];
  if (photos.length === 0) {
    manifest[String(prop.codigo)] = { placeholder: true, images: [] };
    return;
  }
  const images: { large: string; thumb: string }[] = [];
  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const base = String(i + 1).padStart(2, "0");
    const largeName = `${base}-large.webp`;
    const thumbName = `${base}-thumb.webp`;
    const largePath = path.join(dir, largeName);
    const thumbPath = path.join(dir, thumbName);
    if (fs.existsSync(largePath) && fs.existsSync(thumbPath)) {
      images.push({ large: largeName, thumb: thumbName });
      continue;
    }
    const buf = await fetchBuffer(photo.url);
    await processImage(buf, largePath, LARGE_MAX, LARGE_QUALITY);
    await processImage(buf, thumbPath, THUMB_MAX, THUMB_QUALITY);
    images.push({ large: largeName, thumb: thumbName });
    await sleep(80);
  }
  manifest[String(prop.codigo)] = { placeholder: false, images };
}

async function runPool<T>(items: T[], worker: (item: T) => Promise<void>) {
  let index = 0;
  async function next(): Promise<void> {
    const i = index++;
    if (i >= items.length) return;
    await worker(items[i]);
    await next();
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, () => next()));
}

async function main() {
  if (!fs.existsSync(DATA_PATH)) {
    console.error("Missing", DATA_PATH);
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8")) as { properties: Property[] };
  const manifest: Record<string, unknown> = fs.existsSync(MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"))
    : {};
  console.log(`Processing ${data.properties.length} properties…`);
  let done = 0;
  await runPool(data.properties, async (prop) => {
    await processProperty(prop, manifest);
    done++;
    if (done % 25 === 0) {
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
      console.log(`Progress: ${done}/${data.properties.length}`);
    }
  });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});