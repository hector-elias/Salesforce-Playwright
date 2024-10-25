import { type Page } from '@playwright/test';

export class PageActions {

    // Waits until the 'load' event is fired (page is fully loaded).
    async waitForPageLoad(page: Page, timeout?: number): Promise<void> {
        console.log(`Waiting for page to fully load with timeout: ${timeout || 'default (30s)'}`);
        await page.waitForLoadState('load', { timeout });
    }

    // Waits until the 'domcontentloaded' event is fired (initial HTML is fully loaded).
    async waitForDOMContentLoaded(page: Page, timeout?: number): Promise<void> {
        console.log(`Waiting for DOM content to fully load with timeout: ${timeout || 'default (30s)'}`);
        await page.waitForLoadState('domcontentloaded', { timeout });
    }

    // Waits until there is no network activity for a while (useful for waiting on dynamic content).
    async waitForNetworkIdle(page: Page, timeout?: number): Promise<void> {
        console.log(`Waiting for network to be idle with timeout: ${timeout || 'default (30s)'}`);
        await page.waitForLoadState('networkidle', { timeout });
    }
}
