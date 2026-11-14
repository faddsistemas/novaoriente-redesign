import { assetUrl } from "./site";
import type { PropertyRecord } from "./property-data";

export type PropertyImageSet = {
  src: string;
  thumb: string;
  placeholder: boolean;
};

export function propertyImageBase(codigo: number) {
  return assetUrl(`/imoveis/${codigo}/`);
}

export function propertyImages(
  property: PropertyRecord,
  manifest?: Record<string, { placeholder?: boolean; images?: { large: string; thumb: string }[] }>,
): PropertyImageSet[] {
  const entry = manifest?.[String(property.codigo)];
  if (entry?.images?.length) {
    const base = propertyImageBase(property.codigo);
    return entry.images.map((img) => ({
      src: `${base}${img.large}`,
      thumb: `${base}${img.thumb}`,
      placeholder: false,
    }));
  }
  if (!property.photos?.length || entry?.placeholder) {
    return placeholderImage(property.tipo);
  }
  return property.photos.map((_, i) => {
    const base = propertyImageBase(property.codigo);
    const n = String(i + 1).padStart(2, "0");
    return {
      src: `${base}${n}-large.webp`,
      thumb: `${base}${n}-thumb.webp`,
      placeholder: false,
    };
  });
}

export function placeholderImage(_tipo?: string): PropertyImageSet[] {
  return [
    {
      src: assetUrl("/brand/placeholder-property.svg"),
      thumb: assetUrl("/brand/placeholder-property.svg"),
      placeholder: true,
    },
  ];
}

export function primaryImage(property: PropertyRecord, manifest?: Parameters<typeof propertyImages>[1]) {
  return propertyImages(property, manifest)[0];
}