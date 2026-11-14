"use client";

import { FormEvent, useState } from "react";
import type { PropertyRecord } from "@/lib/property-data";
import { SITE } from "@/lib/site";
import { contactMessage, interestMessage, whatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ContactPanel({ property }: { property?: PropertyRecord }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [mensagem, setMensagem] = useState(
    property ? interestMessage(property.codigo, property.title) : "",
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = property
      ? `${interestMessage(property.codigo, property.title)}\n\nNome: ${nome} | E-mail: ${email} | Celular: ${celular}\n${mensagem}`
      : contactMessage(nome, email, celular, mensagem);
    window.open(whatsAppUrl(text), "_blank", "noopener,noreferrer");
  }

  return (
    <aside className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-5 shadow-lg" data-testid="contact-panel">
      <h2 className="mb-4 text-lg font-bold text-brand-primary">Fale conosco</h2>
      <form className="space-y-3" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="nome">Nome</Label>
          <Input id="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="celular">Celular</Label>
          <Input id="celular" required value={celular} onChange={(e) => setCelular(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="mensagem">Mensagem</Label>
          <textarea
            id="mensagem"
            required
            className="min-h-28 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Enviar via WhatsApp
        </Button>
      </form>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <Button asChild variant="outline" size="sm">
          <a href={`tel:${SITE.phoneTel}`}>Ligar</a>
        </Button>
        <Button asChild variant="secondary" size="sm">
          <a href={whatsAppUrl(property ? interestMessage(property.codigo, property.title) : "Oi!")} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </Button>
      </div>
    </aside>
  );
}