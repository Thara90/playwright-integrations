import { Page } from '@playwright/test';
import { faker } from '@faker-js/faker'

export class HelperBase {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitforNumberofSeconds(seconds: number) {
        await this.page.waitForTimeout(seconds * 1000);
    }   

    async generateRandomUserDetails() {
        const firstName = faker.person.firstName() + 'Automation';
        const lastName = faker.person.lastName() + 'Automation';
        const dateOfBirth = '1990-12-09';
        const street = faker.location.street();
        const postalCode = faker.number.int(10000);
        const city = faker.location.city();
        const state = faker.location.state();
        const country = faker.location.countryCode();
        const phoneNum = faker.phone.imei()
        const email = firstName + '@mailinator.com';
        const password = faker.internet.password();
        const userDetailsArray = [firstName, lastName, dateOfBirth, street, postalCode, city, state, country, phoneNum, email, password];
        return userDetailsArray;
    }

}