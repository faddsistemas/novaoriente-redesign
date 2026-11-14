import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-neutral-200 bg-white p-2 shadow-lg md:hidden">
      <Button asChild className="flex-1" variant="default">
        <Link
          href={`https://api.whatsapp.com/send?phone=${SITE.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </Link>
      </Button>
      <Button asChild className="flex-1" variant="outline">
        <a href={`tel:${SITE.phoneTel}`}>
          <Phone className="mr-1 h-4 w-4" aria-hidden />
          Ligar
        </a>
      </Button>
    </div>
  );
}