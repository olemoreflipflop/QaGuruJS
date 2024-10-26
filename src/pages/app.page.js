import { HomePage } from './home.page';
import { SignUpPage } from './signup.page';
import { LoginPage } from './login.page';
import { EditorPage } from './editor.page';
import { ArticlePage } from './article.page';
import { ArticlesFeedPage } from './articlesFeed.page';

export class App {
  constructor(page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.signupPage = new SignUpPage(page);
    this.loginPage = new LoginPage(page);
    this.editorPage = new EditorPage(page);
    this.articlePage = new ArticlePage(page);
    this.articlesFeedPage = new ArticlesFeedPage(page);
  }
}
