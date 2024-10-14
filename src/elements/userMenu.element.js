import { expect } from '@playwright/test';
import { test } from '@playwright/test';

export class UserMenu {
  constructor(page) {
    this.page = page;
    this.menuButton = this.page.locator('.dropdown-toggle');
    this.profileButton = this.page.getByRole('link', { name: 'Profile' });
    this.settingsButton = this.page.getByRole('link', { name: 'Settings' });
    this.logoutButton = this.page.getByRole('link', { name: 'Logout' });
  }

  async goToSettings() {
    await test.step('Перейти на /Settings', async () => {
      await this.menuButton.click();
      await this.settingsButton.click();
      await expect(this.page).toHaveURL(/\/settings/);
    });
  }

  async goToProfile() {
    await test.step('Перейти на /Profile', async () => {
      await this.menuButton.click();
      await this.profileButton.click();
    });
  }

  async logout() {
    await test.step('Выйти из аккаунта', async () => {
      await this.menuButton.click();
      await this.logoutButton.click();
    });
  }
}
