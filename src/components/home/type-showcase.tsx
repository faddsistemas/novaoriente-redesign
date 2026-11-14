"use client";

import Image from "next/image";
import Link from "next/link";
import { countByCategory, sampleImageForCategory } from "@/lib/property-data";
import { primaryImage } from "@/lib/images";
import type { ImageManifest } from "@/lib/manifest";
import { Magnet } from "@/components/react-bits/magnet";
import { Button } from "@/components/ui/button";

const items = [
  { key: "casa" as const, label: "Casas", href: "/venda/imoveis/?category=casa" },
  { key: "apartamento" as const, label: "Apartamentos", href: "/venda/imoveis/?category=apartamento" },
  { key: "lote" as const, label: "Lotes", href: "/venda/imoveis/?category=lote" },
];

export function TypeShowcase({ manifest }: { manifest: ImageManifest }) {
  const counts = countByCategory();
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6" aria-labelledby="type-heading">
      <h2 id="type-heading" className="mb-8 text-center text-2xl font-bold text-brand-primary md:text-3xl">
        O que você está procurando para comprar?
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => {
          const sample = sampleImageForCategory(item.key);
          const img = sample ? primaryImage(sample, manifest) : null;
          return (
            <Magnet key={item.key} className="h-full w-full">
              <Link
                href={item.href}
                className="group relative flex h-full min-h-56 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm"
              >
                {img ? (
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-brand-muted" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="relative mt-auto w-full p-5 text-white">
                  <p className="text-xl font-bold">{item.label}</p>
                  <p className="text-sm text-white/90">{counts[item.key]} imóveis à venda</p>
                  <Button variant="secondary" size="sm" className="mt-3" asChild>
                    <span>Explorar</span>
                  </Button>
                </div>
              </Link>
            </Magnet>
          );
        })}
      </div>
    </section>
  );
}