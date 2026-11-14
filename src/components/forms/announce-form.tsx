"use client";

import { FormEvent, useState } from "react";
import { announceMessage, whatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AnnounceForm() {
  const [fields, setFields] = useState({
    Finalidade: "Vender",
    Nome: "",
    "E-mail": "",
    Telefone: "",
    Celular: "",
    Cidade: "",
    Bairro: "",
    Endereço: "",
    Número: "",
    Complemento: "",
    Características: "",
  });

  function update(key: string, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    window.open(whatsAppUrl(announceMessage(fields)), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
      <fieldset className="md:col-span-2">
        <legend className="mb-2 text-sm font-semibold">Finalidade</legend>
        <label className="mr-4">
          <input
            type="radio"
            name="finalidade"
            checked={fields.Finalidade === "Vender"}
            onChange={() => update("Finalidade", "Vender")}
          />{" "}
          Vender
        </label>
        <label>
          <input
            type="radio"
            name="finalidade"
            checked={fields.Finalidade === "Alugar"}
            onChange={() => update("Finalidade", "Alugar")}
          />{" "}
          Alugar
        </label>
        <p className="mt-1 text-xs text-neutral-600">
          O estoque publicado no site é de venda; para aluguel, a equipe confirma disponibilidade.
        </p>
      </fieldset>
      {[
        ["Nome", "Nome", true],
        ["E-mail", "E-mail", true],
        ["Telefone", "Telefone", false],
        ["Celular", "Celular", true],
        ["Cidade", "Cidade", true],
        ["Bairro", "Bairro", true],
        ["Endereço", "Endereço", true],
        ["Número", "Número", false],
        ["Complemento", "Complemento", false],
      ].map(([key, label, req]) => (
        <div key={String(key)}>
          <Label htmlFor={String(key)}>{label}</Label>
          <Input
            id={String(key)}
            required={Boolean(req)}
            value={fields[key as keyof typeof fields]}
            onChange={(e) => update(String(key), e.target.value)}
          />
        </div>
      ))}
      <div className="md:col-span-2">
        <Label htmlFor="carac">Características</Label>
        <textarea
          id="carac"
          className="min-h-32 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          value={fields.Características}
          onChange={(e) => update("Características", e.target.value)}
        />
      </div>
      <div className="md:col-span-2">
        <Button type="submit">Enviar cadastro via WhatsApp</Button>
      </div>
    </form>
  );
}