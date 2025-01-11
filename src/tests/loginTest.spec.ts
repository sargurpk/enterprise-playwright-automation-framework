import { test } from '@playwright/test'
import LoginPage from '../pages/LoginPage'

test('Login test', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUserName('pk@playwright.test')
    await loginPage.fillPassword('qwerqwer1')

    const homePage = await loginPage.clickLoginButton();
    await homePage.clickAppLauncher()
    await homePage.clickServiceOption()
    await homePage.expectServiceTitleToBeVisible();
})