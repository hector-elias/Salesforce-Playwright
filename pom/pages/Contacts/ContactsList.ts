import { Locator, Page } from '@playwright/test';
import { ElementActions } from '../../../actions/ElementActions';

export class ContactsList {
    readonly page: Page;
    readonly elementActions: ElementActions;
    readonly newContactButton: Locator;
    readonly moreActionsButton: Locator;
    readonly contactTable: Locator;
    readonly deleteOptionModal: Locator;
    readonly toastMessage: Locator;
    readonly scrollableTableContainer: Locator;

    constructor(page: Page, elementActions: ElementActions) {
        this.page = page;
        this.elementActions = elementActions;

        // Locators.
        this.newContactButton = page.getByRole('button', { name: 'New' });
        this.moreActionsButton = page.locator('button.slds-button_icon-border.slds-button_icon-x-small[aria-haspopup="true"]');
        this.contactTable = page.getByRole('grid');
        this.deleteOptionModal = page.locator('button.slds-button:has-text("Delete")');
        this.toastMessage = page.getByRole('alert').locator('.toastMessage');
        this.scrollableTableContainer = page.locator('div.slds-scrollable_y');
    }

    async clickNewContactButton(): Promise<void> {
        await this.elementActions.clickElement(this.newContactButton);
    }

    async confirmDeleteContact(): Promise<void> {
        await this.elementActions.clickElement(this.deleteOptionModal, 50000);
    }

    async clickMoreActionsButton(moreActionsButton: Locator, retryInterval: number = 500, maxAttempts: number = 20): Promise<void> {
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            if (await moreActionsButton.isVisible()) {
                await this.elementActions.clickElement(moreActionsButton);
                return;
            }

            await new Promise(resolve => setTimeout(resolve, retryInterval));
        }

        throw new Error(`Failed to click "More Actions" button after ${maxAttempts} attempts.`);
    }



    async findContactRowByName(name: string): Promise<Locator> {

        const rowLocator = this.contactTable.locator(`tr:has(a:has-text("${name}"))`).first();

        console.log(`Searching for row containing the name: ${name}`);
        return rowLocator;
    }

    async deleteContactByName(name: string): Promise<void> {
        const rowLocator = this.contactTable.locator(`tr:has(a:has-text("${name}"))`).first();

        if (!(await rowLocator.isVisible())) {
            throw new Error(`No row found containing the name: ${name}`);
        }

        const moreActionsButton = rowLocator.locator(this.moreActionsButton);
        await this.clickMoreActionsButton(moreActionsButton);


        const deleteButton = this.page.locator('a[role="menuitem"][title="Delete"], a.forceActionLink[title="Delete"]').first();
        await this.elementActions.clickElement(deleteButton, 50000);

        // Confirm the 'Delete Contact' action.
        await this.confirmDeleteContact();
    }


    async scrollToFindRow(tableContainer: Locator, rowText: string, maxAttempts: number = 20): Promise<Locator | null> {
        await tableContainer.waitFor({ state: 'visible' });

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const rowLocator = tableContainer.locator(`tr:has-text("${rowText}")`);

            if (await rowLocator.count() > 0) {
                return rowLocator;
            }

            await tableContainer.evaluate(container => container.scrollTop += 500);

            await new Promise(resolve => setTimeout(resolve, 500));
        }

        console.warn(`Row with text "${rowText}" was not found after ${maxAttempts} attempts.`);
        return null;
    }



}
