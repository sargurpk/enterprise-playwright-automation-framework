import { Page, expect } from '@playwright/test'

export default class HomePage {

    private readonly serviceTitle = 'Service';
    private readonly appLauncher = 'App Launcher';
    private readonly serviceOption = '.al-menu-dropdown-list>one-app-launcher-menu-item:nth-child(1)'

    constructor(private page: Page){

    }

    async clickAppLauncher() {
        await this.page.getByTitle(this.appLauncher).click()
    }

    async clickServiceOption() {
        await this.page.locator(this.serviceOption).click()
    }

    async expectServiceTitleToBeVisible() {
        await expect(this.page.getByTitle(this.serviceTitle)).toBeVisible({timeout: 20000})
    }

}