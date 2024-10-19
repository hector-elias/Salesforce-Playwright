import { Locator, Page } from '@playwright/test';
import { ElementActions } from '../../actions/ElementActions';
import { ServiceNavbarMenu } from '../../constants/SalesforceConstants';

export class Navbar {
    readonly page: Page;
    readonly elementActions: ElementActions;
    readonly homeTab: Locator;
    readonly chatterTab: Locator;
    readonly accountsTab: Locator;
    readonly contactsTab: Locator;
    readonly casesTab: Locator;
    readonly reportsTab: Locator;
    readonly dashboardsTab: Locator;
    readonly launcherIcon: Locator;

    constructor(page: Page, elementActions: ElementActions) {
        this.page = page;
        this.elementActions = elementActions;

        // Locators.
        this.homeTab = this.getTabLocator(ServiceNavbarMenu.Home);
        this.chatterTab = this.getTabLocator(ServiceNavbarMenu.Chatter);
        this.accountsTab = this.getTabLocator(ServiceNavbarMenu.Accounts);
        this.contactsTab = this.getTabLocator(ServiceNavbarMenu.Contacts);
        this.casesTab = this.getTabLocator(ServiceNavbarMenu.Cases);
        this.reportsTab = this.getTabLocator(ServiceNavbarMenu.Reports);
        this.dashboardsTab = this.getTabLocator(ServiceNavbarMenu.Dashboards);
        this.launcherIcon = page.locator(`button[title='App Launcher']`);
    }

    // Helper to get the Locator of a specific tab based on its title.
    private getTabLocator(title: string): Locator {
        return this.page.locator(`a[title='${title}']`);
    }

    // Helper to get the Locator of a specific app based on its title.
    private getAppsLocator(title: string): Locator {
        return this.page.locator(`a[data-label='${title}']`);
    }

    // Generic method to click on 'App Launcher' icon.
    async openAppLauncher(): Promise<void> {
        await this.elementActions.clickElement(this.launcherIcon);
    }

    // Generic method to click on a navigation menu item.
    async clickMenuItem(menuObject: Record<string, string>, tabName: keyof typeof menuObject): Promise<void> {
        const tabLocator = this.getTabLocator(menuObject[tabName]);
        await this.elementActions.clickElement(tabLocator);
    }

    // Generic method to click on a app modal item.
    async clicAppModal(menuObject: Record<string, string>, tabName: keyof typeof menuObject): Promise<void> {
        const tabLocator = this.getAppsLocator(menuObject[tabName]);
        await this.elementActions.clickElement(tabLocator);
    }
}