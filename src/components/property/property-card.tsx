"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bath, BedDouble, Car, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { PropertyRecord } from "@/lib/property-data";
import { formatArea, formatPriceBRL, bedBathPark } from "@/lib/format";
import type { PropertyImageSet } from "@/lib/images";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PropertyPreviewModal } from "./property-preview-modal";

type Props = {
  property: PropertyRecord;
  images: PropertyImageSet[];
  index?: number;
};

export function PropertyCard({ property, images, index = 0 }: Props) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { bedrooms, bathrooms, parking } = bedBathPark(
    property.bedrooms,
    property.bathrooms,
    property.parking,
  );
  const imgs = images.length ? images : [{ src: "", thumb: "", placeholder: true }];
  const current = imgs[photoIndex] ?? imgs[0];

  function nextPhoto(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setPhotoIndex((i) => (i + 1) % imgs.length);
  }

  function prevPhoto(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setPhotoIndex((i) => (i - 1 + imgs.length) % imgs.length);
  }

  return (
    <>
      <motion.article
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: reduce ? 0 : (index % 6) * 0.05 }}
        whileHover={reduce ? undefined : { y: -6, rotateX: 2, rotateY: -2 }}
        className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
        data-testid="property-card"
      >
        <div
          className="relative block aspect-[4/3] w-full cursor-pointer overflow-hidden text-left"
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Abrir prévia do imóvel ${property.codigo}`}
        >
          <Image
            src={current.src}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          {property.exclusive ? (
            <Badge className="absolute left-3 top-3" variant="secondary">
              Exclusivo
            </Badge>
          ) : null}
          <Badge className="absolute right-3 top-3" variant="default">
            {property.tipo}
          </Badge>
          {imgs.length > 1 ? (
            <>
              <button
                type="button"
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white opacity-0 transition group-hover:opacity-100"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white opacity-0 transition group-hover:opacity-100"
                aria-label="Próxima foto"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : null}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <p className="text-lg font-bold text-white">{formatPriceBRL(property.price_min || property.price)}</p>
          </div>
        </div>
        <motion.div
          className={cn("space-y-2 p-4")}
          onClick={() => setOpen(true)}
          role="presentation"
        >
          <h3 className="line-clamp-2 text-sm font-semibold text-brand-primary">{property.title}</h3>
          <p className="text-xs text-neutral-600">
            {property.bairro} · {property.cidade}
          </p>
          <ul className="flex flex-wrap gap-3 text-xs text-neutral-700">
            <li className="inline-flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
              {formatArea(property.area_principal || property.area_lote)}
            </li>
            <li className="inline-flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
              {bedrooms || "—"}
            </li>
            <li className="inline-flex items-center gap-1">
              <Bath className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
              {bathrooms || "—"}
            </li>
            <li className="inline-flex items-center gap-1">
              <Car className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
              {parking || "—"}
            </li>
          </ul>
          <Link
            href={`/imovel/${property.slug}/${property.codigo}/`}
            className="text-xs font-semibold text-brand-primary underline"
            onClick={(e) => e.stopPropagation()}
          >
            Ver detalhes
          </Link>
        </motion.div>
      </motion.article>
      <PropertyPreviewModal property={property} images={imgs} open={open} onOpenChange={setOpen} />
    </>
  );
}