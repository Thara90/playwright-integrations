import { test, expect } from '@playwright/test';
import { UserClient } from '../../resources/api/userClient';

//npx playwright test tests/api/userTests.spec.ts
test('Login with valid credenatials', async ({ request }) => {
  const userClient = new UserClient(request);

  const credenatials = {
    email: 'customer2@practicesoftwaretesting.com',
    password: 'welcome01'
  };

  const _response = await userClient.createLogin(credenatials);
  expect.soft(_response.status()).toBe(200);
  expect.soft(_response.ok()).toBeTruthy();

  const response = await _response.json();
  console.log(response);
});

test('Login with invalid username and valid password', async ({ request }) => {
  const userClient = new UserClient(request);

  const credenatials = {
    email: 'test@practicesoftwaretesting.com',
    password: 'welcome01'
  };

  const _response = await userClient.createLogin(credenatials);
  expect.soft(_response.status()).toBe(401);

  const response = await _response.json();
  expect(response.error).toBe("Unauthorized");
  console.log(response);
});

test('Login with valid username and invalid password', async ({ request }) => {
  const userClient = new UserClient(request);

  const credenatials = {
    email: 'test@practicesoftwaretesting.com',
    password: 'test123'
  };

  const _response = await userClient.createLogin(credenatials);
  expect.soft(_response.status()).toBe(401);

  const response = await _response.json();
  expect(response.error).toBe("Unauthorized");
  console.log(response);
});