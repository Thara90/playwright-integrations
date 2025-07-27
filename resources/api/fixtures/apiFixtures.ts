import { test as baseTest, APIRequestContext } from '@playwright/test';
import { UserClient } from '../clients/userClient';
import { ProductClient } from '../clients/productClient';
import { BrandClient } from '../clients/brandClient';
import ApiTestInputData from '../../../test-data/apiTestInputData.json';

type ApiFixtures = {
  userClient: UserClient;
  productClient: ProductClient;
  brandClient: BrandClient;
  adminToken: string;
  customer1Token: string;
  customer2Token: string;
  createUser: string;
};

export const test = baseTest.extend<ApiFixtures>({
  userClient: async ({ request }, use) => {
    await use(new UserClient(request));
  },
  productClient: async ({ request }, use) => {
    await use(new ProductClient(request));
  },
  brandClient: async ({ request }, use) => {
    await use(new BrandClient(request));
  },

  /* ----------- TOKEN GENERATION ----------- */

  adminToken: async ({ request }, use) => {
    const userClient = new UserClient(request);
    const res = await userClient.postLogin(ApiTestInputData.credentials.admin);
    if (res.status() !== 200) throw new Error('Admin login failed');
    const body = await res.json();
    await use(body.access_token);
  },

  customer1Token: async ({ request }, use) => {
    const userClient = new UserClient(request);
    const res = await userClient.postLogin(ApiTestInputData.credentials.customer1);
    if (res.status() !== 200) throw new Error('Customer 01 login failed');
    const body = await res.json();
    await use(body.access_token);
  },

  customer2Token: async ({ request }, use) => {
    const userClient = new UserClient(request);
    const res = await userClient.postLogin(ApiTestInputData.credentials.customer2);
    if (res.status() !== 200) throw new Error('Customer 02 login failed');
    const body = await res.json();
    await use(body.access_token);
  }
});

export { expect } from '@playwright/test';