import { BasePage } from './base.page';
import { test } from '@playwright/test';

export class EditorPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.articleTitle = this.page.getByPlaceholder('Article Title');
    this.articleDescription = this.page.getByPlaceholder(
      "What's this article about?",
    );
    this.articleBody = this.page.getByPlaceholder(
      'Write your article (in markdown)',
    );
    this.articleTags = this.page.getByPlaceholder('Enter tags');
    this.publishButton = this.page.getByRole('button', {
      name: /Article/,
    });
  }
  async publishArticle(article) {
    await test.step('Ввести данные для статьи', async () => {
      await this.articleTitle.fill(article?.title ?? '');
      await this.articleDescription.fill(article?.description ?? '');
      await this.articleBody.fill(article?.body ?? '');
      await this.articleTags.fill(article?.tag ?? '');
    });
    await test.step('Подтвердить форму создания', async () => {
      await this.publishButton.click();
    });
  }
}
