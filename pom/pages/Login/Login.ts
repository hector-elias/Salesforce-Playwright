import { Locator, Page } from '@playwright/test';
import { ElementActions } from '../../../actions/ElementActions';
import { BrowserActions } from '../../../actions/BrowserActions';

export class Login {
    readonly page: Page;
    private elementActions: ElementActions;
    private browserActions: BrowserActions;
    readonly saleforceLogo: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page, elementActions: ElementActions, browserActions: BrowserActions) {
        this.page = page;
        this.elementActions = elementActions;
        this.browserActions = browserActions;

        // Locators.
        this.saleforceLogo = page.getByTestId('logo');
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('Login');
    }

    async navigateToLogInView(): Promise<void> {
        if (!process.env.BASE_URL) {
            throw new Error("BASE_URL environment variable is not defined.");
        }
        await this.browserActions.navigateToUrl(this.page, process.env.BASE_URL);
    }

    async logInToDashboard(username: string, password: string): Promise<void> {
        await this.elementActions.enterText(this.usernameInput, username);
        await this.elementActions.enterText(this.passwordInput, password);
        await this.elementActions.clickElement(this.loginButton);
    }
}