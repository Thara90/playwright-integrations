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
        const email = firstName + '@mailinator.com';
        const dateOfBirth = '1990-12-09';
    }

}