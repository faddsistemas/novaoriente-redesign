"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  filterProperties,
  sortProperties,
  type SearchFilters,
  getPropertyByCode,
  propertyPath,
} from "@/lib/property-data";
import { PropertyCard } from "@/components/property/property-card";
import { propertyImages } from "@/lib/images";
import type { ImageManifest } from "@/lib/manifest";
import { useRouter } from "next/navigation";
import { PropertySearch } from "@/components/search/property-search";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 20;

export function PropertyListing({ manifest }: { manifest: ImageManifest }) {
  const params = useSearchParams();
  const router = useRouter();

  const filters: SearchFilters = useMemo(
    () => ({
      cidade: params.get("cidade") ?? undefined,
      bairro: params.get("bairro") ?? undefined,
      tipo: params.get("tipo") ?? undefined,
      quartos: params.get("quartos") ? Number(params.get("quartos")) : undefined,
      suites: params.get("suites") ? Number(params.get("suites")) : undefined,
      banheiros: params.get("banheiros") ? Number(params.get("banheiros")) : undefined,
      vagas: params.get("vagas") ? Number(params.get("vagas")) : undefined,
      precoMin: params.get("precoMin") ? Number(params.get("precoMin")) : undefined,
      precoMax: params.get("precoMax") ? Number(params.get("precoMax")) : undefined,
      codigo: params.get("codigo") ?? undefined,
      category: (params.get("category") as SearchFilters["category"]) ?? undefined,
      ordenacao: (params.get("ordenacao") as SearchFilters["ordenacao"]) ?? "maior",
    }),
    [params],
  );

  const page = Math.max(1, Number(params.get("pagina") ?? "1"));
  const filtered = useMemo(() => sortProperties(filterProperties(filters), filters.ordenacao), [filters]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const slice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (filters.codigo && filtered.length === 1) {
      const only = getPropertyByCode(filters.codigo);
      if (only) router.replace(propertyPath(only));
    }
  }, [filters.codigo, filtered.length, router]);

  function setPage(p: number) {
    const sp = new URLSearchParams(params.toString());
    sp.set("pagina", String(p));
    router.push(`/venda/imoveis/?${sp.toString()}`);
  }

  return (
    <div className="space-y-8">
      <PropertySearch />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-700">
          <strong className="text-brand-primary">{filtered.length}</strong> imóveis encontrados
        </p>
        <label className="text-sm">
          Ordenar{" "}
          <select
            className="ml-1 rounded border px-2 py-1"
            value={filters.ordenacao ?? "maior"}
            onChange={(e) => {
              const sp = new URLSearchParams(params.toString());
              sp.set("ordenacao", e.target.value);
              router.push(`/venda/imoveis/?${sp.toString()}`);
            }}
          >
            <option value="maior">Maior valor</option>
            <option value="menor">Menor valor</option>
          </select>
        </label>
      </div>
      {slice.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-neutral-600">
          Nenhum imóvel encontrado com os filtros atuais. Tente ampliar a busca.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3" data-testid="listing-grid">
          {slice.map((property, i) => (
            <PropertyCard
              key={property.codigo}
              property={property}
              images={propertyImages(property, manifest)}
              index={i}
            />
          ))}
        </div>
      )}
      {totalPages > 1 ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            Anterior
          </Button>
          <span className="text-sm">
            Página {page} de {totalPages}
          </span>
          <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
            Próxima
          </Button>
        </div>
      ) : null}
    </div>
  );
}