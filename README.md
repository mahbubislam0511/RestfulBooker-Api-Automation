# Restful Booker API Automation

This repository is a starter project for automated testing with Playwright Test and TypeScript. Despite the project name, the current example tests visit and check the Playwright documentation website; they do not yet send requests to or test the Restful Booker API.

## Technologies and how they connect

- **Node.js and npm** provide the JavaScript runtime and install the project's development dependencies.
- **TypeScript** is used for the test and configuration files. The TypeScript configuration includes Node.js type definitions for APIs such as `process.env`.
- **Playwright Test** (`@playwright/test`) provides the test runner, browser automation, assertions, and HTML reporting.
- **Chromium** is the only browser project currently enabled in `playwright.config.ts`. Playwright launches it to run browser-based tests.
- **Node.js type definitions** (`@types/node`) provide TypeScript types for Node.js APIs.

The test runner reads `playwright.config.ts`, discovers tests in `tests/`, and runs them in the configured browser. Each test uses Playwright's `page` fixture to navigate or interact with a page, then uses `expect` assertions to check the result. The HTML reporter produces a report after the run.

## Project structure

```text
.
├── tests/
│   └── example.spec.ts       # Sample browser tests for playwright.dev
├── package.json              # Project metadata and development dependencies
├── package-lock.json         # Locked npm dependency versions
├── playwright.config.ts      # Test discovery, browser, retries, and reporter
└── tsconfig.json             # TypeScript compiler options
```

Playwright writes the HTML report to `playwright-report/` and test artifacts to `test-results/`. These generated folders are excluded from version control.

## Requirements

- Node.js (with npm)
- A terminal in the project directory

## Install

Install the npm dependencies and the Chromium browser used by this project:

```bash
npm install
npx playwright install chromium
```

## Run the tests

Run all configured tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/example.spec.ts
```

Open the most recent HTML report:

```bash
npx playwright show-report
```

There are currently no npm scripts defined in `package.json`, so the commands above invoke Playwright directly through `npx`.

## Current test behavior

`tests/example.spec.ts` includes two sample checks:

1. Opens `https://playwright.dev/` and checks that the page title contains “Playwright”.
2. Opens the site, follows the “Get started” link, and checks that the Installation heading is visible.

These tests require network access to the Playwright website. They are browser/UI tests, not API tests. To test the Restful Booker API, add API tests using Playwright's `request` fixture or `APIRequestContext`, configure the target API URL, and add checks for the relevant endpoints and responses.

## Configuration notes

- Tests are discovered from `./tests`.
- Tests run in parallel by default.
- Chromium is enabled; Firefox, WebKit, mobile devices, and branded browsers are currently commented out.
- The HTML reporter is enabled.
- On CI (`CI` environment variable set), tests retry twice, use one worker, and fail if a `test.only` is left in the source.
- Traces are collected on the first retry.
- A `baseURL` and local `webServer` are not configured.
