import { expect, test } from '@fixtures/apiFixtures';
import { createUser } from '@utils/apiUtils';


//npx playwright test tests/api/user/user.delete.spec.ts
test.describe('/users/{userId} - DELETE endpoint validation', () => {

    test("Delete registered user successfully", async ({ adminToken, userClient }) => {
        let userId: string;

        await test.step('Register an user', async () => {
            const { createdUser } = await createUser(userClient);
            userId = createdUser.id;
            console.log(`Registered user Id: ${userId}`);
        });

        await test.step('Delete user', async () => {
            const _response = await userClient.deleteUser(adminToken, userId);
            expect(_response.status()).toBe(201);
            console.log(`Deleted user with ID: ${userId}`);
        });
    });

    test("Delete user that doesn't exist", async ({ adminToken, userClient }) => {
        const _response = await userClient.deleteUser(adminToken, 'nonExistentUserId');
        expect.soft(_response.status()).toBe(422);
        const response = await _response.json();
        expect.soft(response.id[0]).toBe("The selected id is invalid.");
    });

    test("Delete user without authorizing", async ({ userClient }) => {
        const _response = await userClient.deleteUser('invalidToken', 'nonExistentUserId');
        expect.soft(_response.status()).toBe(401);
        const response = await _response.json();
        expect.soft(response.message).toBe("Unauthorized");
    });
});