import raw from "@/data/properties.json";
import { parseAreaNumber, parsePriceBRL } from "./format";

export type PropertyRecord = (typeof raw.properties)[number];

const properties = raw.properties as PropertyRecord[];

const CASA_TYPES = new Set([
  "Casa",
  "Casa/Galpão",
  "Chácara",
  "Fazenda",
  "Sítio",
  "Duplex",
]);

const APT_TYPES = new Set([
  "Apartamento",
  "Cobertura",
  "Apartamento c/ Cobertura",
  "Flat",
  "Loft",
  "Garagem",
]);

const LOTE_TYPES = new Set(["Lote", "Terreno/Área", "Área"]);

export function getAllProperties() {
  return properties;
}

export function getPropertyByCode(codigo: number | string) {
  const code = typeof codigo === "string" ? parseInt(codigo.replace(/\s/g, ""), 10) : codigo;
  return properties.find((p) => p.codigo === code);
}

export function propertyPath(property: PropertyRecord) {
  return `/imovel/${property.slug}/${property.codigo}/`;
}

export function typeCategory(tipo: string): "casa" | "apartamento" | "lote" | "outro" {
  if (CASA_TYPES.has(tipo)) return "casa";
  if (APT_TYPES.has(tipo)) return "apartamento";
  if (LOTE_TYPES.has(tipo)) return "lote";
  return "outro";
}

export function filterProperties(filters: SearchFilters) {
  return properties.filter((p) => matchesFilters(p, filters));
}

export type SearchFilters = {
  q?: string;
  tipo?: string;
  cidade?: string;
  bairro?: string;
  quartos?: number;
  suites?: number;
  banheiros?: number;
  vagas?: number;
  precoMin?: number;
  precoMax?: number;
  codigo?: string;
  category?: "casa" | "apartamento" | "lote";
  ordenacao?: "maior" | "menor";
};

export function matchesFilters(p: PropertyRecord, f: SearchFilters) {
  if (f.codigo) {
    const code = f.codigo.replace(/\s/g, "");
    if (String(p.codigo) !== code) return false;
  }
  if (f.category && typeCategory(p.tipo) !== f.category) return false;
  if (f.tipo && f.tipo !== "todos" && p.tipo !== f.tipo) return false;
  if (f.cidade && f.cidade !== "todas" && p.cidade !== f.cidade) return false;
  if (f.bairro && f.bairro !== "todos" && p.bairro !== f.bairro) return false;
  const beds = parseInt(p.bedrooms, 10) || 0;
  const suites = parseInt(p.suites, 10) || 0;
  const baths = parseInt(p.bathrooms, 10) || 0;
  const parking = parseInt(p.parking, 10) || 0;
  if (f.quartos && f.quartos > 0 && beds < f.quartos) return false;
  if (f.suites && f.suites > 0 && suites < f.suites) return false;
  if (f.banheiros && f.banheiros > 0 && baths < f.banheiros) return false;
  if (f.vagas && f.vagas > 0 && parking < f.vagas) return false;
  const price = parsePriceBRL(p.price_min || p.price);
  if (f.precoMin && price > 0 && price < f.precoMin) return false;
  if (f.precoMax && price > 0 && price > f.precoMax) return false;
  if (f.q) {
    const q = f.q.toLowerCase();
    const hay = `${p.title} ${p.bairro} ${p.cidade} ${p.tipo} ${p.codigo}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

export function sortProperties(list: PropertyRecord[], ordenacao?: "maior" | "menor") {
  const copy = [...list];
  copy.sort((a, b) => {
    const pa = parsePriceBRL(a.price_min || a.price);
    const pb = parsePriceBRL(b.price_min || b.price);
    if (ordenacao === "menor") return pa - pb;
    if (ordenacao === "maior") return pb - pa;
    return pb - pa;
  });
  return copy;
}

export function distinctCities() {
  return [...new Set(properties.map((p) => p.cidade))].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function distinctNeighborhoods(cidade?: string) {
  const list = cidade && cidade !== "todas" ? properties.filter((p) => p.cidade === cidade) : properties;
  return [...new Set(list.map((p) => p.bairro).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
}

export function distinctTypes() {
  return [...new Set(properties.map((p) => p.tipo))].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function countByCategory() {
  return {
    casa: properties.filter((p) => typeCategory(p.tipo) === "casa").length,
    apartamento: properties.filter((p) => typeCategory(p.tipo) === "apartamento").length,
    lote: properties.filter((p) => typeCategory(p.tipo) === "lote").length,
    total: properties.length,
  };
}

export function heroSlideProperties() {
  const withPhotos = properties.filter((p) => (p.photos?.length ?? 0) >= 4);
  const picked = new Map<number, PropertyRecord>();
  for (const p of withPhotos.sort((a, b) => (b.photos?.length ?? 0) - (a.photos?.length ?? 0))) {
    if (picked.size >= 8) break;
    picked.set(p.codigo, p);
  }
  for (const p of properties.filter((x) => x.exclusive)) {
    if (picked.size >= 8) break;
    picked.set(p.codigo, p);
  }
  return [...picked.values()].slice(0, 8);
}

export function featuredGridProperties(limit = 12) {
  return [...properties]
    .filter((p) => (p.photos?.length ?? 0) > 0)
    .sort((a, b) => parsePriceBRL(b.price_min) - parsePriceBRL(a.price_min))
    .slice(0, limit);
}

export function relatedProperties(property: PropertyRecord, limit = 4) {
  const cat = typeCategory(property.tipo);
  return properties
    .filter((p) => p.codigo !== property.codigo && typeCategory(p.tipo) === cat && p.cidade === property.cidade)
    .slice(0, limit);
}

export function sampleImageForCategory(category: "casa" | "apartamento" | "lote") {
  const p = properties.find((x) => typeCategory(x.tipo) === category && (x.photos?.length ?? 0) > 2);
  return p;
}

export function statsPayload() {
  const counts = countByCategory();
  const areas = properties.map((p) => parseAreaNumber(p.area_principal || p.area_lote));
  const avgArea = areas.reduce((a, b) => a + b, 0) / (areas.filter((x) => x > 0).length || 1);
  return { ...counts, avgArea: Math.round(avgArea) };
}

export const inventoryMeta = raw.counts;