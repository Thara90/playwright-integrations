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
        return {
            firstName: faker.person.firstName() + 'Automation',
            lastName: faker.person.lastName() + 'Automation',
            dateOfBirth: '1990-12-09',
            street: faker.location.street(),
            postalCode: faker.number.int(10000).toString(),
            city: faker.location.city(),
            state: faker.location.state(),
            countryCode: faker.location.countryCode(),
            phoneNum: faker.number.int(1000000000).toString(),
            email: faker.person.firstName() + 'Automation@mailinator.com',
            password: 'Nexus@19901209'
        };
    }

}