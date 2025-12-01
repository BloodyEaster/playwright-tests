import { Page } from '@playwright/test';

export class MainPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  getLinksByName(name: string) {
    return this.page.getByRole('link', { name: name });
  }
}

module.exports = { MainPage };
