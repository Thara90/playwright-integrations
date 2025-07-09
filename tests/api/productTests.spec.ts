import { test, expect } from '@playwright/test';
import { ProductClient } from '../../resources/api/productClient';

//npx playwright test tests/api/productTests.spec.ts
test('Get product list', async ({ request }) => {
  const productClient = new ProductClient(request);

  const _response = await productClient.getAllProducts();
  expect.soft(_response.status()).toBe(200);
  expect.soft(_response.ok()).toBeTruthy();

  const response = await _response.json();
  console.log(response);
});

test('Get product list with valid page id', async ({ request }) => {
  const productClient = new ProductClient(request);

  const _response = await productClient.getProductById('01JZQQSCWD36K2VHMC87SH423Q');
  expect.soft(_response.status()).toBe(200);
  expect.soft(_response.ok()).toBeTruthy();

  const response = await _response.json();
  console.log(response);
});