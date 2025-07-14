import { test as baseTest, APIRequestContext } from '@playwright/test';
import { UserClient } from '../clients/userClient';
import { ProductClient } from '../clients/productClient';

type ApiFixtures = {
  userClient: UserClient;
  productClient: ProductClient;
};

export const test = baseTest.extend<ApiFixtures>({
  userClient: async ({ request }, use) => {
    await use(new UserClient(request));
  },
  productClient: async ({ request }, use) => {
    await use(new ProductClient(request));
  }
});

export { expect } from '@playwright/test';