import {
  HomePage,
  SignUpPage,
  LoginPage,
  EditorPage,
  ArticlePage,
  ArticlesFeedPage,
} from './index';

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
