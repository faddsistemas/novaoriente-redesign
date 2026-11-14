import { SiteHeader } from "@/components/layout/site-header";
import { SiteShell } from "@/components/layout/site-shell";
import { PageBanner } from "@/components/layout/page-banner";

export default function SobrePage() {
  return (
    <>
      <SiteHeader />
      <SiteShell>
        <PageBanner title="A Empresa" />
        <main className="prose prose-neutral mx-auto max-w-3xl px-4 pb-16 lg:px-6">
          <p className="lead text-lg text-neutral-800">
            A Nova Oriente Corretora de Imóveis atua no mercado de Nova Serrana-MG e região desde{" "}
            <strong>04 de agosto de 2004</strong>, exercendo um trabalho de dedicação, carinho, ética e metas já
            atingidas de muitas realizações de sonhos.
          </p>
          <p>
            É reconhecida pela seriedade, eficácia e qualidade na prestação de serviços. Com conforto e comodidade, a
            empresa ampliou e modernizou suas instalações, visando ser sua melhor companhia na hora de comprar o seu
            imóvel. Investiu também na capacitação de sua equipe de profissionais, garantindo um atendimento de
            excelência aos seus clientes, com assessoramento na hora da venda, compra e financiamento do seu imóvel.
          </p>
          <h2>Missão</h2>
          <p>Viabilizar negócios imobiliários, inovando e criando os melhores recursos de corretagem e atendimento com foco no cliente.</p>
          <h2>Visão</h2>
          <p>Ser reconhecida pelo mercado como a melhor viabilizadora de negócios imobiliários em Nova Serrana-MG e região.</p>
          <h2>Política da Qualidade</h2>
          <p>Desenvolver e aperfeiçoar soluções que satisfaçam as expectativas dos clientes. Qualidade exige trabalho em equipe.</p>
        </main>
      </SiteShell>
    </>
  );
}