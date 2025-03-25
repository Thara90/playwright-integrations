import { test } from '../../pages/fixtures';


test.describe('User Registration', () => {

    test(`Verify user registration and login`, async ({ loginPage , registerPage}) => {
        await loginPage.loadLoginPage();
        await registerPage.ClickRegisterLink();
    });

});