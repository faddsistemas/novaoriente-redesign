"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const KEY = "no-cookie-consent";

export function CookieBar() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setVisible(!localStorage.getItem(KEY));
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-primary/20 bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm md:bottom-[max(0px,env(safe-area-inset-bottom))]"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      role="dialog"
      aria-label="Aviso de cookies"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-2 text-sm text-neutral-800 md:flex-row md:items-center md:justify-between">
        <p>
          Utilizamos cookies para melhorar sua experiência. Saiba mais na{" "}
          <Link href="/lgpd/" className="font-semibold text-brand-primary underline">
            política de privacidade
          </Link>
          .
        </p>
        <Button
          size="sm"
          className="shrink-0"
          onClick={() => {
            localStorage.setItem(KEY, "1");
            setVisible(false);
          }}
        >
          Aceito
        </Button>
      </div>
    </div>
  );
}