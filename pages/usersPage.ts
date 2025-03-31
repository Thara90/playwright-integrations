import { Page, expect, Locator } from '@playwright/test';

export class UsersPage {
    readonly page: Page;
    readonly ddNavigationMenu: any;
    readonly usersLink: any;
    readonly deleteBtn: any;

    constructor(page: Page) {
        this.page = page;
        this.ddNavigationMenu = page.locator('[data-test="nav-menu"]');
        this.usersLink = page.locator('[data-test="nav-admin-users"]');
    }

    async loadUsers() {
        await this.ddNavigationMenu.click();
        await this.usersLink.click();
        await this.page.waitForURL('/admin/users');
    }

    async deleteUser(email: string) {
        await this.page.locator(`//td[normalize-space(text())=${email}]//following-sibling::td/button`).click();
        await expect.soft(this.page.locator(`//td[normalize-space(text())=${email}]//following-sibling::td/button`)).not.toBeVisible();
    }
}