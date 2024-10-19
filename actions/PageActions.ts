import { type Page } from '@playwright/test';

export class PageActions {

    // Espera hasta que el evento 'load' se haya disparado (página completamente cargada)
    async waitForPageLoad(page: Page, timeout: number = 30000): Promise<void> {
        console.log('Waiting for page to fully load...');
        await page.waitForLoadState('load', { timeout });
    }

    // Espera hasta que el evento 'domcontentloaded' se haya disparado (HTML inicial completamente cargado)
    async waitForDOMContentLoaded(page: Page, timeout: number = 30000): Promise<void> {
        console.log('Waiting for DOM content to be fully loaded...');
        await page.waitForLoadState('domcontentloaded', { timeout });
    }

    // Espera hasta que no haya actividad de red por un tiempo (útil para esperar contenido dinámico)
    async waitForNetworkIdle(page: Page, timeout: number = 30000): Promise<void> {
        console.log('Waiting for network to be idle...');
        await page.waitForLoadState('networkidle', { timeout });
    }

    // Espera hasta que los recursos principales hayan sido cargados (imágenes, scripts, etc.)
    async waitForPageToBecomeInteractive(page: Page, timeout: number = 30000): Promise<void> {
        console.log('Waiting for page to become interactive...');
        await page.waitForLoadState('domcontentloaded', { timeout });
    }
}
