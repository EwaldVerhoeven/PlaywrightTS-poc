import { Page, Locator, expect } from "@playwright/test";
import { woontype } from "../utils/types";
import { TIMEOUT } from "dns";

interface IAutoFields {
  straat: string;
  woonplaats: string;
  gemeente: string;
  land: string;
  woontype: woontype;
}

export class AdresToevoegenPage {
  readonly page: Page;
  readonly postcodeInput: Locator;
  readonly huisnummerInput: Locator;
  readonly straatnaamInput: Locator;
  readonly woonplaatsInput: Locator;
  readonly gemeenteInput: Locator;
  readonly landInput: Locator;
  readonly woontypeInput: Locator;
  readonly toelichtingWoonsituatieInput: Locator;
  readonly pageHeader: Locator;
  readonly opslaanButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.postcodeInput = this.page.locator("[id='form:zipCodeIt:zipCodeIt']");
    this.huisnummerInput = this.page.locator(
      "[id='form:homeNumberIt:homeNumberIt']",
    );
    this.straatnaamInput = this.page.locator("[id='form:streetIt:streetIt']");
    this.woonplaatsInput = this.page.locator("[id='form:cityIt:cityIt']");
    this.gemeenteInput = this.page.locator(
      "[id='form:municipalityIt:municipalityIt']",
    );
    this.landInput = this.page.locator(
      "[id='form:countrySom:countrySom_label']",
    );
    this.woontypeInput = this.page.locator(
      "[id='form:j_idt277:j_idt277_label']",
    );
    this.toelichtingWoonsituatieInput = this.page.locator(
      "[id='form:situationDescription:situationDescription']",
    );
    (this.pageHeader = this.page.locator(".page-title")),
      (this.opslaanButton = this.page.locator("button[id='form:saveBtn']"));
  }

  async enterNewClientAdress(postcode: string, huisnummer: string) {
    await expect(this.postcodeInput).toBeVisible({ timeout: 10000 });
    await expect(this.huisnummerInput).toBeVisible({ timeout: 10000 });

    await this.postcodeInput.fill(postcode, { timeout: 10000 });
    await this.huisnummerInput.fill(huisnummer, { timeout: 10000 });

    await expect(this.postcodeInput).toHaveValue(postcode, { timeout: 10000 });
    await expect(this.huisnummerInput).toHaveValue(huisnummer, { timeout: 10000 });

  }

  async expectAutoFilledField(adres: IAutoFields) {
    await expect(this.straatnaamInput).toHaveValue(adres.straat, { timeout: 10000 });
    await expect(this.woonplaatsInput).toHaveValue(adres.woonplaats, { timeout: 10000 });
    await expect(this.gemeenteInput).toHaveValue(adres.gemeente);
    await expect(this.landInput).toHaveValue(adres.land);
    await expect(this.woontypeInput).toHaveValue(adres.woontype);
  }

  async saveNewAdress() {
    await expect(this.opslaanButton).toBeVisible();
    await this.opslaanButton.click();
  }
}
