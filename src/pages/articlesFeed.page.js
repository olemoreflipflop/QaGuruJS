import { BasePage } from './base.page';

export class ArticlesFeedPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.articlePreview = this.page.locator('.article-preview');
  }

  async getArticles() {
    const articles = await this.articlePreview;
    return articles;
  }

  async getArticle(uniqData) {
    const articles = await this.getArticles();
    const article = articles.filter({ hasText: uniqData });
    return article;
  }
}
