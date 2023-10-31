import { Page, Locator, expect } from "@playwright/test";

export class ClientPage {
  readonly page: Page;
  readonly adresPlusIcon: Locator;
  readonly menuAlgemeen: Locator;
  readonly clientName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuAlgemeen = this.page.locator(
      "[href='/client/470/view?tabidx=1'] > .sidebar-item",
    );
    this.clientName = this.page.locator(".client-header-title > .ui-link");
    this.adresPlusIcon = this.page.locator(":nth-child(2) > h2 > .toolbar-right > .plus-link");
  }

  async navigateToAlgemeen() {
    await expect(this.menuAlgemeen).toBeVisible();
    await this.menuAlgemeen.click();

    await expect(this.page).toHaveTitle("Algemeen");
  }

  async openAdresToevoegenPage() {
    await expect(this.adresPlusIcon).toBeVisible();
    await this.adresPlusIcon.click();
    await expect(this.page).toHaveTitle("Adres toevoegen");
  }
}
