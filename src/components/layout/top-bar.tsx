import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export function TopBar() {
  return (
    <div className="hidden border-b border-neutral-200 bg-white text-xs text-neutral-700 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 lg:px-6">
        <span className="font-medium text-brand-primary">{SITE.creciTop}</span>
        <div className="flex flex-wrap items-center gap-4">
          <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-1 hover:text-brand-primary">
            <Phone className="h-3.5 w-3.5" aria-hidden />
            {SITE.phone}
          </a>
          <a
            href={`https://api.whatsapp.com/send?phone=${SITE.whatsappNumber}`}
            className="hover:text-brand-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp {SITE.whatsapp}
          </a>
          <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1 hover:text-brand-primary">
            <Mail className="h-3.5 w-3.5" aria-hidden />
            {SITE.email}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Link href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="h-4 w-4 text-brand-primary" />
          </Link>
          <Link href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="h-4 w-4 text-brand-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
}