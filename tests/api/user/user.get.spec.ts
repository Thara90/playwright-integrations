import { expect, test } from '@fixtures/apiFixtures';

//npx playwright test tests/api/user/user.get.spec.ts

test.describe('/users - Get endpoint validation', () => {

    test('Retreive all users', async ({ adminToken , userClient }) => {
        const _response = await userClient.getUsers(adminToken );
        expect.soft(_response.status()).toBe(200);
        expect.soft(_response.ok()).toBeTruthy();

        const response = await _response.json();
        console.log(response);
    });

    test('Retreive all users without authorizing', async ({ userClient }) => {
        const _response = await userClient.getUsers('invalidToken');
        expect.soft(_response.status()).toBe(401);
        const response = await _response.json();
        expect.soft(response.message).toBe("Unauthorized");
        console.log(response);
    });
});

test.describe('/users/me - Get endpoint validation', () => {

    test('Retreive current user', async ({ adminToken , userClient }) => {
        const _response = await userClient.getCurrentUser(adminToken );
        expect.soft(_response.status()).toBe(200);
        expect.soft(_response.ok()).toBeTruthy();

        const response = await _response.json();
        console.log(response);
    });

    test('Retreive current user without authorizing', async ({ userClient }) => {
        const _response = await userClient.getCurrentUser('invalidToken');
        expect.soft(_response.status()).toBe(401);
        const response = await _response.json();
        expect.soft(response.message).toBe("Unauthorized");
        console.log(response);
    });
});