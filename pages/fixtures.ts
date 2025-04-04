import { test as base } from '@playwright/test';
import { LoginPage } from './loginPage';
import { RegisterPage } from './registerPage';
import { HomePage } from './homePage';
import { ProductDetailsPage } from './productDetailsPage';
import { UsersPage } from './usersPage';

type MyFixtures = {
    loginPage: LoginPage;
    registerPage: RegisterPage;
    homePage: HomePage;
    productDetailsPage: ProductDetailsPage;
    usersPage: UsersPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },
    usersPage: async ({ page }, use) => {
        await use(new UsersPage(page));
    }
});

export { expect } from '@playwright/test';