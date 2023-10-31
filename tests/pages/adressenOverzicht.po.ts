import { Page, Locator, expect } from "@playwright/test";

export class AdressOverzichtPage {
  readonly page: Page;
  readonly selectAllItems: Locator;
  readonly verwijderenButton: Locator;
  readonly verwijderenConfirm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.selectAllItems = this.page.locator(
      "[id='form:addressTable:j_idt179']",
    );
    this.verwijderenButton = this.page.locator("[id='form:j_idt176']");
    this.verwijderenConfirm = this.page.locator(
      "[id='form:addressTable:0:j_idt208']",
    );
  }

  async removeAllAdresses() {
    await expect(this.selectAllItems).toBeVisible();
    await this.selectAllItems.click();

    await expect(this.selectAllItems).toBeVisible();
    await this.verwijderenButton.click();

    await expect(this.verwijderenConfirm).toBeVisible();
    await this.verwijderenConfirm.click();
  }
}
