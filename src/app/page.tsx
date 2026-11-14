import { SiteHeader } from "@/components/layout/site-header";
import { SiteShell } from "@/components/layout/site-shell";
import { HeroCinematic } from "@/components/home/hero-cinematic";
import { StatsBand } from "@/components/home/stats-band";
import { TypeShowcase } from "@/components/home/type-showcase";
import { PropertyCard } from "@/components/property/property-card";
import {
  featuredGridProperties,
  heroSlideProperties,
} from "@/lib/property-data";
import { loadImageManifest } from "@/lib/manifest";
import { primaryImage, propertyImages } from "@/lib/images";

export default function HomePage() {
  const manifest = loadImageManifest();
  const heroProps = heroSlideProperties();
  const slides = heroProps.map((property) => ({
    property,
    image: primaryImage(property, manifest),
  }));
  const featured = featuredGridProperties(12);

  return (
  <>
    <SiteHeader transparent />
    <SiteShell showTopBar={false}>
      <HeroCinematic slides={slides} />
      <StatsBand />
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <h2 className="mb-8 text-2xl font-bold text-brand-primary">Destaques de venda</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((property, i) => (
            <PropertyCard
              key={property.codigo}
              property={property}
              images={propertyImages(property, manifest)}
              index={i}
            />
          ))}
        </div>
      </section>
      <TypeShowcase manifest={manifest} />
    </SiteShell>
  </>
  );
}