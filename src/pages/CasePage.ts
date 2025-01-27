import { Page, expect } from "@playwright/test"
import logger from '../utils/LoggerUtil'

export default class CasePage {

    constructor(private page: Page){

    }

    async createNewCaseFromContactsPage(caseOrigin: string, caseType: string) {
        await this.page.getByLabel('Cases').getByRole('button', { name: 'New' }).click();
        await this.page.getByRole('combobox', { name: 'Case Origin' }).click();
        await this.page.getByLabel('New Case').getByText(caseOrigin, { exact: true }).click();
        await this.page.getByRole('combobox', { name: 'Type' }).click();
        await this.page.getByText(caseType).click();
        await this.page.getByRole('button', { name: 'Save', exact: true }).click();
        await logger.info("New case has been created")
    } 
}

