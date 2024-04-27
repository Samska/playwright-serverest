const { test, expect } = require("@playwright/test");
const { userBody, postUser } = require("../../support/api/user");
const { productBody, createProduct, getProductById, updateProduct, deleteProduct, productSchema } = require("../../support/api/product");
const { performLogin } = require("../../support/api/helpers");

test.describe("product route", () => {
  let authToken;

  test.beforeAll(async ({ request }) => {
    await postUser(request, userBody);
    const { authorization } = await performLogin(request, userBody.email, userBody.password);
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
    const { response, responseJson } = await createProduct(request, productBody, authToken);

    expect(response.status()).toBe(201);
    expect(responseJson).toHaveProperty(
      "message",
      "Cadastro realizado com sucesso"
    );
  });

  test("get a product by id and validate schema", async ({ request }) => {
    const { productId } = await createProduct(request, productBody, authToken);
    const { response, responseJson } = await getProductById(request, productId);

    expect(response.status()).toBe(200);

    const { error } = productSchema.validate(responseJson);
    expect(error).toBeUndefined();
  });

  test("update a product", async ({ request }) => {
    const { productId } = await createProduct(request, productBody, authToken);
    productBody.quantidade = 50;
    const { response, responseJson } = await updateProduct(request, productId, productBody, authToken);

    expect(response.status()).toBe(200);
    expect(responseJson).toHaveProperty("message", "Registro alterado com sucesso");
  });

  test("delete a product", async ({ request }) => {
    const { productId } = await createProduct(request, productBody, authToken);
    const { response, responseJson } = await deleteProduct(request, productId, authToken);
    
    expect(response.status()).toBe(200);
    expect(responseJson).toHaveProperty("message", "Registro excluído com sucesso");
  });
});
