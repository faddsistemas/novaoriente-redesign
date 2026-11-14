"use client";

import { FormEvent, useState } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteShell } from "@/components/layout/site-shell";
import { PageBanner } from "@/components/layout/page-banner";
import { SITE } from "@/lib/site";
import { contactMessage, whatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContatosPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [aceite, setAceite] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!aceite) return;
    const text = `${contactMessage(nome, email, celular, mensagem)} | Telefone fixo: ${telefone}`;
    window.open(whatsAppUrl(text), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <SiteHeader />
      <SiteShell>
        <PageBanner title="Contato" />
        <main className="mx-auto grid max-w-5xl gap-10 px-4 pb-16 lg:grid-cols-2 lg:px-6">
          <div>
            <h2 className="text-lg font-bold text-brand-primary">Fale com a Nova Oriente</h2>
            <ul className="mt-4 space-y-2 text-sm text-neutral-800">
              <li>{SITE.address}</li>
              <li>
                <a href={`mailto:${SITE.email}`} className="text-brand-primary underline">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
              </li>
              <li>WhatsApp {SITE.whatsapp}</li>
              <li>{SITE.hours}</li>
            </ul>
          </div>
          <form className="space-y-3 rounded-2xl border p-6 shadow-sm" onSubmit={onSubmit}>
            <h2 className="text-lg font-bold text-brand-primary">Envie sua mensagem</h2>
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
              <Label htmlFor="telefone">Telefone fixo</Label>
              <Input id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
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
            <label className="flex items-start gap-2 text-xs text-neutral-700">
              <input type="checkbox" required checked={aceite} onChange={(e) => setAceite(e.target.checked)} />
              Concordo com a política de privacidade
            </label>
            <Button type="submit">Enviar via WhatsApp</Button>
          </form>
        </main>
      </SiteShell>
    </>
  );
}