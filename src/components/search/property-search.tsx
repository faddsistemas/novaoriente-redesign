"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { distinctCities, distinctNeighborhoods, distinctTypes } from "@/lib/property-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const chips = [
  { label: "Casas", category: "casa" },
  { label: "Apartamentos", category: "apartamento" },
  { label: "Lotes", category: "lote" },
] as const;

type Props = {
  compact?: boolean;
  className?: string;
};

function buildQuery(fields: Record<string, string>) {
  const params = new URLSearchParams();
  Object.entries(fields).forEach(([k, v]) => {
    if (v && v !== "todos" && v !== "todas") params.set(k, v);
  });
  const q = params.toString();
  return q ? `?${q}` : "";
}

export function PropertySearch({ compact = false, className }: Props) {
  const router = useRouter();
  const cities = useMemo(() => distinctCities(), []);
  const types = useMemo(() => distinctTypes(), []);
  const [cidade, setCidade] = useState("todas");
  const [bairro, setBairro] = useState("todos");
  const [tipo, setTipo] = useState("todos");
  const [quartos, setQuartos] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [codigo, setCodigo] = useState("");
  const neighborhoods = useMemo(() => distinctNeighborhoods(cidade), [cidade]);

  function submit(extra?: Record<string, string>) {
    const path = `/venda/imoveis/${buildQuery({
      cidade,
      bairro,
      tipo,
      quartos,
      precoMin,
      precoMax,
      codigo,
      ...extra,
    })}`;
    router.push(path);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submit();
  }

  function searchByCode(e: FormEvent) {
    e.preventDefault();
    if (!codigo.trim()) return;
    submit({ codigo: codigo.trim().replace(/\s/g, "") });
  }

  const fields = (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
      <label className="sr-only" htmlFor="search-tipo">
        Tipo
      </label>
      <select
        id="search-tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm"
      >
        <option value="todos">Todos os tipos</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <select
        aria-label="Cidade"
        value={cidade}
        onChange={(e) => {
          setCidade(e.target.value);
          setBairro("todos");
        }}
        className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm"
      >
        <option value="todas">Todas as cidades</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        aria-label="Bairro"
        value={bairro}
        onChange={(e) => setBairro(e.target.value)}
        className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm"
      >
        <option value="todos">Todos os bairros</option>
        {neighborhoods.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      <select
        aria-label="Quartos"
        value={quartos}
        onChange={(e) => setQuartos(e.target.value)}
        className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm"
      >
        <option value="">Quartos</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={String(n)}>
            {n}+ quartos
          </option>
        ))}
      </select>
      <Input
        aria-label="Preço mínimo"
        placeholder="Preço min"
        inputMode="numeric"
        value={precoMin}
        onChange={(e) => setPrecoMin(e.target.value.replace(/\D/g, ""))}
        className="min-w-0"
      />
      <Input
        aria-label="Preço máximo"
        placeholder="Preço max"
        inputMode="numeric"
        value={precoMax}
        onChange={(e) => setPrecoMax(e.target.value.replace(/\D/g, ""))}
        className="min-w-0"
      />
    </div>
  );

  if (compact) {
    return (
      <div className={cn("w-full max-w-xl", className)}>
        <div className="flex flex-wrap gap-2 pb-3">
          {chips.map((c) => (
            <button
              key={c.category}
              type="button"
              onClick={() => submit({ category: c.category })}
              className="rounded-full border border-white/50 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur hover:bg-white/25"
            >
              {c.label}
            </button>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            aria-label="Abrir busca completa"
            readOnly
            placeholder="Buscar por tipo, bairro, quartos…"
            className="cursor-pointer bg-white/95"
            onClick={() => {}}
          />
          <Sheet>
            <SheetTrigger asChild>
              <Button type="button" size="icon" aria-label="Abrir filtros">
                <Search />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <h2 className="mb-4 text-lg font-bold text-brand-primary">Buscar imóveis</h2>
              <form className="space-y-4" onSubmit={onSubmit}>
                {fields}
                <div className="flex flex-wrap gap-2">
                  {chips.map((c) => (
                    <button
                      key={c.category}
                      type="button"
                      onClick={() => submit({ category: c.category })}
                      className="rounded-full border border-brand-primary/30 px-3 py-1 text-xs font-semibold text-brand-primary"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <Button type="submit" className="w-full">
                  Pesquisar
                </Button>
              </form>
              <form className="mt-6 space-y-2 border-t pt-4" onSubmit={searchByCode}>
                <label className="text-sm font-medium" htmlFor="code-mobile">
                  Pesquisar pelo código
                </label>
                <Input id="code-mobile" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                <Button type="submit" variant="outline" className="w-full">
                  Buscar código
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </form>
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur", className)}>
      <form className="space-y-4" onSubmit={onSubmit}>
        {fields}
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((c) => (
            <button
              key={c.category}
              type="button"
              onClick={() => submit({ category: c.category })}
              className="rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-semibold text-brand-primary hover:bg-brand-primary/10"
            >
              {c.label}
            </button>
          ))}
          <Button type="submit" className="ml-auto min-w-[9rem]">
            Pesquisar
          </Button>
        </div>
      </form>
      <form className="mt-3 flex flex-col gap-2 border-t border-neutral-200 pt-3 sm:flex-row" onSubmit={searchByCode}>
        <Input
          id="code-desktop"
          placeholder="Pesquisar pelo código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          aria-label="Código do imóvel"
        />
        <Button type="submit" variant="outline">
          Buscar código
        </Button>
      </form>
    </div>
  );
}