import { type Locator } from "@playwright/test";

export class ElementActions {

    async clickElement(element: Locator, timeout: number = 30000): Promise<void> {
        console.log(`Clicking on element: ${element.toString()}`);
        await element.click({ timeout });
    }

    async enterText(element: Locator, text: string, timeout: number = 30000): Promise<void> {
        console.log(`Entering text: "${text}" into element: ${element.toString()}`);
        await element.fill(text, { timeout });
    }
}