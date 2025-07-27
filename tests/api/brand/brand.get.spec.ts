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

test.describe('/brands/${brandId} - Get endpoint validation', () => {

    test('Retreive brand by id', async ({ brandClient }) => {
        const _response = await brandClient.getBrandById('01k15x3bvnncxhcy9ncpjsa3t4');
        expect.soft(_response.status()).toBe(200);
        expect.soft(_response.ok()).toBeTruthy();
        const response = await _response.json();
    });

    test("Retreive user that doesn't exist", async ({ brandClient }) => {
        const _response = await brandClient.getBrandById('nonExistentBrandId');
        expect.soft(_response.status()).toBe(404);
        const response = await _response.json();
        expect.soft(response.message).toBe("Requested item not found");
    });

});

test.describe('/brands/search - Get endpoint validation', () => {

    test('Retreive brand valid search query', async ({ brandClient }) => {
        const _response = await brandClient.getBrandBySearch('ForgeFlex');
        expect.soft(_response.status()).toBe(200);
        expect.soft(_response.ok()).toBeTruthy();
        const response = await _response.json();
    });

    test("Retreive brand invalid search query", async ({ brandClient }) => {
        const _response = await brandClient.getBrandBySearch('invalidSearchQuery');
        expect.soft(_response.status()).toBe(200);
        const response = await _response.json();
    });;
});