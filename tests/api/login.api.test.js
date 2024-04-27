const { test, expect } = require("@playwright/test");
const { userBody, postUser } = require("../../support/api/user");

test.describe("login route", () => {
  test("login with valid credentials", async ({ request }) => {
    await postUser(request, userBody);
    const response = await request.post("/login", {
      data: { email: userBody.email, password: userBody.password },
    });
    const responseJson = await response.json();

    expect(response.status()).toBe(200);
    expect(responseJson).toHaveProperty(
      "message",
      "Login realizado com sucesso"
    );
    expect(responseJson).toHaveProperty("authorization");
  });

  test("login with invalid email", async ({ request }) => {
    const response = await request.post("/login", {
      data: { email: "invalid-email@qa.com", password: "password" },
    });
    const responseJson = await response.json();

    expect(response.status()).toBe(401);
    expect(responseJson).toHaveProperty(
      "message",
      "Email e/ou senha inválidos"
    );
  });

  test("login with invalid password", async ({ request }) => {
    await postUser(request, userBody);
    const response = await request.post("/login", {
      data: { email: userBody.email, password: "password" },
    });
    const responseJson = await response.json();

    expect(response.status()).toBe(401);
    expect(responseJson).toHaveProperty(
      "message",
      "Email e/ou senha inválidos"
    );
  });
});