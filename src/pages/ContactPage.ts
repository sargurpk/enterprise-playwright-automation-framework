import { Page, expect } from '@playwright/test'
import logger from '../utils/LoggerUtil'

export default class ContactPage {

    private readonly contactsLink = 'Contacts';
    private readonly newButton = 'New';
    private readonly firstNameTextField = 'First Name';
    private readonly lastNameTextField = 'Last Name';
    private readonly saveButton = '[name="SaveEdit"]';
    private readonly contactName = '[name="primaryField"]'
    private readonly searchBox = 'Search...'

    constructor(private page: Page) {

    }

    async createNewContact(firstName: string, lastName: string) {
        await this.page.getByTitle(this.contactsLink).click();
        await this.page.getByRole('button', { name: this.newButton }).click();
        logger.info(`Clicked on New button in Contacts page`);

        await this.page.getByPlaceholder(this.firstNameTextField).fill(firstName);
        logger.info(`First name is filled as ${firstName}`);

        await this.page.getByPlaceholder(this.lastNameTextField).fill(lastName);
        logger.info(`First name is filled as ${lastName}`);

        await this.page.locator(this.saveButton)
            .click()
            .catch((error) => {
                logger.error(`Error clicking Save button: ${error}`);
                throw error
            }).then(() => logger.info('Save button is clicked'));
    }

    async expectConactLabelContainsFirstandLastName(firstName: string, lastName: string) {
        await expect(this.page.locator(this.contactName)).toContainText(`${firstName} ${lastName}`);
        logger.info(`New contact has been created and ${firstName} ${lastName} is visible`);
        // await this.page.getByRole('link', { name: this.contactsLink }).click();
    }

    async findExistingContactByLastName(lastName: string) {
        await this.page.getByTitle(this.contactsLink).first().click();
        await this.page.getByRole("button", { name: this.searchBox }).click()
        await this.page.getByRole("button", { name: this.searchBox }).fill(lastName)
        await this.page.getByRole("button", { name: this.searchBox }).press("Enter")
        await this.page.getByRole("link", { name: lastName })
    }
}