import { test as setup, expect } from '@playwright/test';
import customer01 from '../.auth/customer01.json';
import admin from '../.auth/admin.json';
import fs from 'fs';

setup("Create customer 01 auth via API", async ({ request }) => {
  const customer01AuthFile = ".auth/customer01.json";

  const loginResponse = await request.post(`${process.env.API_URL}/users/login`,
    {
      data: {
        email: `${process.env.CUSTOMER_01_USERNAME}`,
        password: `${process.env.CUSTOMER_01_PASSWORD}`
      }
    }
  )
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  const token = loginResponseJson.access_token;
  customer01.origins[0].localStorage[0].value = token;
  fs.writeFileSync(customer01AuthFile, JSON.stringify(customer01));

  process.env['ACCESS_TOKEN'] = token;

});

setup("Create admin auth via API", async ({ request }) => {
  const customer01AuthFile = ".auth/admin.json";

  const loginResponse = await request.post(`${process.env.API_URL}/users/login`,
    {
      data: {
        email: `${process.env.ADMIN_USERNAME}`,
        password: `${process.env.ADMIN_PASSWORD}`
      }
    }
  )
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  const token = loginResponseJson.access_token;
  admin.origins[0].localStorage[0].value = token;
  fs.writeFileSync(customer01AuthFile, JSON.stringify(admin));

});