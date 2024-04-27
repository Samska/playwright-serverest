const { test, expect } = require("@playwright/test");
const { userBody, postUser } = require("../../support/api/user");
const { createProduct, productBody } = require("../../support/api/product");
const { performLogin } = require("../../support/api/helpers");
const { getCarts, createCart, getCartById, deleteCart, cartSchema } = require("../../support/api/cart");

test.describe("cart route", () => {
  let authToken;

  test.beforeAll(async ({ request }) => {
    await postUser(request, userBody);
    const { authorization } = await performLogin(
      request,
      userBody.email,
      userBody.password
    );
    authToken = authorization;
  });

  test("get created carts", async ({ request }) => {
    const { response, responseJson } = await getCarts(request);
    
    expect(response.status()).toBe(200);
    expect(responseJson).toHaveProperty("quantidade");
    expect(responseJson).toHaveProperty("carrinhos");
    expect(Array.isArray(responseJson.carrinhos)).toBe(true);
  });

  test("create a new cart", async ({ request }) => {
    const { productId } = await createProduct(request, productBody, authToken);
    const { response, responseJson } = await createCart(request, productId, productBody.quantidade, authToken);

    expect(response.status()).toBe(201);
    expect(responseJson).toHaveProperty(
      "message",
      "Cadastro realizado com sucesso"
    );
  });

  test("get cart by id and validate schema", async ({ request }) => {
    const { productId } = await createProduct(request, productBody, authToken);
    const { cartId } = await createCart(request, productId, productBody.quantidade, authToken);
    const { response, responseJson } = await getCartById(request, cartId, authToken);

    expect(response.status()).toBe(200);

    const { error } = cartSchema.validate(responseJson);
    expect(error).toBeUndefined();
  });

  test("delete a cart", async ({ request }) => {
    const { productId } = await createProduct(request, productBody, authToken);
    await createCart(request, productId, productBody.quantidade, authToken);
    const { response, responseJson } = await deleteCart(request, authToken);

    expect(response.status()).toBe(200);
    expect(responseJson).toHaveProperty(
      "message",
      "Registro excluído com sucesso"
    );
  });
}); 
