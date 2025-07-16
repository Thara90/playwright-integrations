import { expect, test } from '@fixtures/apiFixtures';
import registerUserTemplate from '@requestsTemplates/post-register-request.json';
import { fillRequestTemplate } from '@utils/apiUtils';
import { UserDataBuilder } from '@dataBuilders/userDataBuilder';

//npx playwright test tests/api/user/user.post.spec.ts
test.describe('/users/register - POST endpoint validation', () => {

    test('Register an user', async ({ userClient }) => {
        const userData = await UserDataBuilder.validRequestBody();
        const requestData = fillRequestTemplate(registerUserTemplate, userData);
        const _response = await userClient.postRegister(requestData);
        expect.soft(_response.status()).toBe(201);
        expect.soft(_response.ok()).toBeTruthy();

        const response = await _response.json();
        console.log(response);
    });

    test('Register an user without required fields', async ({ userClient }) => {
        const userData = await UserDataBuilder.missingRequiredFields();
        const requestData = fillRequestTemplate(registerUserTemplate, userData);
        const _response = await userClient.postRegister(requestData);
        expect.soft(_response.status()).toBe(422);

        const response = await _response.json();
        console.log(response);
    });

    test('Register an user with invalid password', async ({ userClient }) => {
        const userData = await UserDataBuilder.invalidPassword();
        const requestData = fillRequestTemplate(registerUserTemplate, userData);
        const _response = await userClient.postRegister(requestData);
        expect.soft(_response.status()).toBe(422);

        const response = await _response.json();
        console.log(response);
    });
});