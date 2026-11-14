import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <SiteShell>
        <main className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-brand-primary">Página não encontrada</h1>
          <p className="mt-3 text-neutral-600">O endereço digitado não existe. Volte para a home ou busque um imóvel.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/">Ir para a home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/venda/imoveis/">Buscar imóveis</Link>
            </Button>
          </div>
        </main>
      </SiteShell>
    </>
  );
}