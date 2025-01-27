import { expect, Page, test } from '@playwright/test'
import LoginPage from '../pages/LoginPage'
import { encrypt, decrypt } from '../utils/CryptoJsUtil';
import { encryptEnvFile, decryptEnvFile } from '../utils/EncryptEnvFile'
import logger from '../utils/LoggerUtil'
import ContactPage from '../pages/ContactPage';
import contactData from '../testData/contactCaseFlow.json'
import CasePage from '../pages/CasePage'


test.describe.configure({ mode: "serial"});

let page: Page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    const loginPage = new LoginPage(page);
    const homePage = await loginPage.quickLogin('pk@playwright.test','qwerqwer1')
    await homePage.expectServiceTitleToBeVisible()
    await homePage.clickAppLauncher()
    await homePage.clickServiceOption()
    await homePage.expectServiceTitleToBeVisible();
    logger.info(`Test for login is completed!`)
})

test("Create Contact and Open", async () => {
    const contactPage = new ContactPage(page)
    await contactPage.createNewContact(contactData.contactFirstName, contactData.contactLastName)
    await contactPage.expectConactLabelContainsFirstandLastName(contactData.contactFirstName, contactData.contactLastName)
    // await contactPage.findExistingContactByLastName(contactData.contactLastName)
})

test("Create Case Test", async () => {
    const casePage = new CasePage(page);
    await casePage.createNewCaseFromContactsPage(contactData.caseOrigin, contactData.caseType);
})

test.afterAll(async () => {
    await page.close();
})