import { expect, test } from '@fixtures/apiFixtures';
import { createUser, validateSchema } from '@utils/apiUtils';
import userResponseSchema from '@schemas/user-response-schema.json';

//npx playwright test tests/api/brand/brand.get.spec.ts

test.describe('/brands - Get endpoint validation', () => {

    test('Retreive all brands', async ({ brandClient }) => {
        const _response = await brandClient.getBrands();
        expect.soft(_response.status()).toBe(200);
        expect.soft(_response.ok()).toBeTruthy();
        const response = await _response.json();
    });
});

// test.describe('/users/${userId} - Get endpoint validation', () => {
//     let userId: string;

//     test('Retreive registered user', async ({ adminToken, userClient }) => {
//         let userId: string;

//         await test.step('Register an user', async () => {
//             const { createdUser } = await createUser(userClient);
//             userId = createdUser.id;
//             console.log(`Registered user Id: ${userId}`);
//         });
//         await test.step('Retreive user', async () => {
//             const _response = await userClient.getUserById(adminToken, userId);
//             expect.soft(_response.status()).toBe(200);
//             expect.soft(_response.ok()).toBeTruthy();
//             const response = await _response.json();
//             validateSchema(response, userResponseSchema);
//         });
//     });

//     test("Retreive user that doesn't exist", async ({ adminToken, userClient }) => {
//         const _response = await userClient.getUserById(adminToken, 'nonExistentUserId');
//         expect.soft(_response.status()).toBe(404);
//         const response = await _response.json();
//     });

//     test('Retreive user without authorizing', async ({ userClient }) => {
//         const _response = await userClient.getUserById('invalidToken', '123');
//         expect.soft(_response.status()).toBe(401);
//         const response = await _response.json();
//         expect.soft(response.message).toBe("Unauthorized");
//     });
// });

// test.describe('/users/me - Get endpoint validation', () => {

//     test('Retreive current user', async ({ adminToken, userClient }) => {
//         const _response = await userClient.getCurrentUser(adminToken);
//         expect.soft(_response.status()).toBe(200);
//         expect.soft(_response.ok()).toBeTruthy();
//         const response = await _response.json();
//         validateSchema(response, userResponseSchema);
//     });

//     test('Retreive current user without authorizing', async ({ userClient }) => {
//         const _response = await userClient.getCurrentUser('invalidToken');
//         expect.soft(_response.status()).toBe(401);
//         const response = await _response.json();
//         expect.soft(response.message).toBe("Unauthorized");
//     });
// });