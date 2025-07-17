

import { test, expect, request } from '@playwright/test';

test('Login with valid credentials', async ({request}) => {

    const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
        data: { email: 'customer2@practicesoftwaretesting.com', password: 'welcome01',},
        headers: {'Content-Type': 'application/json',},
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('access_token');
});




