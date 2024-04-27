const { test, expect } = require("@playwright/test");
const { userBody, postUser } = require("../../support/api/user");
const { productBody } = require("../../support/api/product");
const { performLogin } = require("../../support/api/helpers");

test.describe("product route", () => {
  let authToken;

  test.beforeAll(async ({ request }) => {
    await postUser(request, userBody);
    const { response, responseJson, authorization } = await performLogin(request, userBody.email, userBody.password);
    authToken = authorization;
  });

  test("get all products", async ({ request }) => {
    const response = await request.get("/produtos");
    const responseJson = await response.json();
    expect(response.status()).toBe(200);
    expect(responseJson).toHaveProperty("quantidade");
    expect(responseJson).toHaveProperty("produtos");
    expect(Array.isArray(responseJson.produtos)).toBe(true);
  });

  test("create a new product", async ({ request }) => {
    const response = await request.post("/produtos", {
      data: productBody,
      headers: { Authorization: authToken },
    });
    const responseJson = await response.json();
    expect(response.status()).toBe(201);
    expect(responseJson).toHaveProperty(
      "message",
      "Cadastro realizado com sucesso"
    );
  });
});
