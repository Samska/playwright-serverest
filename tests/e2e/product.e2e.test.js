const { test, expect } = require("@playwright/test");
const { userData, createUser } = require("../../support/e2e/create-user");
const { login } = require("../../support/e2e/login");
const { productData, createProduct } = require("../../support/e2e/product");

test.describe("Product tests", () => {
  let page;
  let email;
  let password;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/cadastrarusuarios");
    await createUser(page, userData);
    email = userData.email;
    password = userData.password;
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await login(page, { email, password });
    await page.click("[data-testid='cadastrarProdutos']");
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("check required fields", async ({ page }) => {
    await page.click("[data-testid='cadastarProdutos']");
    await page.waitForSelector('text="Nome é obrigatório"');
    await page.waitForSelector('text="Preco é obrigatório"');
    await page.waitForSelector('text="Descricao é obrigatório"');
    await page.waitForSelector('text="Quantidade é obrigatório"');
  });

  test("create product", async ({ page }) => {
    await createProduct(page, productData);
    await expect(page).toHaveURL("/admin/listarprodutos");
    await page.waitForSelector(`//tr[td[text()='${productData.nome}']]`);
  });

  test("delete product", async ({ page }) => {
    await createProduct(page, productData);
    await page.click(
      `//tr[td[text()='${productData.nome}']]//button[text()='Excluir']`
    );
    await page.waitForSelector(`//tr[td[text()='${productData.nome}']]`, { state: 'detached' });
  });
});
