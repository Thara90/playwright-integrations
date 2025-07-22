import { expect, test } from '@fixtures/apiFixtures';
import registerUserTemplate from '@requestsTemplates/post-register-request.json';
import { fillRequestTemplate } from '@utils/apiUtils';
import { UserDataBuilder } from '@dataBuilders/userDataBuilder';

//npx playwright test tests/api/user/user.update.spec.ts
test.describe('/users/{userId} - PUT endpoint validation', () => {
    let userId: string;

    test.beforeAll("Register an user", async ({ userClient }) => {
        const userData = await UserDataBuilder.validRequestBody();
        const requestData = fillRequestTemplate(registerUserTemplate, userData);
        const _response = await userClient.postRegister(requestData);
        expect.soft(_response.status()).toBe(201);
        const response = await _response.json();
        userId = response.id;
        console.log(`[beforeAll] Registered user Id: ${userId}`);
        console.log(response);
    });

    test("Update registered user successfully", async ({ adminToken, userClient }) => {
        expect(userId).toBeTruthy();
        const updatedUserData = await UserDataBuilder.validRequestBody();
        const requestData = fillRequestTemplate(registerUserTemplate, updatedUserData);
        const _response = await userClient.putUser(adminToken, requestData, userId);
        expect.soft(_response.status()).toBe(200);
        const response = await _response.json();
        expect.soft(response.first_name).toBe(updatedUserData.first_name);
        expect.soft(response.last_name).toBe(updatedUserData.last_name);
        expect.soft(response.phone).toBe(updatedUserData.phone);
        expect.soft(response.dob).toBe(updatedUserData.dob);
        expect.soft(response.email).toBe(updatedUserData.email);
        expect.soft(response.address.street).toBe(updatedUserData.street);
        expect.soft(response.address.city).toBe(updatedUserData.city);
        expect.soft(response.address.state).toBe(updatedUserData.state);
        expect.soft(response.address.country).toBe(updatedUserData.country);
        expect.soft(response.address.postal_code).toBe(updatedUserData.postal_code);
        console.log(`Updated user with ID: ${userId}`);
        console.log(response);
    });
});