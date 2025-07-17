import { expect, test } from '@fixtures/apiFixtures';
import registerUserTemplate from '@requestsTemplates/post-register-request.json';
import { fillRequestTemplate } from '@utils/apiUtils';
import { UserDataBuilder } from '@dataBuilders/userDataBuilder';

//npx playwright test tests/api/user/user.delete.spec.ts
test.describe('/users/{userId} - DELETE endpoint validation', () => {
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

    test("Delete registered user successfully", async ({ adminToken, userClient }) => {
        expect(userId).toBeTruthy();
        const _response = await userClient.deleteUser(adminToken, userId);
        expect.soft(_response.status()).toBe(204);
        console.log(`Deleted user with ID: ${userId}`);
    });

    test("Delete user that doesn't exist", async ({ adminToken, userClient }) => {
        const _response = await userClient.deleteUser(adminToken, 'nonExistentUserId');
        expect.soft(_response.status()).toBe(422);
        const response = await _response.json();
        expect.soft(response.id[0]).toBe("The selected id is invalid.");
        console.log(response);
    });
});