import { test, expect } from '@playwright/test';
import { UserBulder } from '../src/helpers/builders/user.builder';
import { App } from '../src/pages/index';

test.describe('Логин/', async () => {
  let app, userData;

  test.beforeEach('Создать user-a', async ({ page }) => {
    app = new App(page);
    userData = new UserBulder()
      .addUserName()
      .addEmail()
      .addPassword()
      .generate();

    await app.homePage.open('/');
    await app.homePage.navigationBar.goToSignUp();
    await app.signupPage.signUpAs(
      userData.email,
      userData.userName,
      userData.password,
    );
    await app.homePage.userMenu.logout();
  });

  test('Пользователь может: Войти с валидными логином и паролем', async () => {
    await app.homePage.navigationBar.goToLogin();
    await app.loginPage.loginAs(userData.email, userData.password);

    await test.step('User упешно залогинен', async () => {
      await expect(app.homePage.navigationBar.loginButton).toBeHidden();
    });
  });

  test('Пользователь не может: Войти с невалидным паролем', async () => {
    await app.homePage.navigationBar.goToLogin();
    await app.loginPage.loginAs(
      userData.email,
      userData.password.toUpperCase(),
    );

    await test.step('На форме отображен алерт с ошибкой', async () => {
      await expect(app.loginPage.errorLoginMessage).toHaveText(
        'Wrong email/password combination',
      );
    });
  });
});
