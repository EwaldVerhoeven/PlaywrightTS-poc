import { Page, Locator, expect } from "@playwright/test";
import environment from "../utils/Environment";

interface ICredentials {
  userName: string;
  password: string;
  twoFactorCode: string;
}

export class LoginPage {
  readonly page: Page;
  readonly inloggenMetGebruikersnaamButton: Locator;
  readonly gebruikersnaamInput: Locator;
  readonly wachtwoordInput: Locator;
  readonly aanmeldenButton: Locator;
  readonly vulCodeInInput: Locator;
  readonly validerenButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.gebruikersnaamInput = this.page.locator("#username");
    this.inloggenMetGebruikersnaamButton = this.page.getByText(
      "Inloggen met gebruikersnaam",
    );
    this.wachtwoordInput = this.page.locator(".password");
    this.aanmeldenButton = this.page.locator("form > .login-button");
    this.vulCodeInInput = this.page.locator(".token");
    this.validerenButton = this.page.locator(".verify-button");
  }

  private async navigateTo() {
    console.log(typeof this.page);
    await this.page.goto("/");
  }

  private async loginBase(credentials: ICredentials) {
    if (!environment.isLocalEnvironment()) {
      await this.inloggenMetGebruikersnaamButton.click();
      await expect(this.gebruikersnaamInput).toBeVisible();
      await expect(this.wachtwoordInput).toBeVisible();
      await expect(this.aanmeldenButton).toBeVisible();

      await this.gebruikersnaamInput.fill(credentials.userName);
      await this.wachtwoordInput.fill(credentials.password);
      await this.aanmeldenButton.click();

      // Two factor stuff
      await expect(this.vulCodeInInput).toBeVisible();
      await expect(this.validerenButton).toBeVisible();
      await this.vulCodeInInput.fill(credentials.twoFactorCode);
      await this.validerenButton.click();

      await expect(this.page).toHaveTitle("Dashboard");
    }
  }

  async login(credentials: ICredentials) {
    await this.navigateTo();
    await this.loginBase(credentials);
  }
}
