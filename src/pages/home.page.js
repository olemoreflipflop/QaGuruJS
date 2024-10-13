import { BasePage } from './base.page';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.globalFeed = this.page.getByRole('button', {
      name: 'Global Feed',
    });
    this.yourFeed = this.page.getByRole('button', {
      name: 'Your Feed',
    });
  }
}
