import { test } from '../../pages/fixtures';


test.describe('User Registration', () => {
    let userDetails;

    test(`Verify user registration and login`, async ({ loginPage , registerPage}) => {
        await loginPage.loadLoginPage();
        await registerPage.clickRegisterLink();
        userDetails = await registerPage.fillRegistrationForm();
        await loginPage.login(userDetails.email, userDetails.password);
        await loginPage.logout();
    });

    test.afterEach(async ({ loginPage }) => {
        await loginPage.loadLoginPage();
        await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);

    });

});