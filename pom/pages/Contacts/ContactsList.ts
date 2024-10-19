import { Locator, Page } from '@playwright/test';
import { ElementActions } from '../../../actions/ElementActions';

export class ContactsList {
    readonly page: Page;
    readonly elementActions: ElementActions;
    readonly newContactButton: Locator;

    constructor(page: Page, elementActions: ElementActions) {
        this.page = page;
        this.elementActions = elementActions;

        // Locators.
        this.newContactButton = page.getByRole('button', { name: 'New' });
    }

    async clickNewContactButton(): Promise<void> {
        await this.elementActions.clickElement(this.newContactButton);
    }
}
