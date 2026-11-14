import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteShell } from "@/components/layout/site-shell";
import { PropertyGallery } from "@/components/property/property-gallery";
import { ContactPanel } from "@/components/property/contact-panel";
import { PropertyMobileCta } from "@/components/property/property-mobile-cta";
import { PropertyCard } from "@/components/property/property-card";
import { getAllProperties, getPropertyByCode, relatedProperties } from "@/lib/property-data";
import { formatArea, formatPriceBRL, bedBathPark } from "@/lib/format";
import { loadImageManifest } from "@/lib/manifest";
import { propertyImages } from "@/lib/images";
import { SITE } from "@/lib/site";

type Params = { slug: string; codigo: string };

export function generateStaticParams(): Params[] {
  return getAllProperties().map((p) => ({ slug: p.slug, codigo: String(p.codigo) }));
}

export function generateMetadata({ params }: { params: Promise<Params> }) {
  return params.then((p) => {
    const property = getPropertyByCode(p.codigo);
    return {
      title: property?.title ?? "Imóvel",
      description: property?.description?.slice(0, 160),
    };
  });
}

export default async function PropertyPage({ params }: { params: Promise<Params> }) {
  const { codigo } = await params;
  const property = getPropertyByCode(codigo);
  if (!property) notFound();
  const manifest = loadImageManifest();
  const images = propertyImages(property, manifest);
  const { bedrooms, bathrooms, parking } = bedBathPark(
    property.bedrooms,
    property.bathrooms,
    property.parking,
  );
  const related = relatedProperties(property);

  return (
    <>
      <SiteHeader />
      <SiteShell>
        <main className="mx-auto min-w-0 max-w-7xl overflow-x-hidden px-4 py-8 lg:px-6">
          <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="min-w-0">
              <PropertyGallery images={images} title={property.title} />
              <h1 className="mt-6 text-2xl font-bold text-brand-primary md:text-3xl">{property.title}</h1>
              <p className="mt-2 text-sm text-neutral-600">
                {property.bairro} · {property.cidade} — Cód. {property.codigo}
              </p>
              <p className="mt-3 text-3xl font-bold text-neutral-900">
                {formatPriceBRL(property.price_min || property.price)}
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-brand-muted p-4 text-sm sm:grid-cols-4">
                <li>
                  <span className="text-neutral-500">Área</span>
                  <p className="font-semibold">{formatArea(property.area_principal || property.area_lote)}</p>
                </li>
                <li>
                  <span className="text-neutral-500">Quartos</span>
                  <p className="font-semibold">{bedrooms || "—"}</p>
                </li>
                <li>
                  <span className="text-neutral-500">Banheiros</span>
                  <p className="font-semibold">{bathrooms || "—"}</p>
                </li>
                <li>
                  <span className="text-neutral-500">Vagas</span>
                  <p className="font-semibold">{parking || "—"}</p>
                </li>
              </ul>
              <section className="mt-8">
                <h2 className="text-lg font-bold text-brand-primary">Descrição</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-neutral-800">
                  {property.description}
                </p>
              </section>
              {property.specifications?.length ? (
                <section className="mt-8">
                  <h2 className="text-lg font-bold text-brand-primary">Especificações</h2>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-800">
                    {property.specifications.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {property.features?.length ? (
                <section className="mt-8">
                  <h2 className="text-lg font-bold text-brand-primary">Comodidades</h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {property.features.map((f) => (
                      <li key={f} className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary">
                        {f}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {property.additional_info?.length ? (
                <section className="mt-8">
                  <h2 className="text-lg font-bold text-brand-primary">Informações adicionais</h2>
                  <ul className="mt-3 space-y-1 text-sm text-neutral-800">
                    {property.additional_info.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {property.map_embed ? (
                <section className="mt-8">
                  <h2 className="text-lg font-bold text-brand-primary">Localização</h2>
                  <iframe
                    title="Mapa aproximado"
                    src={property.map_embed}
                    className="mt-3 aspect-video w-full rounded-xl border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </section>
              ) : (
                <section className="mt-8">
                  <h2 className="text-lg font-bold text-brand-primary">Localização</h2>
                  <p className="mt-2 text-sm text-neutral-700">
                    {property.bairro} - {property.cidade} ({property.endereco}, nº {property.numero})
                  </p>
                  <a href={SITE.mapsUrl} className="text-sm font-semibold text-brand-primary underline" target="_blank" rel="noopener noreferrer">
                    Ver região no mapa
                  </a>
                </section>
              )}
            </article>
            <div className="max-lg:order-last max-lg:col-span-full" id="contato-form">
              <ContactPanel property={property} />
            </div>
          </div>
          <div className="fixed inset-x-0 bottom-16 z-30 border-t bg-white p-3 shadow-lg lg:hidden">
            <PropertyMobileCta property={property} />
          </div>
          {related.length ? (
            <section className="mt-16">
              <h2 className="mb-6 text-xl font-bold text-brand-primary">Imóveis relacionados</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p, i) => (
                  <PropertyCard key={p.codigo} property={p} images={propertyImages(p, manifest)} index={i} />
                ))}
              </div>
            </section>
          ) : null}
        </main>
      </SiteShell>
    </>
  );
}