import { SiteHeader } from "@/components/layout/site-header";
import { SiteShell } from "@/components/layout/site-shell";
import { PageBanner } from "@/components/layout/page-banner";

export default function LgpdPage() {
  return (
    <>
      <SiteHeader />
      <SiteShell>
        <PageBanner title="Lei geral de proteção de dados" />
        <main className="mx-auto max-w-3xl px-4 pb-16 text-sm leading-relaxed text-neutral-800 lg:px-6">
          <p>
            Utilizamos cookies para melhorar a sua experiência de navegação no nosso site. Ao continuar navegando, você
            concorda com a nossa política de cookies. Para mais informações, entre em contato conosco.
          </p>
          <p className="mt-4 text-neutral-600">
            Este conteúdo reflete o texto publicado no site original da Nova Oriente em novembro de 2026, sem inclusão de
            cláusulas adicionais não publicadas pela corretora.
          </p>
        </main>
      </SiteShell>
    </>
  );
}