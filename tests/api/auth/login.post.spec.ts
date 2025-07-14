import { test, expect } from '@playwright/test';
import { UserClient } from '../../../resources/api/clients/userClient';
import ApiTestInputData from '../../../test-data/apiTestInputData.json';

//npx playwright test tests/api/login.post.spec.ts
test.describe('Authentication test suite', () => {
  test('Login with valid credenatials', async ({ request }) => {
    const userClient = new UserClient(request);
    const _response = await userClient.postLogin(ApiTestInputData.credentials.customer1);
    expect.soft(_response.status()).toBe(200);
    expect.soft(_response.ok()).toBeTruthy();

    const response = await _response.json();
    console.log(response);
  });

  test('Login with invalid username and valid password', async ({ request }) => {
    const userClient = new UserClient(request);
    const _response = await userClient.postLogin(ApiTestInputData.credentials.invalidUsername);
    expect.soft(_response.status()).toBe(401);

    const response = await _response.json();
    expect(response.error).toBe("Unauthorized");
    console.log(response);
  });

  test('Login with valid username and invalid password', async ({ request }) => {
    const userClient = new UserClient(request);
    const _response = await userClient.postLogin(ApiTestInputData.credentials.invalidPassword);
    expect.soft(_response.status()).toBe(401);

    const response = await _response.json();
    expect(response.error).toBe("Unauthorized");
    console.log(response);
  });
});
