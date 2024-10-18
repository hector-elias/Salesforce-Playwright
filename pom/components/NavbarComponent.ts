import { Locator, Page } from '@playwright/test';
import { ElementActions } from '../../actions/ElementActions';
import { ServiceNavbarMenu } from '../../constants/SalesforceConstants';

export class NavbarComponents {
    readonly page: Page;
    readonly elementActions: ElementActions;
    readonly homeTab: Locator;
    readonly chatterTab: Locator;
    readonly accountsTab: Locator;
    readonly contactsTab: Locator;
    readonly casesTab: Locator;
    readonly reportsTab: Locator;
    readonly dashboardsTab: Locator;

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
    }

    // Helper to get the Locator of a specific tab based on its title.
    private getTabLocator(title: string): Locator {
        return this.page.locator(`a[title='${title}']`);
    }

     // Generic method to click on a navigation menu tab.
    async clickTab(tabName: keyof typeof ServiceNavbarMenu): Promise<void> {
        const tabLocator = this.getTabLocator(ServiceNavbarMenu[tabName]);
        await this.elementActions.clickElement(tabLocator);
    }
}