import { SITE } from "./site";

export function whatsAppUrl(text: string) {
  return `https://api.whatsapp.com/send?phone=${SITE.whatsappNumber}&text=${encodeURIComponent(text)}`;
}

export function interestMessage(codigo: number, title: string) {
  return `Olá! Tenho interesse no imóvel ${title} (código ${codigo}). Poderiam me enviar mais informações?`;
}

export function contactMessage(nome: string, email: string, celular: string, msg: string) {
  return `Contato pelo site — Nome: ${nome} | E-mail: ${email} | Celular: ${celular} | Mensagem: ${msg}`;
}

export function announceMessage(fields: Record<string, string>) {
  const lines = Object.entries(fields)
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}: ${v}`);
  return `Quero anunciar um imóvel na Nova Oriente.\n\n${lines.join("\n")}`;
}

export function newsletterMessage(email: string) {
  return `Newsletter — quero receber novidades. E-mail: ${email}`;
}