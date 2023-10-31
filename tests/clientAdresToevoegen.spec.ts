import { test } from "@playwright/test";
import * as dotenv from "dotenv";
import { LoginPage } from "./pages/login.po";
import { MainMenu } from "./pages/menu.po";
import { ClientZoekenPage } from "./pages/clientZoeken.po";
import { ClientPage } from "./pages/client.po";
import { AdresToevoegenPage } from "./pages/adresToevoegen.po";
import { woontype } from "./utils/types";
import { AdressOverzichtPage } from "./pages/adressenOverzicht.po";

test.beforeEach(async ({ page }) => {
  dotenv.config({
    path: "../.env",
  });

  const auth = new LoginPage(page);
  await auth.login({
    userName: process.env.QAUSERNAME as string,
    password: process.env.QAUSERPASSWORD as string,
    twoFactorCode: process.env.TWOFACTORCODE as string,
  });
});

const testData = {
  client: {
    nummer: "470",
    achternaam: "Timmermans",
    nieuwAdres: {
      postcode: "7141DC",
      huisnummer: "2",
      straat: "Parallelweg",
      woonplaats: "Groenlo",
      gemeente: "Oost Gelre",
      land: "Nederland",
      woontype: "Onbekend",
    },
  },
};

test.afterAll(async ({ page }) => {
  const adressenOverzicht = new AdressOverzichtPage(page);
  await adressenOverzicht.removeAllAdresses();
});

test.describe("Clients have data", () => {
  test("I lookup a client to add a new adress", async ({ page }) => {
    // instantiating POM's
    const menu = new MainMenu(page);
    const clientZoeken = new ClientZoekenPage(page);
    const client = new ClientPage(page);
    const adresToevoegen = new AdresToevoegenPage(page);

    // searching and selecting a client
    await menu.navigateToClientPage();
    await clientZoeken.searchClient(testData.client.nummer);
    await clientZoeken.selectTopClientInSearchResults(
      testData.client.achternaam,
    );

    // adding an adress
    await client.navigateToAlgemeen();
    await client.openAdresToevoegenPage();
    await adresToevoegen.enterNewClientAdress(
      testData.client.nieuwAdres.postcode,
      testData.client.nieuwAdres.huisnummer,
    );

    await adresToevoegen.expectAutoFilledField({
      straat: testData.client.nieuwAdres.straat,
      woonplaats: testData.client.nieuwAdres.woonplaats,
      gemeente: testData.client.nieuwAdres.gemeente,
      land: testData.client.nieuwAdres.land,
      woontype: testData.client.nieuwAdres.woontype as woontype,
    });
  });
});
