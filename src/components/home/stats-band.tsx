"use client";

import { CountUp } from "@/components/react-bits/count-up";
import { statsPayload } from "@/lib/property-data";

export function StatsBand() {
  const stats = statsPayload();
  return (
    <section className="bg-brand-primary py-10 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 text-center md:grid-cols-4 lg:px-6">
        <h2 className="sr-only">Números do estoque</h2>
        <div>
          <p className="text-3xl font-bold">
            <CountUp value={stats.total} />
          </p>
          <p className="text-sm text-white/85">Imóveis à venda</p>
        </div>
        <div>
          <p className="text-3xl font-bold">
            <CountUp value={stats.casa} />
          </p>
          <p className="text-sm text-white/85">Casas</p>
        </div>
        <div>
          <p className="text-3xl font-bold">
            <CountUp value={stats.apartamento} />
          </p>
          <p className="text-sm text-white/85">Apartamentos</p>
        </div>
        <div>
          <p className="text-3xl font-bold">
            <CountUp value={stats.lote} />
          </p>
          <p className="text-sm text-white/85">Lotes</p>
        </div>
      </div>
    </section>
  );
}