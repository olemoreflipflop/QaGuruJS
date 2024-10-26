import { BasePage } from './base.page';

export class ArticlePage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.articleTitle = this.page.locator('h1');
    this.articleBody = this.page.locator('.article-content').locator('p');
    this.articleTag = this.page.locator('.tag-list');
    this.deleteButton = this.page.locator('.banner').getByRole('button', {
      name: /Delete Article/,
    });
    this.editButton = this.page.locator('.banner').getByRole('button', {
      name: /Edit Article/,
    });
  }

  async getArticleTitle() {
    const title = await this.articleTitle.innerText();
    return title;
  }

  async getArticleBody() {
    const body = await this.articleBody.innerText();
    return body;
  }

  async getArticleTag() {
    const tag = await this.articleTag.innerText();
    return tag;
  }

  async openEditArticleForm() {
    await this.editButton.click();
  }

  async deleteArticle() {
    this.page.on('dialog', (dialog) => dialog.accept());
    await this.deleteButton.click();
  }
}
