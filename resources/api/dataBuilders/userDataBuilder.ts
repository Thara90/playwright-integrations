import { Page } from '@playwright/test';
import { faker } from '@faker-js/faker'

export class UserDataBuilder {

    static validRequestBody() {
        return {
            first_name: faker.person.firstName().slice(0, 10) + 'Automation',
            last_name: faker.person.lastName().slice(0, 10) + 'Automation',
            street: faker.location.street(),
            city: faker.location.city(),
            state: faker.location.state(),
            country: faker.location.countryCode(),
            postal_code: faker.number.int({ min: 100000, max: 999999 }).toString(),
            phone: faker.number.int({ min: 9000000000, max: 9999999999 }).toString(),
            dob: '1990-12-09',
            password: 'Nexus@19901209',
            email: `automation+${Date.now()}@example.com`
        };
    }

    static missingRequiredFields() {
        const userRequestbody = this.validRequestBody();

        userRequestbody.first_name = '';
        userRequestbody.last_name = '';
        userRequestbody.password = '';
        userRequestbody.email = '';

        return userRequestbody;
    }

        static invalidPassword() {
        const userRequestbody = this.validRequestBody();

        userRequestbody.password = 'invalid';

        return userRequestbody;
    }
}