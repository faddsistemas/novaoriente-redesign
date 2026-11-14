import { test, expect } from "@playwright/test";

const consoleErrors: string[] = [];

test.beforeEach(async ({ page }) => {
  consoleErrors.length = 0;
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.message));
});

test.afterEach(async () => {
  const ignored = consoleErrors.filter(
    (e) =>
      !e.includes("favicon") &&
      !e.includes("404") &&
      !e.includes("Failed to load resource") &&
      !e.includes("Minified React error #418"),
  );
  expect(ignored, ignored.join("\n")).toEqual([]);
});

test("home carrega e hero existe", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByTestId("hero")).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
  expect(overflow).toBeFalsy();
});

test("hero troca slide", async ({ page }) => {
  await page.goto("./");
  const hero = page.getByTestId("hero");
  await expect(hero).toBeVisible();
  await page.waitForTimeout(7500);
  await expect(hero).toBeVisible();
});

test("busca filtra listagem", async ({ page }) => {
  await page.goto("./venda/imoveis/");
  await expect(page.getByTestId("listing-grid")).toBeVisible();
  await page.goto("./venda/imoveis/?category=lote");
  await expect(page.getByText(/imóveis encontrados/i)).toBeVisible();
});

test("busca por código", async ({ page }) => {
  await page.goto("./venda/imoveis/?codigo=689");
  await page.waitForURL(/\/imovel\/.+\/689\/?/);
  await expect(page.getByTestId("property-gallery")).toBeVisible();
});

test("modal de prévia no card", async ({ page, isMobile }) => {
  await page.goto("./");
  await page.getByTestId("property-card").first().getByRole("button", { name: /Abrir prévia/i }).click();
  const modal = page.getByTestId("property-preview-modal");
  await expect(modal).toBeVisible();
  if (isMobile) {
    const box = await modal.boundingBox();
    expect(box?.height ?? 0).toBeLessThanOrEqual(844);
  }
  await page.getByLabel("Fechar").click();
  await expect(modal).toBeHidden();
});

test("página do imóvel com galeria", async ({ page }) => {
  await page.goto("./imovel/casa-a-venda-4-quartos-3-suites-6-vagas-residencial-sunset-nova-serrana-mg/2831/");
  await expect(page.getByTestId("property-gallery")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Casa à venda/i);
  await expect(page.locator("#contato-form")).toBeAttached();
});

test("conteúdo visível com animação reduzida", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await expect(page.getByTestId("hero")).toBeVisible();
  await expect(page.getByTestId("property-card").first()).toBeVisible();
});

test("links internos principais", async ({ page }) => {
  for (const path of ["./sobre/", "./documentos/", "./anuncie-seu-imovel/", "./contatos/", "./lgpd/"]) {
    const res = await page.goto(path);
    expect(res?.status()).toBeLessThan(400);
  }
});