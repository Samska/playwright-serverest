const { test, expect } = require("@playwright/test");
const { userData, createUser } = require("../../support/e2e/create-user");

test.describe("Create user tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/cadastrarusuarios");
  });

  test("check required fields", async ({ page }) => {
    await page.click("[data-testid='cadastrar']");
    await page.waitForSelector('text="Nome é obrigatório"');
    await page.waitForSelector('text="Email é obrigatório"');
    await page.waitForSelector('text="Password é obrigatório"');
  });

  test("create user", async ({ page }) => {
    await createUser(page, userData);
    await page.waitForSelector('text="Cadastro realizado com sucesso"');
    await page.waitForURL("/admin/home");
  });

  test("email already exists", async ({ page }) => {
    const modifiedUserData = { ...userData, email: "fulano@qa.com" };
    await createUser(page, modifiedUserData);
    await page.waitForSelector('text="Este email já está sendo usado"');
  });
});