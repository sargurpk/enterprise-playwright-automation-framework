import { Page, expect } from '@playwright/test'
import logger from '../utils/LoggerUtil'
import ContactPage from './ContactPage';

export default class HomePage {

    private readonly serviceTitle = 'Service';
    private readonly appLauncher = 'App Launcher';
    private readonly serviceOption = '.al-menu-dropdown-list>one-app-launcher-menu-item:nth-child(1)'
    private readonly contactsLink = 'Contacts';

    constructor(private page: Page){

    }

    async clickAppLauncher() {
        await this.page.getByTitle(this.appLauncher).click();
        logger.info(`Clicked on App Launcher`);
    }

    async clickServiceOption() {
        await this.page.locator(this.serviceOption).click()
        logger.info(`Clicked on Service option in App Launcher`);
    }

    async expectServiceTitleToBeVisible() {
        await expect(this.page.getByTitle(this.serviceTitle)).toBeVisible({
            timeout: 20000
        }).catch((error) => {
            logger.error(`Error clicking on the login button: ${error}`);
            throw error;
        }).then(() => logger.info(`Service title is visible`));

    }

    async navigateToContactsTab() {

        await this.page.getByTitle(this.contactsLink).click();
        const contactPage = new ContactPage(this.page);
        return contactPage;

    }

}