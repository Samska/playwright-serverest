const { test, expect } = require("@playwright/test");
const { userData, createUser } = require("../../support/e2e/create-user");
const { login } = require("../../support/e2e/login");

test.describe("Login tests", () => {
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
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("check redirect button to create user url", async ({ page }) => {
    await page.click("[data-testid='cadastrar']");
    await expect(page).toHaveURL("/cadastrarusuarios");
  });

  test("check required fields", async ({ page }) => {
    await page.click("[data-testid='entrar']");
    await page.waitForSelector('text="Email é obrigatório"');
    await page.waitForSelector('text="Password é obrigatório"');
  });

  test("login with invalid password", async ({ page }) => {
    await login(page, { email, password: "123456" });
    await page.waitForSelector('text="Email e/ou senha inválidos"');
  });

  test("login with success", async ({ page }) => {
    await login(page, { email, password });
    await expect(page).toHaveURL("/admin/home");
  });
});