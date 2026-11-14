"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { PropertyImageSet } from "@/lib/images";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";

export function PropertyGallery({
  images,
  title,
}: {
  images: PropertyImageSet[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [fs, setFs] = useState(false);
  const list = images.length ? images : [];
  const current = list[index] ?? list[0];

  if (!current) return null;

  return (
    <div data-testid="property-gallery" className="min-w-0">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100">
        <Image src={current.src} alt={title} fill priority className="absolute inset-0 object-cover" sizes="(max-width: 1024px) 100vw, 70vw" />
        {list.length > 1 ? (
          <>
            <button
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-3 text-white"
              aria-label="Anterior"
              onClick={() => setIndex((i) => (i - 1 + list.length) % list.length)}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-3 text-white"
              aria-label="Próxima"
              onClick={() => setIndex((i) => (i + 1) % list.length)}
            >
              <ChevronRight />
            </button>
          </>
        ) : null}
        <button
          type="button"
          onClick={() => setFs(true)}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-3 py-2 text-xs font-semibold text-white"
        >
          <Maximize2 className="h-4 w-4" />
          Tela cheia
        </button>
      </div>
      {list.length > 1 ? (
        <div className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1">
          {list.map((img, i) => (
            <button
              key={img.thumb + i}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2",
                i === index ? "border-brand-primary" : "border-transparent",
              )}
            >
              <Image src={img.thumb} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      ) : null}
      <Dialog.Root open={fs} onOpenChange={setFs}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center">
            <Image src={current.src} alt={title} fill className="object-contain" sizes="100vw" />
            <Dialog.Close className="absolute right-4 top-4 rounded-full bg-white/20 p-3 text-white">Fechar</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}