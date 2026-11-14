"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { assetUrl, SITE } from "@/lib/site";
import { newsletterMessage, whatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/sobre/", label: "Sobre" },
  { href: "/anuncie-seu-imovel/", label: "Anuncie seu Imóvel" },
  { href: "/documentos/", label: "Documentos" },
  { href: "/contatos/", label: "Fale Conosco" },
  { href: "/lgpd/", label: "Política de Privacidade" },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");

  function onNewsletter(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    window.open(whatsAppUrl(newsletterMessage(email.trim())), "_blank", "noopener,noreferrer");
  }

  return (
    <footer className="mt-16">
      <div className="bg-neutral-800 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 text-center md:flex-row md:justify-between md:text-left lg:px-6">
          <div className="rounded-lg bg-white/95 p-3 shadow">
            <Image
              src={assetUrl("/brand/logo.png")}
              alt={SITE.name}
              width={204}
              height={63}
              className="h-12 w-auto"
            />
          </div>
          <p className="max-w-xl text-lg font-semibold uppercase tracking-wide text-white">
            {SITE.slogan}
          </p>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
            <Link href="/contatos/">Entre em contato</Link>
          </Button>
        </div>
      </div>
      <div className="bg-brand-footer text-neutral-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 lg:px-6">
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contato</h2>
            <ul className="space-y-2 text-sm text-neutral-100">
              <li>
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {SITE.address}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:underline">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phoneTel}`} className="hover:underline">
                  {SITE.phone}
                </a>
              </li>
              <li>WhatsApp {SITE.whatsapp}</li>
              <li>{SITE.hours}</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Links</h2>
            <ul className="space-y-2 text-sm">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-neutral-100 hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Entramos em contato</h2>
            <form className="flex gap-2" onSubmit={onNewsletter}>
              <Input
                type="email"
                required
                aria-label="E-mail"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-neutral-500 bg-white/10 text-white placeholder:text-neutral-300"
              />
              <Button type="submit">Enviar</Button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-sm text-neutral-100 lg:flex-row lg:items-center lg:justify-between lg:px-6">
            <p>
              © {new Date().getFullYear()} | {SITE.legalName}
              <br />
              CNPJ: {SITE.cnpj} | {SITE.creciFooter}
            </p>
            <p className="text-neutral-200">Redesign comercial — proposta Nova Oriente</p>
          </div>
        </div>
      </div>
    </footer>
  );
}