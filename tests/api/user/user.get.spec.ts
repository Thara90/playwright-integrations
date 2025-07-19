import { expect, test } from '@fixtures/apiFixtures';
import registerUserTemplate from '@requestsTemplates/post-register-request.json';
import { fillRequestTemplate } from '@utils/apiUtils';
import { UserDataBuilder } from '@dataBuilders/userDataBuilder';

//npx playwright test tests/api/user/user.get.spec.ts

test.describe('/users - Get endpoint validation', () => {

    test('Retreive all users', async ({ adminToken, userClient }) => {
        const _response = await userClient.getUsers(adminToken);
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

test.describe('/users/${userId} - Get endpoint validation', () => {
    let userId: string;

    test.beforeAll("Register an user", async ({ userClient }) => {
        const userData = await UserDataBuilder.validRequestBody();
        const requestData = fillRequestTemplate(registerUserTemplate, userData);
        const _response = await userClient.postRegister(requestData);
        expect.soft(_response.status()).toBe(201);
        const response = await _response.json();
        userId = response.id;
        console.log(`[beforeAll] Registered user Id: ${userId}`);
    });

    test('Retreive registered user', async ({ adminToken, userClient }) => {
        const _response = await userClient.getUserById(adminToken, userId);
        expect.soft(_response.status()).toBe(200);
        expect.soft(_response.ok()).toBeTruthy();

        const response = await _response.json();
        console.log(response);
    });

    test("Retreive user that doesn't exist", async ({ adminToken, userClient }) => {
        const _response = await userClient.getUserById(adminToken, 'nonExistentUserId');
        expect.soft(_response.status()).toBe(404);

        const response = await _response.json();
        console.log(response);
    });

    test('Retreive user without authorizing', async ({ userClient }) => {
        const _response = await userClient.getUserById('invalidToken', '123');
        expect.soft(_response.status()).toBe(401);
        const response = await _response.json();
        expect.soft(response.message).toBe("Unauthorized");
        console.log(response);
    });
});

test.describe('/users/me - Get endpoint validation', () => {

    test('Retreive current user', async ({ adminToken, userClient }) => {
        const _response = await userClient.getCurrentUser(adminToken);
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