import { expect, test } from '@fixtures/apiFixtures';
import registerUserTemplate from '@requestsTemplates/post-register-request.json';
import { fillRequestTemplate, createUser } from '@utils/apiUtils';
import { UserDataBuilder } from '@dataBuilders/userDataBuilder';

//npx playwright test tests/api/user/user.update.spec.ts
test.describe('/users/{userId} - PUT endpoint validation', () => {

    test("Update registered user successfully", async ({ adminToken, userClient }) => {
        let userId: string;

        await test.step('Register an user', async () => {
            const { createdUser } = await createUser(userClient);
            userId = createdUser.id;
            console.log(`Registered user Id: ${userId}`);
        });

        await test.step('Update user', async () => {
            const updatedUserData = await UserDataBuilder.validRequestBody();
            const requestData = fillRequestTemplate(registerUserTemplate, updatedUserData);
            const _response = await userClient.putUser(adminToken, requestData, userId);
            expect.soft(_response.status()).toBe(200);
            const response = await _response.json();

            expect.soft(response.success).toBe(true);
        });
    });

    test("Update user that doesn't exist", async ({ adminToken, userClient }) => {
        const updatedUserData = await UserDataBuilder.validRequestBody();
        const requestData = fillRequestTemplate(registerUserTemplate, updatedUserData);
        const _response = await userClient.putUser(adminToken, requestData, 'nonExistentUserId');
        expect.soft(_response.status()).toBe(403);
        const response = await _response.json();
        expect.soft(response.error).toBe(`No query results for model [App\\Models\\User] nonExistentUserId`);
    });
});