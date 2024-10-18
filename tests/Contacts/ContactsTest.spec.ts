import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from '../../pom/pages/LoginPage';
import { ElementActions } from '../../actions/ElementActions';
import { BrowserActions } from '../../actions/BrowserActions';

let loginPage: LoginPage;
let elementActions: ElementActions;
let browserActions: BrowserActions;

test.use({
    launchOptions: {
        slowMo: 3000 // 3 secs delay between actions.
    }
})

test.describe('Contacts Feature', () => {

    test.beforeEach(async ({ page }) => {
        // Initialize ElementActions and BrowserActions.
        elementActions = new ElementActions();
        browserActions = new BrowserActions();

        // Create instance of LoginPage.
        loginPage = new LoginPage(page, elementActions, browserActions);

        // Navigate and Log In to Salesforce dashboard.
        await loginPage.navigateToLogInView();
        await loginPage.logInToDashboard(process.env.SALESFORCE_USERNAME!, process.env.SALESFORCE_PASSWORD!);
    })


    test('Creating a New Contact', async ({ page }) => {

        test.info().annotations.push({
            type: 'TC01-Contact-Creation',
            description: 'As a Salesforce user, I want to create a new contact to record my clients information on the platform.'
        });

        await test.step('Given the user is on the "Contacts" page', async () => {

            
        })
    })
})
