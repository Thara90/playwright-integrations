import { expect, test } from '@fixtures/apiFixtures';
import registerUserTemplate from '@requestsTemplates/post-register-request.json';
import { createBrand } from '@utils/apiUtils';

//npx playwright test tests/api/brand/brand.post.spec.ts
test.describe('/brands - POST endpoint validation', () => {

    test('Register a brand successfully', async ({ brandClient }) => {
        let userId: string;

        await test.step('Send POST request to register a brand', async () => {
            const brandData = await createBrand();
            const _response = await brandClient.postBrands(brandData);
            expect.soft(_response.status()).toBe(201);
            const response = await _response.json();

            // Validate response
            expect.soft(response.name).toBe(brandData.name);
            expect.soft(response.slug).toBe(brandData.slug);

        });
        // await test.step('Delete registered user to clean up', async () => {
        //     console.log('Deleting user with ID:', userId);
        //     const _response = await userClient.deleteUser(adminToken, userId);
        //     expect(_response.status()).toBe(204);
        //     console.log(`Deleted user with ID: ${userId}`);
        // });
    });

    // test('Register an user without required fields', async ({ userClient }) => {
    //     const userData = await UserDataBuilder.missingRequiredFields();
    //     const requestData = fillRequestTemplate(registerUserTemplate, userData);
    //     const _response = await userClient.postRegister(requestData);
    //     expect.soft(_response.status()).toBe(422);

    //     const response = await _response.json();
    //     expect.soft(response.first_name[0]).toBe("The first name field is required.");
    //     expect.soft(response.last_name[0]).toBe("The last name field is required.");
    //     expect.soft(response.email[0]).toBe("The email field is required.");
    //     expect.soft(response.password[0]).toBe("The password field is required.");
    // });

    // test('Register an user with invalid password', async ({ userClient }) => {
    //     const userData = await UserDataBuilder.invalidPassword();
    //     const requestData = fillRequestTemplate(registerUserTemplate, userData);
    //     const _response = await userClient.postRegister(requestData);
    //     expect.soft(_response.status()).toBe(422);

    //     const response = await _response.json();
    //     expect.soft(response.password).toEqual([
    //         'The password field must be at least 8 characters.',
    //         'The password field must contain at least one uppercase and one lowercase letter.',
    //         'The password field must contain at least one symbol.',
    //         'The password field must contain at least one number.'
    //     ]);
    // });

});