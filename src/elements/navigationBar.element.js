import { UserMenu } from './userMenu.element';
import { test } from '@playwright/test';

export class NavigationBar {
  constructor(page) {
    this.page = page;
    this.menuButton = this.page.locator('.dropdown-toggle');
    this.settingsButton = this.page.getByRole('link', { name: 'Settings' });
    this.signupButton = this.page.getByRole('link', { name: 'Sign up' });
    this.loginButton = this.page.getByRole('link', { name: 'Login' });
    this.homeButton = this.page.getByRole('link', { name: 'Home' });
    this.newArticleButton = this.page.getByRole('link', {
      name: 'New Article',
    });
    this.userMenu = new UserMenu(this.page);
  }

  async goToSignUp() {
    await test.step('Перейти на /Sign up', async () => {
      await this.signupButton.click();
      await this.page.waitFor;
      //await expect(this.page).toHaveURL(/\/register/);
    });
  }

  async goToLogin() {
    await test.step('Перейти на /Login', async () => {
      await this.loginButton.click();
      //await expect(this.page).toHaveURL(/\/login/);
    });
  }

  async goToHome() {
    await test.step('Перейти на /Home', async () => {
      await this.homeButton.click();
      //await expect(this.page).toHaveURL(/\/#\//);
    });
  }

  async goToNewArticle() {
    await test.step('Перейти на /New Article', async () => {
      await this.newArticleButton.click();
      //await expect(this.page).toHaveURL(/\/editor/);
    });
  }
}
