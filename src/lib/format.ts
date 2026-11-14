export function parsePriceBRL(value: string | undefined): number {
  if (!value || value === "Sob consulta" || value === "R$ 0,00") return 0;
  const n = value
    .replace(/[^\d,]/g, "")
    .replace(",", ".");
  const parsed = parseFloat(n);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatPriceBRL(value: string | undefined, fallback = "Sob consulta") {
  const n = parsePriceBRL(value);
  if (n <= 0) return fallback;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatArea(area: string | undefined, unit = "m²") {
  if (!area || area === "0,00") return "—";
  const normalized = area.replace(".", "").replace(",", ".");
  const n = parseFloat(normalized);
  if (!Number.isFinite(n) || n <= 0) return "—";
  return `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(n)} ${unit}`;
}

export function parseAreaNumber(area: string | undefined): number {
  if (!area) return 0;
  const normalized = area.replace(/\./g, "").replace(",", ".");
  const n = parseFloat(normalized);
  return Number.isFinite(n) ? n : 0;
}

export function bedBathPark(bedrooms: string, bathrooms: string, parking: string) {
  return {
    bedrooms: parseInt(bedrooms, 10) || 0,
    bathrooms: parseInt(bathrooms, 10) || 0,
    parking: parseInt(parking, 10) || 0,
  };
}