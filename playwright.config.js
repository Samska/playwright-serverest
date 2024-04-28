const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  webServer: {
    command: "npx serverest --nodoc",
    port: 3000,
    timeout: 60 * 1000,
    reuseExistingServer: !process.env.CI,
    cwd: ".",
  },

  reporter: [ ['allure-playwright'], ['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  projects: [
    {
      name: 'api',
      testMatch: '**/*.api.test.js',
      use: {
        baseURL: 'http://localhost:3000'
      }
    },
    {
      name: "e2e",
      outputDir: "test-results",
      testMatch: '**/*.e2e.test.js',
      use: {
        baseURL: "https://front.serverest.dev",
        browsers: ["chromium"],
        screenshot: "only-on-failure",
        trace: "retain-on-failure",
        headless: true
      },
    },
  ],
});
