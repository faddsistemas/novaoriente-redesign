"use client";

import Link from "next/link";
import type { PropertyRecord } from "@/lib/property-data";
import { SITE } from "@/lib/site";
import { interestMessage, whatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";

export function PropertyMobileCta({ property }: { property: PropertyRecord }) {
  return (
    <div className="flex gap-2" data-testid="property-mobile-cta">
      <Button asChild className="flex-1" variant="secondary">
        <a href={whatsAppUrl(interestMessage(property.codigo, property.title))} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </Button>
      <Button asChild className="flex-1" variant="outline">
        <a href={`tel:${SITE.phoneTel}`}>Ligar</a>
      </Button>
      <Button asChild className="flex-1">
        <Link href="#contato-form">Interesse</Link>
      </Button>
    </div>
  );
}