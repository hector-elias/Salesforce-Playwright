import { type Locator } from "@playwright/test";

export class ElementActions {

    async clickElement(element: Locator, timeout: number = 5000): Promise<void> {
        console.log(`Clicking on element: ${element.toString()}`);
        await element.waitFor({ state: 'visible', timeout });
        await element.click();
    }

    async enterText(element: Locator, text: string, timeout: number = 5000): Promise<void> {
        console.log(`Entering text: "${text}" into element: ${element.toString()}`);
        await element.waitFor({ state: 'visible', timeout });
        await element.fill(text);
    }
}