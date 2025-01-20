import { test } from '@playwright/test'
import logger from '../utils/LoggerUtil'
import LoginPage from '../pages/LoginPage';
import { decrypt } from '../utils/CryptoJsUtil';
import contactData from '../testData/contacts.json'
import { converCsvFileToJsonFile } from '../utils/CsvToJsonUtil';
import { demoOutput, generateTestData, exportToCSV, exportToJson } from '../utils/FakerDataUtil'

for (const cData of contactData) {
    test.skip(`New Contacts creation test for ${cData.firstName} ${cData.lastName}`, async ({ page }) => {

        logger.info(`New Contact creation has started`)

        const firstName = 'Ajay';
        const lastName = 'Devgan';

        const loginPage = new LoginPage(page)
        await loginPage.navigateToLoginPage();
        await loginPage.fillUserName(decrypt(process.env.userid!))
        await loginPage.fillPassword(decrypt(process.env.password!))

        const homePage = await loginPage.clickLoginButton();
        await homePage.clickAppLauncher()
        await homePage.clickServiceOption()
        await homePage.expectServiceTitleToBeVisible();

        const contactPage = await homePage.navigateToContactsTab();
        await contactPage.createNewContact(cData.firstName, cData.lastName);
        await contactPage.expectConactLabelContainsFirstandLastName(cData.firstName, cData.lastName);

        logger.info(`Test for login is completed!`);
    })
}

test('Convert CSV to JSON', async () => {
    converCsvFileToJsonFile('data.csv', 'dataDemo.json');
});

test('Faker Data Demo 1', async () => {
    console.log(demoOutput);
});

test('Multiple Faker Data creation', async () => {
    const testData = generateTestData(15);
    exportToJson(testData, 'testData_en.json');
    exportToCSV(testData, 'testData_en.csv');
});