export const SITE = {
  name: "Nova Oriente Corretora de Imóveis",
  legalName:
    'Dilma D\'castro Administradora e Corretora de Imóveis "Nova Oriente Corretora de Imóveis"',
  cnpj: "09.203.618/0001-23",
  creciTop: "CRECI PJ 3587",
  creciFooter: "CRECI 3587 J",
  slogan: "O melhor investimento da sua vida está aqui!",
  homeTitle: "Encontre seu imóvel na Nova Oriente",
  address: "R. Vital Paulino Pereira, 07 - Centro, Nova Serrana - MG, 35519-000",
  mapsUrl: "https://goo.gl/maps/Zt925ZT6pL1VSNH1A",
  phone: "(37) 3226-2343",
  phoneTel: "3732262343",
  whatsapp: "(37) 99999-1100",
  whatsappNumber: "5537999991100",
  email: "contato@novaoriente.com.br",
  hours: "Segunda à Quinta: 8:00 às 18:30 | Sexta: 8:00 às 17:30",
  facebook: "https://www.facebook.com/novaoriente/",
  instagram: "https://www.instagram.com/novaorientecorretoraimoveis/",
  basePath: "/novaoriente-redesign",
} as const;

export function assetUrl(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.basePath}${clean}`;
}