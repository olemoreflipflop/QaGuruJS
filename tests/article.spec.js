import { test, expect } from '@playwright/test';
import { createUserData, createArticleData } from '../src/helpers/utils';
import { App } from '../src/pages/app.page';

test.describe('Создание статьи/', async () => {
  let app;

  test.beforeEach('Создать user-a и залогиниться', async ({ page }) => {
    app = new App(page);
    const userData = createUserData().getData();

    await app.homePage.open('/');
    await app.homePage.navigationBar.goToSignUp();
    await app.signupPage.signUpAs(
      userData.email,
      userData.userName,
      userData.password,
    );
  });

  test('Пользователь может: Создать статью со всеми заполненными полями', async () => {
    const article = createArticleData().getData();

    await app.homePage.navigationBar.goToNewArticle();
    await app.editorPage.publishArticle(article);
    await app.articlePage.deleteButton.waitFor();

    await test.step('Статья успешно создана', async () => {
      const title = await app.articlePage.getArticleTitle();
      const body = await app.articlePage.getArticleBody();
      const tag = await app.articlePage.getArticleTag();

      expect(title).toEqual(article.title);
      expect(body).toEqual(article.body);
      expect(tag).toEqual(article.tag);
    });
  });

  test('Пользователь может: Создать статью только с обязательными полями', async () => {
    const article = createArticleData().getData();
    article.tag = '';

    await app.homePage.navigationBar.goToNewArticle();
    await app.editorPage.publishArticle(article);
    await app.articlePage.deleteButton.waitFor();

    await test.step('Статья успешно создана', async () => {
      const title = await app.articlePage.getArticleTitle();
      const body = await app.articlePage.getArticleBody();

      expect(title).toEqual(article.title);
      expect(body).toEqual(article.body);
      await expect(app.articlePage.articleTag).toBeHidden();
    });
  });

  test('Пользователь не может: Создать статью с пустыми обязательными полями', async () => {
    await app.homePage.navigationBar.goToNewArticle();
    await app.editorPage.publishArticle();

    await test.step('Форма создания осталось открытой', async () => {
      await expect(app.page).toHaveURL(/editor/);
      await expect(app.editorPage.articleTitle).toBeFocused();
    });
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});

test.describe('Редактирование статьи/', async () => {
  let app;

  test.beforeEach('Создать user-a и залогиниться', async ({ page }) => {
    app = new App(page);
    const userData = createUserData().getData();
    const article = createArticleData().getData();

    await app.homePage.open('/');
    await app.homePage.navigationBar.goToSignUp();
    await app.signupPage.signUpAs(
      userData.email,
      userData.userName,
      userData.password,
    );
    await app.homePage.navigationBar.goToNewArticle();
    await app.editorPage.publishArticle(article);
    await app.articlePage.deleteButton.waitFor();
  });

  //bug
  test.fail('Пользователь может: отредактировать статью', async () => {
    const updatedArticle = createArticleData().getData();
    await app.articlePage.openEditArticleForm();
    await app.editorPage.publishArticle(updatedArticle);
    await app.articlePage.editButton.waitFor();

    await test.step('Статья user-а отредактирована', async () => {
      const title = await app.articlePage.getArticleTitle();
      const body = await app.articlePage.getArticleBody();
      const tag = await app.articlePage.getArticleTag();

      expect(title).toEqual(updatedArticle.title);
      expect(body).toEqual(updatedArticle.body);
      expect(tag).toEqual(updatedArticle.tag);
    });
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});

test.describe('Удаление статьи/', async () => {
  let app;
  test.beforeEach('Создать user-a и залогиниться', async ({ page }) => {
    app = new App(page);
    const userData = createUserData().getData();
    const article = createArticleData().getData();

    await app.homePage.open('/');
    await app.homePage.navigationBar.goToSignUp();
    await app.signupPage.signUpAs(
      userData.email,
      userData.userName,
      userData.password,
    );
    await app.homePage.navigationBar.goToNewArticle();
    await app.editorPage.publishArticle(article);
    await app.articlePage.deleteButton.waitFor();
  });

  test('Пользователь может: удалить статью', async () => {
    await app.articlePage.deleteArticle();
    await app.homePage.yourFeed.waitFor();

    await test.step('Статья user-а удалена', async () => {
      await app.homePage.userMenu.goToProfile();
      const article = await app.articlesFeedPage.getArticles();
      await expect(article).toContainText(`doesn't have articles.`);
    });
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
