# playwright-integrations

This repository provides a collection of integration tests and utilities built with [Playwright](https://playwright.dev/) in TypeScript. It includes both API and UI test examples, custom fixtures, data builders, and accessibility test helpers.

## Features

- **API Testing**: Includes clients, fixtures, and test data for automated API testing.
- **UI Testing**: Provides page object models and fixtures for frontend UI validation.
- **Accessibility Testing**: Uses Axe and Playwright to run accessibility checks and generate reports.
- **Client side performance Testing**: Reuse functional Playwright tests with Artillery.

## Getting Started

1. **Install dependencies**  
   ```bash
   npm install
   ```

2. **Set environment variables**  
   Configure your `.env` file with the required API and UI URLs and credentials.

3. **Run tests**  
   ```bash
   npx playwright test
   ```

## Project Structure

- `resources/api/clients/` – API request clients (e.g., UserClient, ProductClient)
- `resources/api/fixtures/` – Playwright fixtures for API tests
- `resources/api/dataBuilders/` – Helpers to build request data
- `resources/ui/pages/` – Page object models and UI fixtures
- `resources/utils/` – Utility modules (accessibility checker, etc.)
- `tests/` – API , UI and Performance test suites

## Notes

- Tests use Playwright's built-in test runner.
- Accessibility reports are generated for UI tests where applicable.
- Custom authentication setup scripts are provided in `tests/auth.setup.ts`.

---
Feel free to explore or adapt the code to your needs!