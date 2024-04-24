const { test, expect } = require("@playwright/test");

test("webapp online", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Front - ServeRest");
});
