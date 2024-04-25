const { test, expect } = require("@playwright/test");
const { userBody, createUser } = require("../support/helpers");

test.describe("login route", () => {

  test("login with valid credentials", async ({ request }) => {
    await createUser(request);

    const loginBody = {
      email: userBody.email,
      password: userBody.password
    }

    const response = await request.post("/login", { data: loginBody });
    const responseJson = await response.json();
    
    expect(response.status()).toBe(200);
    expect(responseJson).toHaveProperty("message", "Login realizado com sucesso");
    expect(responseJson).toHaveProperty("authorization");
  });

  test("login with invalid email", async ({ request }) => {
    const loginBody = {
      email: 'invalid@qa.com',
      password: userBody.password
    }

    const response = await request.post("/login", { data: loginBody });
    const responseJson = await response.json();
    
    expect(response.status()).toBe(401);
    expect(responseJson).toHaveProperty("message", "Email e/ou senha inválidos");
  });

  test("login with invalid password", async ({ request }) => {
    const loginBody = {
      email: userBody.email,
      password: 'invalidpassword'
    }

    const response = await request.post("/login", { data: loginBody });
    const responseJson = await response.json();
    
    expect(response.status()).toBe(401);
    expect(responseJson).toHaveProperty("message", "Email e/ou senha inválidos");
  });
});