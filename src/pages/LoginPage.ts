import { Page } from '@playwright/test'
import HomePage from './HomePage'
import logger from '../utils/LoggerUtil';

export default class LoginPage {

    private readonly usernameInput = '#username2';
    private readonly passwordInput = '#password';
    private readonly loginButton = '#Login';

    constructor(private page: Page) {
        
    }
    
    async navigateToLoginPage() {
        await this.page.goto("/");
        logger.info(`Navigated to the Login page`);
    }

    async fillUserName(username: string) {
        await this.page.locator(this.usernameInput).fill(username);
        logger.info(`Username is filled`);
    }

    async fillPassword(password: string) {
        await this.page.locator(this.passwordInput).fill(password);
        logger.info(`Password is entered`);
    }

    async clickLoginButton() {
        await this.page
            .locator(this.loginButton)
            .click()
            .catch((error) => {
                logger.error(`Error clicking login button, ${error}`)
                throw error;
            });

            logger.info(`Clicked on Login button`);
            const homePage = new HomePage(this.page)
            return homePage;

    }
}