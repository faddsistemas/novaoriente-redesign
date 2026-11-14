import Link from "next/link";
import { SITE } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <Link
      href={`https://api.whatsapp.com/send?phone=${SITE.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar no WhatsApp"
      data-testid="whatsapp-float"
      className="fixed bottom-20 right-4 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 md:flex md:bottom-24"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden>
        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.657 4.613 1.804 6.52L4 29l7.715-1.728A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 21.818a9.77 9.77 0 01-5.006-1.378l-.358-.213-4.586 1.03 1.046-4.47-.233-.37A9.818 9.818 0 1116 24.818zm5.707-7.344c-.314-.157-1.86-.918-2.148-1.023-.288-.105-.498-.157-.707.157-.21.314-.813 1.023-.996 1.234-.183.21-.366.236-.68.079-.314-.157-1.326-.489-2.526-1.56-.934-.833-1.565-1.86-1.748-2.174-.183-.314-.02-.484.137-.64.14-.14.314-.366.471-.55.157-.183.21-.314.314-.524.105-.21.052-.393-.026-.55-.079-.157-.707-1.705-.969-2.334-.254-.61-.512-.527-.707-.537-.183-.009-.393-.011-.602-.011s-.55.079-.838.393c-.288.314-1.1 1.074-1.1 2.619s1.126 3.039 1.284 3.246c.157.208 2.217 3.387 5.373 4.748.751.324 1.337.518 1.794.663.753.239 1.438.206 1.98.125.604-.09 1.86-.761 2.123-1.496.262-.735.262-1.365.183-1.496-.078-.131-.288-.21-.602-.366z" />
      </svg>
    </Link>
  );
}