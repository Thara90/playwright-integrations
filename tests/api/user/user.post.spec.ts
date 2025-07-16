import { expect, test } from '../../../resources/api/fixtures/apiFixtures';
import registerUserTemplate from '../../../resources/api/req-jsons/post-register-request.json';
import { fillRequestTemplate } from '../../../resources/utils/apiUtils';

//npx playwright test tests/api/user/user.post.spec.ts
test.describe('/users/register - POST endpoint validation', () => {

    test('Register an user', async ({ userClient }) => {
        const userData = {
            first_name: 'Automation',
            last_name: 'Tester',
            street: '123 Test St',
            city: 'Testville',
            state: 'TS',
            country: 'QA',
            postal_code: '1234AA',
            phone: '9876543210',
            dob: '1970-01-01',
            password: 'SuperSecure@123',
            email: `automation+${Date.now()}@example.com`
        };
        const requestData = fillRequestTemplate(registerUserTemplate, userData);
        const _response = await userClient.postRegister(requestData);
        expect.soft(_response.status()).toBe(201);
        expect.soft(_response.ok()).toBeTruthy();

        const response = await _response.json();
        console.log(response);
    });

    test('Register an user without required fields', async ({ userClient }) => {
        const userData = {
            first_name: '',
            last_name: '',
            street: '123 Test St',
            city: 'Testville',
            state: 'TS',
            country: 'QA',
            postal_code: '1234AA',
            phone: '9876543210',
            dob: '1970-01-01',
            password: '',
            email: ``
        };
        const requestData = fillRequestTemplate(registerUserTemplate, userData);
        const _response = await userClient.postRegister(requestData);
        expect.soft(_response.status()).toBe(422);

        const response = await _response.json();
        console.log(response);
    });

    test('Register an user with invalid password', async ({ userClient }) => {
        const userData = {
            first_name: 'Automation',
            last_name: 'Tester',
            street: '123 Test St',
            city: 'Testville',
            state: 'TS',
            country: 'QA',
            postal_code: '1234AA',
            phone: '9876543210',
            dob: '1970-01-01',
            password: 'invalid',
            email: `automation+${Date.now()}@example.com`
        };
        const requestData = fillRequestTemplate(registerUserTemplate, userData);
        const _response = await userClient.postRegister(requestData);
        expect.soft(_response.status()).toBe(422);

        const response = await _response.json();
        console.log(response);
    });
});