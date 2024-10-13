import { BasePage } from './base.page';
import { test } from '@playwright/test';

export class SignUpPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailField = this.page.getByPlaceholder('Email');
    this.passwordField = this.page.getByPlaceholder('Password');
    this.usernameField = this.page.getByPlaceholder('Your Name');
    this.signupButton = this.page.getByRole('button', { name: 'Sign up' });
  }

  async signUpAs(userEmail = '', userName = '', userPassword = '') {
    await test.step('Ввести имя пользователя, email и пароль', async () => {
      await this.passwordField.fill(userPassword);
      await this.emailField.fill(userEmail);
      await this.usernameField.fill(userName);
      await this.signupButton.click();
    });
  }
}
