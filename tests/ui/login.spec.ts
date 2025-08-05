import { test } from '../../resources/ui/pages/uiFixtures';

test.describe('Login Test Suite', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test(`Login with valid credentials`, async ({ loginPage }) => {
        await loginPage.loadLoginPage();
        await loginPage.login(process.env.CUSTOMER_01_USERNAME, process.env.CUSTOMER_01_PASSWORD);
        await loginPage.assertLoginSuccess();
    });

    test(`Login with invalid credentials`, async ({ loginPage }) => {
        await loginPage.loadLoginPage();
        await loginPage.login('invalidUsername', 'invalidPassword');
        await loginPage.assertLoginFailure();
    });
});