import { ReactNode } from "react";
import { CookieBar } from "./cookie-bar";
import { MobileActionBar } from "./mobile-action-bar";
import { SiteFooter } from "./site-footer";
import { TopBar } from "./top-bar";
import { WhatsAppFloat } from "./whatsapp-float";

export function SiteShell({
  children,
  showTopBar = true,
}: {
  children: ReactNode;
  showTopBar?: boolean;
}) {
  return (
    <>
      {showTopBar ? <TopBar /> : null}
      {children}
      <SiteFooter />
      <WhatsAppFloat />
      <CookieBar />
      <MobileActionBar />
    </>
  );
}