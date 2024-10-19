import { Locator, Page } from '@playwright/test';
import { ElementActions } from '../../../actions/ElementActions';

export class NewContactForm {
    readonly page: Page;
    readonly elementActions: ElementActions;
    readonly firstNameField: Locator;
    readonly newContactTitle: Locator;

    constructor(page: Page, elementActions: ElementActions) {
        this.page = page;
        this.elementActions = elementActions;

        // Locators.
        this.newContactTitle = page.locator('h2', { hasText: 'New Contact' });
        this.firstNameField = page.getByPlaceholder('First Name');
    }
}