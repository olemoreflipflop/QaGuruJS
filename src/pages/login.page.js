import { BasePage } from './base.page';
import { test } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = this.page.getByPlaceholder('Password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.errorLoginMessage = this.page.locator('.error-messages');
  }

  async loginAs(userEmail = '', userPassword = '') {
    await test.step('Ввести email-a и пароля', async () => {
      await this.passwordField.fill(userPassword);
      await this.emailField.fill(userEmail);
    });
    await test.step('Подтвердить форму логина', async () => {
      await this.loginButton.click();
    });
  }
}
