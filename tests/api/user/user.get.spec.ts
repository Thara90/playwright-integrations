import { test, expect } from '@playwright/test';
import { UserClient } from '../../../resources/api/clients/userClient';
import ApiTestInputData from '../../../test-data/apiTestInputData.json';

//npx playwright test tests/api/user/user.get.spec.ts

test.describe('/users - Get endpoint validation', () => {
    let token: string;

    test.beforeAll(async ({ request }) => {
        const userClient = new UserClient(request);
        const _response = await userClient.postLogin(ApiTestInputData.credentials.admin);
        expect(_response.status()).toBe(200);
        const response = await _response.json();
        token = response.access_token;
    });

    test('Retreive all users', async ({ request }) => {
        const userClient = new UserClient(request);

        const _response = await userClient.getUsers(token);
        expect.soft(_response.status()).toBe(200);
        expect.soft(_response.ok()).toBeTruthy();

        const response = await _response.json();
        console.log(response);
    });

    test('Retreive all users without authorizing', async ({ request }) => {
        const userClient = new UserClient(request);

        const _response = await userClient.getUsers('invalidToken');
        expect.soft(_response.status()).toBe(401);
        const response = await _response.json();
        expect.soft(response.message).toBe("Unauthorized");
        console.log(response);
    });
});

test.describe('/users/me - Get endpoint validation', () => {
    let token: string;

    test.beforeAll(async ({ request }) => {
        const userClient = new UserClient(request);
        const _response = await userClient.postLogin(ApiTestInputData.credentials.admin);
        expect(_response.status()).toBe(200);
        const response = await _response.json();
        token = response.access_token;
    });

    test('Retreive all users', async ({ request }) => {
        const userClient = new UserClient(request);

        const _response = await userClient.getCurrentUser(token);
        expect.soft(_response.status()).toBe(200);
        expect.soft(_response.ok()).toBeTruthy();

        const response = await _response.json();
        console.log(response);
    });

    test('Retreive all users without authorizing', async ({ request }) => {
        const userClient = new UserClient(request);

        const _response = await userClient.getCurrentUser('invalidToken');
        expect.soft(_response.status()).toBe(401);
        const response = await _response.json();
        expect.soft(response.message).toBe("Unauthorized");
        console.log(response);
    });
});