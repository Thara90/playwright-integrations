import { expect, test } from '@fixtures/apiFixtures';
import registerUserTemplate from '@requestsTemplates/post-register-request.json';
import { createBrand } from '@utils/apiUtils';

//npx playwright test tests/api/brand/brand.post.spec.ts
test.describe('/brands - POST endpoint validation', () => {

    test('Register a brand successfully', async ({ adminToken, brandClient }) => {
        let brandId: string;

        await test.step('Send POST request to register a brand', async () => {
            const brandData = await createBrand();
            const _response = await brandClient.postBrands(brandData);
            expect.soft(_response.status()).toBe(201);
            const response = await _response.json();
            brandId = response.id;

            // Validate response
            expect.soft(response.name).toBe(brandData.name);
            expect.soft(response.slug).toBe(brandData.slug);

        });
        await test.step('Delete registered brand to clean up', async () => {
            console.log('Deleting brand with ID:', brandId);
            const _response = await brandClient.deleteBrand(adminToken, brandId);
            expect(_response.status()).toBe(204);
            console.log(`Deleted brand with ID: ${brandId}`);
        });
    });

    test('Register a brand without required fields', async ({ brandClient }) => {
        const brandData = { name: '', slug: '' };
        const _response = await brandClient.postBrands(brandData);
        expect.soft(_response.status()).toBe(422);
        const response = await _response.json();

        expect.soft(response.name[0]).toBe("The name field is required.");
        expect.soft(response.slug[0]).toBe("The slug field is required.");
    });

});