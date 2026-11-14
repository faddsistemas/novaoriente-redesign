"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { PropertyRecord } from "@/lib/property-data";
import { propertyPath } from "@/lib/property-data";
import { formatArea, formatPriceBRL, bedBathPark } from "@/lib/format";
import type { PropertyImageSet } from "@/lib/images";
import { interestMessage, whatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";

type Props = {
  property: PropertyRecord;
  images: PropertyImageSet[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PropertyPreviewModal({ property, images, open, onOpenChange }: Props) {
  const { bedrooms, bathrooms, parking } = bedBathPark(
    property.bedrooms,
    property.bathrooms,
    property.parking,
  );
  const img = images[0];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <Dialog.Content
          data-testid="property-preview-modal"
          className="fixed inset-x-3 top-[max(0.75rem,env(safe-area-inset-top))] z-50 flex max-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2"
        >
          <Dialog.Close
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white"
            aria-label="Fechar"
          >
            <X className="h-6 w-6" />
          </Dialog.Close>
          <div className="relative h-[38vh] max-h-56 shrink-0 sm:h-52">
            <Image src={img?.src ?? ""} alt="" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-4 pt-3">
            <Dialog.Title className="pr-12 text-base font-bold text-brand-primary line-clamp-2">
              {property.title}
            </Dialog.Title>
            <p className="text-lg font-semibold text-neutral-900">
              {formatPriceBRL(property.price_min || property.price)}
            </p>
            <p className="text-sm text-neutral-600">
              {property.bairro} · {property.cidade} · Cód. {property.codigo}
            </p>
            <p className="text-xs text-neutral-700">
              {formatArea(property.area_principal || property.area_lote)} · {bedrooms} quartos · {bathrooms}{" "}
              banheiros · {parking} vagas
            </p>
            <Description text={property.description} />
            <div className="mt-auto grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Button asChild>
                <Link href={propertyPath(property)}>Ver imóvel completo</Link>
              </Button>
              <Button asChild variant="secondary">
                <a
                  href={whatsAppUrl(interestMessage(property.codigo, property.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chamar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Description({ text }: { text: string }) {
  const trimmed = text.replace(/\s+/g, " ").trim();
  const short = trimmed.length > 160 ? `${trimmed.slice(0, 157)}…` : trimmed;
  return <p className="line-clamp-3 text-xs leading-relaxed text-neutral-700">{short}</p>;
}