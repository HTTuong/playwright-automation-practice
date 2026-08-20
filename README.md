# Playwright Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.62.1-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev)
[![Tests](https://img.shields.io/badge/tests-120%20passed-brightgreen)](#test-coverage)

An end-to-end test automation framework for [saucedemo.com](https://www.saucedemo.com), built with **Playwright** and **TypeScript**, following the **Page Object Model** pattern with custom fixtures for maintainable, scalable UI and API test coverage.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Architecture & Design Decisions](#architecture--design-decisions)
- [Author](#author)

---

## Overview

This project demonstrates a production-style automation framework rather than a loose collection of test scripts. It covers UI flows (login, cart, checkout, sorting) and API testing against a public REST endpoint, with an emphasis on maintainability: locators and page logic are isolated from test intent, test data is decoupled from test code, and environment configuration is externalized.

The goal was to build something close to what a real QA/SDET codebase looks like on day one of a job, not just "tests that pass," but a structure a second engineer could pick up and extend without guesswork.

## Tech Stack

| Category | Tool |
|---|---|
| Test runner | [Playwright](https://playwright.dev) |
| Language | TypeScript |
| Design pattern | Page Object Model (POM) |
| Test setup | Custom Playwright Fixtures |
| Test data | Static fixtures + [Faker.js](https://fakerjs.dev) for dynamic data |
| Config management | `dotenv` (environment-based config) |
| API testing | Playwright's built-in `request` context |

## Project Structure

```
.
├── fixtures/
│   └── pages.fixture.ts      # Custom fixtures — auto-login, page object injection
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── test-data/
│   ├── users.ts               # User credential sets
│   └── checkout-info.ts       # Checkout form data sets
├── tests/
│   ├── login-cart.spec.ts
│   ├── checkout.spec.ts
│   ├── sort.spec.ts
│   └── api.spec.ts
├── playwright.config.ts
├── .env.example
└── package.json
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) 18 or higher

### Installation

```bash
git clone https://github.com/<your-username>/playwright-automation.git
cd playwright-automation
npm install
npx playwright install
```

### Environment Configuration

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `BASE_URL` | Base URL of the application under test |
| `ENV_NAME` | Environment label (`dev`, `staging`, etc.) |

## Running Tests

```bash
npx playwright test                 # run the full suite (headless)
npx playwright test --ui            # interactive UI mode
npx playwright test --headed        # run with a visible browser
npx playwright test tests/api.spec.ts   # run a single spec file
```

### Viewing Reports

```bash
npx playwright show-report
```

On failure, the report includes a screenshot, video, and full execution trace for step-by-step debugging.

## Test Coverage

| Suite | Scenarios |
|---|---|
| **Login** | Valid login, invalid credentials, locked-out account, missing required fields |
| **Cart** | Add/remove items, cart badge count validation |
| **Checkout** | Happy path, form validation (data-driven across missing-field cases) |
| **Sorting** | Price low→high / high→low, name A→Z / Z→A (data-driven) |
| **API** | GET/POST/PUT/DELETE against a REST endpoint, response schema & status validation |

**Total: 120 test cases**

## Running with Docker

```
docker compose up --build
```

Reports will be available in \`playwright-report/\` and \`test-results/\` after the run completes.

## Architecture & Design Decisions

**Page Object Model.** Each page is encapsulated in its own class exposing locators and user-facing actions (`login()`, `addFirstItemToCart()`). Tests read as business scenarios, not DOM manipulation — and a UI change only requires updating one file.

**Custom fixtures over `beforeEach`.** Rather than repeating setup logic (navigate → log in → instantiate page objects) in every test file, fixtures inject ready-to-use page objects directly into the test signature. A `loggedInPage` fixture removes ~4 lines of boilerplate from every single test.

**Decoupled test data.** Credentials and form data live in `test-data/`, separate from test logic. Adding a new data-driven case means adding an object to an array — not touching test code.

**Environment-based configuration.** `baseURL` is read from `.env`, not hardcoded. Switching environments (dev/staging) requires no code changes.


#### Author: 
Tuong Hoang
