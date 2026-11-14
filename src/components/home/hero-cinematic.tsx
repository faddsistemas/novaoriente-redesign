"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { PropertyRecord } from "@/lib/property-data";
import { propertyPath } from "@/lib/property-data";
import { formatPriceBRL } from "@/lib/format";
import type { PropertyImageSet } from "@/lib/images";
import { BlurText } from "@/components/react-bits/blur-text";
import { SplitReveal } from "@/components/react-bits/split-reveal";
import { PropertySearch } from "@/components/search/property-search";
import { Button } from "@/components/ui/button";
import { Magnet } from "@/components/react-bits/magnet";

type Slide = {
  property: PropertyRecord;
  image: PropertyImageSet;
};

export function HeroCinematic({ slides }: { slides: Slide[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slide = slides[index] ?? slides[0];

  useEffect(() => {
    if (!slides.length || reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 7000);
    return () => window.clearInterval(id);
  }, [slides.length, reduce]);

  const title = useMemo(() => {
    if (!slide) return "";
    return `${slide.property.tipo} — ${slide.property.bairro}`;
  }, [slide]);

  if (!slide) return null;

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden" data-testid="hero">
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.property.codigo}
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 1.2 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={reduce ? {} : { scale: [1, 1.06] }}
            transition={{ duration: 12, ease: "linear" }}
          >
            <Image
              src={slide.image.src}
              alt={slide.property.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-28 pt-28 lg:px-6 lg:pb-20">
        <div className="mb-6 max-w-3xl text-white">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/85">
            Destaque à venda
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            <SplitReveal words={title} />
          </h1>
          <BlurText
            as="p"
            text={formatPriceBRL(slide.property.price_min || slide.property.price)}
            className="mt-3 text-2xl font-semibold text-brand-secondary md:text-3xl"
          />
          <p className="mt-2 text-sm text-white/90 md:text-base">
            {slide.property.cidade} · Cód. {slide.property.codigo}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Magnet>
              <Button asChild size="lg" variant="secondary">
                <Link href={propertyPath(slide.property)}>Ver imóvel</Link>
              </Button>
            </Magnet>
          </div>
        </div>

        <div className="hidden w-full max-w-4xl md:block">
          <PropertySearch />
        </div>
        <div className="md:hidden">
          <PropertySearch compact />
        </div>
      </div>
    </section>
  );
}