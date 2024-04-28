
[![Playwright Tests](https://github.com/Samska/playwright-serverest/actions/workflows/playwright.yml/badge.svg)](https://github.com/Samska/playwright-serverest/actions/workflows/playwright.yml)
[![Badge ServeRest](https://img.shields.io/badge/API-ServeRest-green)](https://github.com/ServeRest/ServeRest/)

# Playwright Serverest

This is a sample project using Playwright for E2E (In Progress) and API testing in the application https://serverest.dev and https://front.serverest.dev.

## Pre-requisites

* Git
* Node v18.17


## Install

Clone this repo

```bash
  git clone https://github.com/Samska/playwright-serverest
```

Install the dependencies

```bash
  npm install
```

## Running the tests/scripts

`npx playwright test` - Runs all project tests

`npm run test:api` - Run only the api tests

`npm run test:e2e` - Run only the e2e tests

`npm run allure:generate` - Generate allure report

`npm run show:report` - Show allure report
## Project structure

```
playwright-serverest/          
 ├── .github/                               
 │    ├── workflows/                        
 │        ├── playwright.yml                        # Configuration for the tests on CI           
 ├── support/                                       # Helper functions, fixtures and page objects                               
 │    ├── api/                                      # API Helpers
 │        ├── *.js                     
 │    ├── e2e/                                      # E2E Helpers (In Progress)
 │        ├── *.js
 ├── tests/                                         # Tests folder                               
 │    ├── api/                                      # API Tests
 │        ├── *.api.test.js                     
 │    ├── e2e/                                      # E2E Tests (In Progress)
 │        ├── *.e2e.test.js
 ├── .gitignore                                     # Untracked folder and files
 ├── playwright.config.js                           # The main configuration file for playwright, set behaviors, timeout and other props here
 ├── package-lock.json                              # File that is auto generated when a package is installed via npm      
 ├── package.json                                   # Core file in node.js projects, used for dependency management, scripts, project metadata and configs
 ├── README.md                                      # README with project overview and instructions
```
## Continuous integration

This project has continuous integration with GitHub Actions. The configuration file is located at the path .github/workflows/playwright.yml. Every time a push is made to the main branch, the pipeline is executed. With each execution, an artifact is generated with the test results and saved in that execution, as well as the results are published on the gh-pages and are available for consultation on this [page](https://samska.github.io/playwright-serverest/index.html).