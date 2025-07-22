import { expect, test } from '@fixtures/apiFixtures';
import registerUserTemplate from '@requestsTemplates/post-register-request.json';
import { fillRequestTemplate, createUser} from '@utils/apiUtils';
import { UserDataBuilder } from '@dataBuilders/userDataBuilder';

//npx playwright test tests/api/user/user.post.spec.ts
test.describe('/users/register - POST endpoint validation', () => {

    test('Register an user successfully', async ({ userClient, adminToken }) => {
        let userId: string;

        await test.step('Send POST request to register user', async () => {
            const { userData , createdUser } = await createUser(userClient);
            userId = createdUser.id;

            // Validate response
            expect.soft(createdUser.first_name).toBe(userData.first_name);
            expect.soft(createdUser.last_name).toBe(userData.last_name);
            expect.soft(createdUser.phone).toBe(userData.phone);
            expect.soft(createdUser.dob).toBe(userData.dob);
            expect.soft(createdUser.email).toBe(userData.email);
            expect.soft(createdUser.address.street).toBe(userData.street);
            expect.soft(createdUser.address.city).toBe(userData.city);
            expect.soft(createdUser.address.state).toBe(userData.state);
            expect.soft(createdUser.address.country).toBe(userData.country);
            expect.soft(createdUser.address.postal_code).toBe(userData.postal_code);
        });
        await test.step('Delete registered user to clean up', async () => {
            console.log('Deleting user with ID:', userId);
            const _response = await userClient.deleteUser(adminToken, userId);
            expect.soft(_response.status()).toBe(204);
            console.log(`Deleted user with ID: ${userId}`);
        });
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
    });

});