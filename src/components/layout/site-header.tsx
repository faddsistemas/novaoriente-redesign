"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { assetUrl, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/venda/imoveis/", label: "Buscar Imóveis" },
  { href: "/sobre/", label: "Sobre" },
  { href: "/anuncie-seu-imovel/", label: "Anunciar" },
  { href: "/contatos/", label: "Contato" },
];

const sobreLinks = [
  { href: "/sobre/", label: "A Empresa" },
  { href: "/documentos/", label: "Documentos" },
];

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [solid, setSolid] = useState(!transparent);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setSolid(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-300",
        solid ? "border-b border-neutral-200 bg-white/95 shadow-sm backdrop-blur-md" : "bg-gradient-to-b from-black/35 to-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="shrink-0 rounded-md bg-white/90 p-1.5 shadow-sm">
          <Image
            src={assetUrl("/brand/logo.png")}
            alt={SITE.name}
            width={190}
            height={70}
            priority
            className="h-10 w-auto lg:h-12"
          />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {links.map((link) =>
            link.label === "Sobre" ? (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-semibold",
                    solid ? "text-brand-primary" : "text-white drop-shadow",
                  )}
                >
                  {link.label}
                </Link>
                <div className="invisible absolute left-0 top-full z-50 min-w-[11rem] translate-y-2 rounded-lg border bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {sobreLinks.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block rounded-md px-3 py-2 text-sm text-brand-primary hover:bg-neutral-50"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition hover:opacity-80",
                  solid ? "text-brand-primary" : "text-white drop-shadow",
                )}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className={cn("lg:hidden", solid ? "text-brand-primary" : "text-white")}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menu"
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open ? (
        <div className="border-t bg-white px-4 py-3 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-neutral-100 py-3 text-sm font-semibold text-brand-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/documentos/"
            onClick={() => setOpen(false)}
            className="block py-3 text-sm text-neutral-700"
          >
            Documentos
          </Link>
        </div>
      ) : null}
    </header>
  );
}