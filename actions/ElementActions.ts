import { type Locator } from "@playwright/test";

export class ElementActions {

    async clickElement(element: Locator, timeout?: number): Promise<void> {
        try {
            console.log(`Waiting for element to be visible and present in DOM: ${element.toString()} - ${timeout || 'default (30s)'}`);
            await element.waitFor({ state: 'visible', timeout });
            await element.waitFor({ state: 'attached', timeout });

            const isEnabled = await element.isEnabled();

            if (!isEnabled) {
                throw new Error(`The ${element.toString()} isn't enabled.`);
            }

            console.log(`Clicking on element: ${element.toString()}`);
            await element.click({ timeout, force: true });

        } catch (error) {
            console.error(`Failed to click on element: ${element.toString()}. Error: ${error}`);
            throw error;
        }
    }

    async enterText(element: Locator, text: string, timeout?: number): Promise<void> {
        try {
            console.log(`Waiting for element to be visible and present in DOM: ${element.toString()} - ${timeout || 'default (30s)'}`);
            await element.waitFor({ state: 'visible', timeout });
            await element.waitFor({ state: 'attached', timeout });

            const isEnabled = await element.isEnabled();
            if (!isEnabled) {
                throw new Error(`The ${element.toString()} isn't enabled.`);
            }

            console.log(`Entering text: "${text}" into element: ${element.toString()}`);
            await element.fill(text, { timeout });

        } catch (error) {
            console.error(`Failed to enter text into element: ${element.toString()}. Error: ${error}`);
            throw error;
        }
    }
}