import { type Page } from '@playwright/test';

export class BrowserActions {

    async navigateToUrl(page: Page, url: string): Promise<void> {
        await page.goto(url, { waitUntil: 'load' });
    }
}