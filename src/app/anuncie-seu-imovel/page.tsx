import { SiteHeader } from "@/components/layout/site-header";
import { SiteShell } from "@/components/layout/site-shell";
import { PageBanner } from "@/components/layout/page-banner";
import { AnnounceForm } from "@/components/forms/announce-form";

export default function AnunciePage() {
  return (
    <>
      <SiteHeader />
      <SiteShell>
        <PageBanner title="Anuncie seu imóvel" subtitle="Cadastre seu imóvel para venda — nosso time retorna pelo WhatsApp." />
        <main className="mx-auto max-w-4xl px-4 pb-16 lg:px-6">
          <AnnounceForm />
        </main>
      </SiteShell>
    </>
  );
}