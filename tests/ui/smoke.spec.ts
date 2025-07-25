import { test } from '../../resources/ui/pages/uiFixtures';
import { runAccessibilityCheck } from '../../resources/utils/accessibilityChecker';
const ENABLE_ACCESSIBILITY_CHECKS = process.env.ENABLE_ACCESSIBILITY_CHECKS === 'true';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Smoke Test Suite', () => {

    test('Check out flow verification', async ({ page, loginPage, homePage, productDetailsPage }, testInfo) => {

        await loginPage.loadLoginPage();
        if (ENABLE_ACCESSIBILITY_CHECKS) {
            await runAccessibilityCheck(loginPage, testInfo, 'login-page');
        }

        await loginPage.login(process.env.CUSTOMER_01_USERNAME, process.env.CUSTOMER_01_PASSWORD);
        await homePage.clickHome();

        if (ENABLE_ACCESSIBILITY_CHECKS) {
            await runAccessibilityCheck(page, testInfo, 'home-page');
        }

        await homePage.selectProduct();

        if (ENABLE_ACCESSIBILITY_CHECKS) {
            await runAccessibilityCheck(page, testInfo, 'product-details-page');
        }

        await productDetailsPage.addItemToCart();

        // Smoke Test code to be enhanced here
    });
});