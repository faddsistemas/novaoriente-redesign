import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Para comprar apartamentos, casas, terrenos consulte a Nova Oriente. Muitas opções de imóveis à venda em Nova Serrana/MG | Nova Oriente",
  icons: { icon: `${SITE.basePath}/brand/favicon.ico` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${openSans.variable} ${playfair.variable} min-h-screen overflow-x-hidden pb-20 md:pb-0`}>
        {children}
      </body>
    </html>
  );
}