import { expect, test } from '@fixtures/apiFixtures';
import registerUserTemplate from '@requestsTemplates/post-register-request.json';
import { fillRequestTemplate } from '@utils/apiUtils';
import { UserDataBuilder } from '@dataBuilders/userDataBuilder';

//npx playwright test tests/api/user/user.post.spec.ts
test.describe('/users/register - POST endpoint validation', () => {
    let userId: string;

    test('Register an user successfully', async ({ userClient }) => {
        const userData = await UserDataBuilder.validRequestBody();
        const requestData = fillRequestTemplate(registerUserTemplate, userData);
        const _response = await userClient.postRegister(requestData);

        expect.soft(_response.status()).toBe(201);

        const response = await _response.json();
        expect.soft(response.first_name).toBe(userData.first_name);
        expect.soft(response.last_name).toBe(userData.last_name);
        expect.soft(response.phone).toBe(userData.phone);
        expect.soft(response.dob).toBe(userData.dob);
        expect.soft(response.email).toBe(userData.email);
        expect.soft(response.address.street).toBe(userData.street);
        expect.soft(response.address.city).toBe(userData.city);
        expect.soft(response.address.state).toBe(userData.state);
        expect.soft(response.address.country).toBe(userData.country);
        expect.soft(response.address.postal_code).toBe(userData.postal_code);
        userId = response.id;
        console.log(response);
    });

    test('Register an user without required fields', async ({ userClient }) => {
        const userData = await UserDataBuilder.missingRequiredFields();
        const requestData = fillRequestTemplate(registerUserTemplate, userData);
        const _response = await userClient.postRegister(requestData);
        expect.soft(_response.status()).toBe(422);

        const response = await _response.json();
        expect.soft(response.first_name[0]).toBe("The first name field is required.");
        expect.soft(response.last_name[0]).toBe("The last name field is required.");
        expect.soft(response.email[0]).toBe("The email field is required.");
        expect.soft(response.password[0]).toBe("The password field is required.");
        console.log(response);
    });

    test('Register an user with invalid password', async ({ userClient }) => {
        const userData = await UserDataBuilder.invalidPassword();
        const requestData = fillRequestTemplate(registerUserTemplate, userData);
        const _response = await userClient.postRegister(requestData);
        expect.soft(_response.status()).toBe(422);

        const response = await _response.json();
        expect.soft(response.password).toEqual([
            'The password field must be at least 8 characters.',
            'The password field must contain at least one uppercase and one lowercase letter.',
            'The password field must contain at least one symbol.',
            'The password field must contain at least one number.'
        ]);
        console.log(response);
    });

    test.afterAll(async ({ adminToken, userClient }) => {
        if (userId) {
            const _response = await userClient.deleteUser(adminToken, userId);
            expect.soft(_response.status()).toBe(200);
            console.log(`Deleted user with ID: ${userId}`);
        } else {
            console.warn('No user was created. Skipping deletion of user.');
        }
    });
});