import { test, expect, Locator, Page } from '@playwright/test';
import { Login } from '../../pom/pages/Login/Login';
import { ElementActions } from '../../actions/ElementActions';
import { BrowserActions } from '../../actions/BrowserActions';
import { PageActions } from '../../actions/PageActions';
import { Navbar } from '../../pom/components/Navbar';
import { LauncherApps, ServiceNavbarMenu } from '../../constants/SalesforceConstants';
import { ContactsList } from '../../pom/pages/Contacts/ContactsList';
import { NewContactForm } from '../../pom/pages/Contacts/NewContactForm';

let login: Login;
let navbar: Navbar;
let contactList: ContactsList;
let newContactForm: NewContactForm;
let elementActions: ElementActions;
let browserActions: BrowserActions;
let pageActions: PageActions;

test.use({
    launchOptions: {
        slowMo: 2000 // 1 secs delay between actions.
    }
})

test.describe('Contacts Feature', () => {

    test.beforeEach(async ({ page }) => {
        // Initialize ElementActions and BrowserActions.
        elementActions = new ElementActions();
        browserActions = new BrowserActions();
        pageActions = new PageActions();

        // Create instance of pages and components.
        login = new Login(page, elementActions, browserActions);
        navbar = new Navbar(page, elementActions);
        contactList = new ContactsList(page, elementActions);
        newContactForm = new NewContactForm(page, elementActions);

        // Navigate and Log In to Salesforce dashboard.
        await login.navigateToLogInView();
        await login.logInToDashboard(process.env.SALESFORCE_USERNAME!, process.env.SALESFORCE_PASSWORD!); 
    })


    test('Creating a New Contact', async ({ page }) => {

        test.info().annotations.push({
            type: 'TC01-Contact-Creation',
            description: 'As a Salesforce user, I want to create a new contact to record my clients information on the platform.'
        });

        await test.step('Given I am on the "Contacts" page', async () => {
            await navbar.openAppLauncher();
            await navbar.clicAppModal(LauncherApps, 'Service');
            await navbar.clickMenuItem(ServiceNavbarMenu, 'Contacts');

        })

        await test.step('When I click on the "New" button', async () => {
            await pageActions.waitForPageLoad(page);
            await contactList.clickNewContactButton();
        })

        await test.step('And I enter a name in the "First Name" field', async () => {
            const title = newContactForm.newContactTitle;
            await expect(title).toHaveText('New Contact');
            await pageActions.waitForPageLoad(page);
            await elementActions.enterText(newContactForm.firstNameField, 'Sergio');
        })
    })
})
