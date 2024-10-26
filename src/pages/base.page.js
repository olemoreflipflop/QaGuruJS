import { NavigationBar, UserMenu } from '../elements/index';

export class BasePage {
  constructor(page) {
    this.page = page;
    this.navigationBar = new NavigationBar(this.page);
    this.userMenu = new UserMenu(this.page);
  }

  async open(url) {
    await this.page.goto(url);
  }
}
