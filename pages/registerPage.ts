import { Page, expect, Locator } from '@playwright/test';
import { HelperBase } from './helperBase';

export class RegisterPage extends HelperBase {
    readonly linkRegister: any;
    readonly txtFirstName: any;
    readonly txtLasttName: any;
    readonly txtDOB: any;
    readonly txtStreet: any;
    readonly txtPostalCode: any;
    readonly txtState: any;
    readonly txtCity: any;
    readonly ddCountry: any;
    readonly txtPhoneNum: any;
    readonly txtEmail: any;
    readonly txtPassword: any;
    readonly btnRegister: any;

    constructor(page: Page) {
        super(page);
        this.linkRegister = page.locator('[data-test="register-link"]');
        this.txtFirstName = page.locator('[data-test="first-name"]');
        this.txtLasttName = page.locator('[data-test="last-name"]');
        this.txtDOB = page.locator('[data-test="dob"]');
        this.txtStreet = page.locator(`[data-test="street"]`);
        this.txtPostalCode = page.locator('[data-test="postal_code"]');
        this.txtState = page.locator(`[data-test="state"]`);
        this.txtCity = page.locator(`[data-test="city"]`);
        this.ddCountry = page.locator(`[data-test="country"]`);
        this.txtPhoneNum = page.locator(`[data-test="phone"]`);
        this.txtEmail = page.locator(`[data-test="email"]`);
        this.txtPassword = page.locator(`[data-test="password"]`);
        this.btnRegister = page.locator(`[data-test="register-submit"]`);
    }

    async clickRegisterLink() {
        await this.linkRegister.click();
        await this.page.waitForURL('auth/register');
    };

    async fillRegistrationForm() {

        const userDetails = await this.generateRandomUserDetails();

        await this.txtFirstName.fill(userDetails.firstName);
        await this.txtLasttName.fill(userDetails.lastName);
        await this.txtDOB.fill(userDetails.dateOfBirth);
        await this.txtStreet.fill(userDetails.street);
        await this.txtPostalCode.fill(userDetails.postalCode);
        await this.txtState.fill(userDetails.state);
        await this.txtCity.fill(userDetails.city);
        await this.ddCountry.selectOption(userDetails.countryCode);
        await this.txtPhoneNum.fill(userDetails.phoneNum);
        await this.txtEmail.fill(userDetails.email);
        await this.txtPassword.fill(userDetails.password);

        const responsePromise = this.page.waitForResponse('**/users/register');
        await this.btnRegister.click();
        const response = await responsePromise;
        const responseBody = await response.json();
        console.log(responseBody);
        expect.soft(response.status()).toBe(201);

        return userDetails;
    }

}



