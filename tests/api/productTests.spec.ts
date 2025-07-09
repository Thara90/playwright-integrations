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

test('Create product with valid data', async ({ request }) => {
  const productClient = new ProductClient(request);

  const productData = {
    name: 'automation test product',
    description: 'This is a automation test product description',
    stock: '10',
    price: '100.00',
    brand_id: '01jzqwqhm0sjszdht2xaxkq7vd',
    category_id: '01JZQV774KBJNWW119PM3VD6GR',
    product_image_id: '01JZQV7761DBBHBJPXKHTW6ED9',
    is_location_offer: false,
    is_rental: false
  };

  const _response = await productClient.createProduct(productData);
  expect.soft(_response.status()).toBe(201);
  expect.soft(_response.ok()).toBeTruthy();

  const response = await _response.json();
  console.log(response);
  });

//   test('Get product list with valid product id', async ({ request }) => {
//   const productClient = new ProductClient(request);

//   const _response = await productClient.getProductById('01JZQQSCWD36K2VHMC87SH423Q');
//   expect.soft(_response.status()).toBe(200);
//   expect.soft(_response.ok()).toBeTruthy();

//   const response = await _response.json();
//   console.log(response);
// });