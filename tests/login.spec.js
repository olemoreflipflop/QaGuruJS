import { test, expect } from '@playwright/test';
import { createUserData } from '../src/helpers/utils';
import { App } from '../src/pages/app.page';

test.describe('Логин/', async () => {
  let app, userData;

  test.beforeEach('Создать user-a', async ({ page }) => {
    app = new App(page);
    userData = createUserData().getData();

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
