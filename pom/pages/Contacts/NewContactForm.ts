import { Locator, Page } from '@playwright/test';
import { ElementActions } from '../../../actions/ElementActions';

export class NewContactForm {
    readonly page: Page;
    readonly elementActions: ElementActions;
    readonly newContactTitle: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly phoneField: Locator;
    readonly titleField: Locator;
    readonly saveButton: Locator;
    readonly toastMessage: Locator;

    constructor(page: Page, elementActions: ElementActions) {
        this.page = page;
        this.elementActions = elementActions;

        // Locators.
        this.newContactTitle = page.locator('h2', { hasText: 'New Contact' });
        this.firstNameField = page.getByPlaceholder('First Name');
        this.lastNameField = page.getByPlaceholder('Last Name');
        this.phoneField = page.locator('input[name="Phone"]');
        this.titleField = page.locator('input[name="Title"]');
        this.saveButton = page.locator('button[name="SaveEdit"]');
        this.toastMessage = page.getByRole('alert').locator('.toastMessage');
    }

    async completeNewContactForm(firstName: string, lastName: string, phone: string, title: string): Promise<void> {
        await this.elementActions.enterText(this.firstNameField, firstName);
        await this.elementActions.enterText(this.lastNameField, lastName);
        await this.elementActions.enterText(this.phoneField, phone);
        await this.elementActions.enterText(this.titleField, title);
    }

    async clickSaveButton(): Promise<void> {
        await this.elementActions.clickElement(this.saveButton);
    }
}