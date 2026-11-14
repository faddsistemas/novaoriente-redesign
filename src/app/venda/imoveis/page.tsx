import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteShell } from "@/components/layout/site-shell";
import { PageBanner } from "@/components/layout/page-banner";
import { PropertyListing } from "@/components/listing/property-listing";
import { loadImageManifest } from "@/lib/manifest";

export default function ListingPage() {
  const manifest = loadImageManifest();
  return (
    <>
      <SiteHeader />
      <SiteShell>
        <PageBanner title="Buscar imóveis" subtitle="Filtre por tipo, cidade, bairro, quartos e valor — 274 imóveis à venda." />
        <main className="mx-auto max-w-7xl px-4 pb-16 lg:px-6">
          <Suspense fallback={<p className="text-neutral-600">Carregando imóveis…</p>}>
            <PropertyListing manifest={manifest} />
          </Suspense>
        </main>
      </SiteShell>
    </>
  );
}