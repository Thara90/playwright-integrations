import { test, expect } from '@playwright/test';

//npx playwright test tests/api/e2e.spec.ts
test.describe('E2E booking flow from API', () => {

  test('Select a product', async ({ request }) => {
    const _response = await request.get(`${process.env.API_URL}/products?between=price,1,100&page=1`);
    expect.soft(_response.status()).toBe(200);
    expect.soft(_response.ok()).toBeTruthy();
    const response = await _response.json();
    console.log(response);
  });

});