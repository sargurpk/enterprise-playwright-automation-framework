import { Page } from '@playwright/test'
import HomePage from './HomePage'

export default class LoginPage {

    private readonly usernameInput = '#username';
    private readonly passwordInput = '#password';
    private readonly loginButton = '#Login';

    constructor(private page: Page) {
        
    }
    
    async navigateToLoginPage() {
        await this.page.goto("/")
    }

    async fillUserName(username: string) {
        await this.page.locator(this.usernameInput).fill(username)
    }

    async fillPassword(password: string) {
        await this.page.locator(this.passwordInput).fill(password)
        
    }

    async clickLoginButton() {
        await this.page
            .locator(this.loginButton)
            .click()
            .catch((error) => {
                console.error(`Error clicking login button, ${error}`)
                throw error;
            });

            const homePage = new HomePage(this.page)
            return homePage;

    }
}