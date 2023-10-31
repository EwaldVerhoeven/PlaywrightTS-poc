import { Page, Locator, expect } from "@playwright/test";
import { ClientPage } from "./client.po";

export class ClientZoekenPage {
  readonly page: Page;
  readonly zoekenInput: Locator;
  readonly zoekenIcon: Locator;
  readonly topRow: Locator;
  readonly client: ClientPage;

  constructor(page: Page) {
    this.page = page;
    this.zoekenInput = this.page.locator(
      "[id='form:client-search-tab:clientSearchInput']",
    );
    this.zoekenIcon = this.page.locator(
      "[id='form:client-search-tab:j_idt153']",
    );
    this.topRow = this.page.locator("tr[data-ri='0']");
    this.client = new ClientPage(page);
  }

  async searchClient(searchValue: string) {
    await expect(this.zoekenInput).toBeVisible();
    await expect(this.zoekenInput).toBeVisible();

    await this.zoekenInput.fill(searchValue);
    await this.zoekenIcon.click();
  }

  async selectTopClientInSearchResults(name: string) {
    await expect(this.topRow).toBeVisible();
    await this.topRow.click();

    await expect(this.page).toHaveTitle("Overzicht");
    await expect(this.client.clientName).toBeVisible();
    await expect(this.client.clientName).toContainText(name);
  }
}
