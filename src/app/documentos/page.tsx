import { SiteHeader } from "@/components/layout/site-header";
import { SiteShell } from "@/components/layout/site-shell";
import { PageBanner } from "@/components/layout/page-banner";

export default function DocumentosPage() {
  return (
    <>
      <SiteHeader />
      <SiteShell>
        <PageBanner
          title="Documentos"
          subtitle="Confira a documentação necessária para comprar ou vender seu imóvel."
        />
        <main className="mx-auto max-w-4xl space-y-10 px-4 pb-16 text-sm leading-relaxed text-neutral-800 lg:px-6">
          <section>
            <h2 className="text-xl font-bold text-brand-primary">Locatário — Pessoa Física</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5">
              <li>RG e CPF</li>
              <li>RG e CPF (cônjuge) se for casado</li>
              <li>Certidão de Casamento ou Nascimento</li>
              <li>Comprovante de Residência</li>
              <li>Comprovante de Renda (3x aluguel)</li>
              <li>Certidão negativa de protesto (imobiliária)</li>
              <li>Certidão negativa de fórum (imobiliária)</li>
            </ol>
            <p className="mt-2 text-neutral-600">
              Observações: as certidões de protesto e de fórum deverão ser do fiador e cônjuge; no caso de Divórcio ou
              Óbito, trazer comprovante.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-primary">Locatário — Pessoa Jurídica</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5">
              <li>Contrato Social e Alterações</li>
              <li>Cartão do C.G.C</li>
              <li>RG e CPF do representante legal</li>
              <li>Último Balanço</li>
              <li>Certidão negativa de protesto (imobiliária)</li>
              <li>Certidão negativa de fórum (imobiliária)</li>
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-primary">Fiador — Pessoa Física</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5">
              <li>RG e CPF</li>
              <li>RG e CPF (cônjuge) se for casado</li>
              <li>Certidão de Casamento ou Nascimento</li>
              <li>Comprovante de Residência</li>
              <li>Comprovante de Renda</li>
              <li>IPTU do imóvel dado em garantia</li>
              <li>Matrícula do imóvel (certidão negativa de ônus atualizada)</li>
              <li>Certidão negativa de protesto (imobiliária)</li>
              <li>Certidão negativa de fórum (imobiliária)</li>
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-primary">Outras garantias — Título de capitalização</h2>
            <p>1 - Apresentar todos os documentos do Locatário. 2 - Pagamento do Título, valor sob consulta.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-primary">Outras garantias — Seguro Fiança</h2>
            <p>1 - Apresentar todos os documentos do Locatário. 2 - Valor mensal de 15% do valor do imóvel.</p>
          </section>
          <p className="text-neutral-600">
            Os itens solicitados deverão ser fotocópias autenticadas, exceto as Certidões Protesto, Fórum e Ônus, que
            deverão ser os originais. Para comprovação de renda, trazer holerite ou declaração do contador assinada e
            reconhecida firma. (Ortografia &quot;Pessoa Física&quot; corrigida em relação ao site legado.)
          </p>
        </main>
      </SiteShell>
    </>
  );
}