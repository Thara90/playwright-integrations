import { expect, test } from '../../../resources/api/fixtures/apiFixtures';
import ApiTestInputData from '../../../test-data/apiTestInputData.json';

//npx playwright test tests/api/user/user.post.spec.ts
test.describe('/users/register - POST endpoint validation', () => {

    test('Retreive all users', async ({ userClient }) => {
        const _response = await userClient.postRegister();
        expect.soft(_response.status()).toBe(201);
        expect.soft(_response.ok()).toBeTruthy();

        const response = await _response.json();
        console.log(response);
    });
});