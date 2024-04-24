const { test, expect } = require("@playwright/test");

test("get users", async ({ request }) => {
  const response = await request.get("/usuarios");
  expect(response.status()).toBe(200);
});
