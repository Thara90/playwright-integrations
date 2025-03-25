import { Page, expect, Locator } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly linkRegister: any;
    readonly txtFirstName: any;
    readonly txtLasttName: any;
    readonly txtDOB: any;
    readonly txtStreet: any;
    readonly txtPostalCode: any;
    readonly txtState: any;
    readonly ddCountry: any;
    readonly txtPhoneNum: any;
    readonly txtEmail: any;
    readonly txtPassword: any;
    readonly btnRegister: any;

    constructor(page: Page) {
        this.page = page;
        this.linkRegister = page.locator('[data-test="register-link"]');
        this.txtFirstName = page.locator('[data-test="first-name"]');
        this.txtLasttName = page.locator('[data-test="last-name"]');
        this.txtDOB = page.locator('[data-test="dob"]');
        this.txtStreet = page.locator(`[data-test="street"]`);
        this.txtPostalCode = page.locator('[data-test="postal_code"]');
        this.txtState = page.locator(`[data-test="state"]`);
        this.ddCountry = page.locator(`[data-test="country"]`);
        this.txtPhoneNum = page.locator(`[data-test="phone"]`);
        this.txtEmail = page.locator(`[data-test="email"]`);
        this.txtPassword = page.locator(`[data-test="password"]`);
        this.btnRegister = page.locator(`[data-test="register-submit"]`);
    }

    async ClickRegisterLink() {
        await this.linkRegister.click();
        await this.page.waitForURL('auth/register');
    };

    // async SearchProduct(productName: string) {
    //     await this.txtSearch.fill(productName);
    //     await this.btnSearch.click();
    // }

    // async assertValidSearchResult(productName: string) {
    //     await expect.soft(this.locatorProductCard).toHaveCount(1);
    //     await expect.soft(this.lblProductName).toContainText(productName);
    // }

    // async assertInvalidSearchResult() {
    //     await expect.soft(this.locatorNoResults).toContainText("There are no products found.");
    // }

    // async selectProduct(){
    //     await this.locatorProductCard.locator('nth=0').click();
    //     await this.page.waitForURL(/\/product\/[A-Z0-9]+$/);
    // }
}



