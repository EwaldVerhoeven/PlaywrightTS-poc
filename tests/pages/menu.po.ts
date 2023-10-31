import { Page, Locator, expect } from "@playwright/test";

export class MainMenu {
  readonly page: Page;
  readonly clientButton: Locator;
  readonly adresPlusIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.clientButton = this.page.locator("#menu-icon-Cliënt");
    this.adresPlusIcon = this.page.locator(
      ":nth-child(2) > h2 > .toolbar-right > .plus-link",
    );
  }

  async navigateToClientPage() {
    await expect(this.clientButton).toBeVisible();
    await this.clientButton.click();
    await expect(this.page).toHaveTitle("Cliëntzoeken");
  }
}
