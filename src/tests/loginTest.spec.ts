import { test } from '@playwright/test'
import LoginPage from '../pages/LoginPage'
import { encrypt, decrypt } from '../utils/CryptoJsUtil';
import { encryptEnvFile, decryptEnvFile } from '../utils/EncryptEnvFile'
import logger from '../utils/LoggerUtil'

test('Login test', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUserName(decrypt(process.env.userid!))
    await loginPage.fillPassword(decrypt(process.env.password!))

    const homePage = await loginPage.clickLoginButton();
    await homePage.clickAppLauncher()
    await homePage.clickServiceOption()
    await homePage.expectServiceTitleToBeVisible();
    logger.info(`Test for login is completed!`)
})

test.skip('Sample env test', async ({ page }) => {

    console.log(process.env.NODE_ENV);
    console.log(process.env.userid);
    console.log(process.env.password);

    logger.info(`Env variables setup is completed!`)
})

test.skip('Encryption and Decryption test', async ({ page }) => {

    const plainText = 'Hello, Earth!';
    const encryptedText = encrypt(plainText);

    console.log('SALT', process.env.SALT);
    console.log('Encrypted: ', encryptedText)

    const decryptedText = decrypt(encryptedText)

    console.log('Decrypted: ', decryptedText)

    logger.info(`Encryption and Decryption of text is completed!`)

})

test.skip('Encryption and Decryption of .env file', async ({ page }) => {

    encryptEnvFile();
    // decryptEnvFile();

    logger.info(`Encryption and Decryption of .env file is completed!`)

})