const { test, expect } = require("@playwright/test");
const { userBody, postUser } = require("../../support/api/user");
const { performLogin } = require("../../support/api/helpers");

test.describe("login route", () => {
  test("login with valid credentials", async ({ request }) => {
    await postUser(request, userBody);
    const { response, responseJson } = await performLogin(request, userBody.email, userBody.password);

    expect(response.status()).toBe(200);
    expect(responseJson).toHaveProperty(
      "message",
      "Login realizado com sucesso"
    );
    expect(responseJson).toHaveProperty("authorization");
  });

  test("login with invalid email", async ({ request }) => {
    const { response, responseJson } = await performLogin(request, "invalid-email@qa.com", "password");

    expect(response.status()).toBe(401);
    expect(responseJson).toHaveProperty(
      "message",
      "Email e/ou senha inválidos"
    );
  });

  test("login with invalid password", async ({ request }) => {
    await postUser(request, userBody);
    const { response, responseJson } = await performLogin(request, userBody.email, "password");

    expect(response.status()).toBe(401);
    expect(responseJson).toHaveProperty(
      "message",
      "Email e/ou senha inválidos"
    );
  });
});