import { test, expect, Locator, Page } from '@playwright/test';
import { Login } from '../../pom/pages/Login/Login';
import { ElementActions } from '../../actions/ElementActions';
import { BrowserActions } from '../../actions/BrowserActions';
import { PageActions } from '../../actions/PageActions';
import { Navbar } from '../../pom/components/Navbar';
import { LauncherApps, ServiceNavbarMenu } from '../../constants/SalesforceConstants';
import { ContactsList } from '../../pom/pages/Contacts/ContactsList';
import { NewContactForm } from '../../pom/pages/Contacts/NewContactForm';
import { faker } from '@faker-js/faker';

let login: Login;
let navbar: Navbar;
let contactList: ContactsList;
let newContactForm: NewContactForm;
let elementActions: ElementActions;
let browserActions: BrowserActions;
let pageActions: PageActions;


test.use({
    launchOptions: {
        slowMo: 3000 // 3 secs delay between actions.
    }
})

test.describe('Contacts Feature', () => {

    test.beforeEach(async ({ page }) => {
        // Initialize ElementActions, BrowserActions and PageActions.
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
        await pageActions.waitForDOMContentLoaded(page);
    })


    test('Creating a New Contact', async ({ page }) => {

        test.info().annotations.push({
            type: 'TC01-Contact-Creation',
            description: 'As a Salesforce user, I want to create a new contact to record my clients information on the platform.'
        });

        // Generate fake data.
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const phone = faker.phone.number({ style: "national" });
        const title = faker.lorem.word({ strategy: "longest" });


        await test.step('Given I am on the "Contacts" page', async () => {
            await navbar.openAppLauncher();
            await navbar.clicAppModal(LauncherApps, 'Service');
            await navbar.clickMenuItem(ServiceNavbarMenu, 'Contacts');
        })

        await test.step('When I click on the "New" button', async () => {
            await contactList.clickNewContactButton();
        })

        await test.step('And I complete the "New Contact" form', async () => {
            await newContactForm.completeNewContactForm(firstName, lastName, phone, title);
        })

        await test.step('And I click on the "Save" button', async () => {
            await newContactForm.clickSaveButton();
        })

        await test.step('Then I should be able to see a succesful message', async () => {
            await expect(newContactForm.toastMessage).toHaveText(
                `Contact "${firstName} ${lastName}" was created.`
            );
            await page.waitForSelector('.toastMessage', { state: 'detached', timeout: 10000 });
        })

        await test.step('And I should be able to see the new created contact in the "Contacts" list', async () => {
            await navbar.clickMenuItem(ServiceNavbarMenu, 'Contacts');
            await contactList.scrollToFindRow(contactList.scrollableTableContainer, `${firstName} ${lastName}`);
            const newContactRow = await contactList.findContactRowByName(`${firstName} ${lastName}`);
            await expect(newContactRow).toBeVisible();
        })
    })

    test('Deleting an Existing Contact', async ({ page }) => {

        test.info().annotations.push({
            type: 'TC01-Delete-Existing-Contact',
            description: 'As a Salesforce user, I want to delete an existing contact to remove outdated or incorrect client information from the platform.'
        });

        // Create a temporary contact to ensure there is something to delete.
        const tempContactFirstName = faker.person.firstName();
        const tempContactLastName = `Temp-${faker.person.lastName()}`;
        const tempContactPhone = faker.phone.number({ style: "national" });
        const tempContactTitle = faker.lorem.word({ strategy: "longest" });

        await test.step('Given I am on the "Contacts" page', async () => {
            await navbar.openAppLauncher();
            await navbar.clicAppModal(LauncherApps, 'Service');
            await navbar.clickMenuItem(ServiceNavbarMenu, 'Contacts');
            await contactList.clickNewContactButton();
            await newContactForm.completeNewContactForm(
                tempContactFirstName,
                tempContactLastName,
                tempContactPhone,
                tempContactTitle
            );
            await newContactForm.clickSaveButton();
        })

        await test.step('When I select the temporary contact and click "Delete"', async () => {
            await navbar.clickMenuItem(ServiceNavbarMenu, 'Contacts');
            await contactList.scrollToFindRow(contactList.scrollableTableContainer, `${tempContactFirstName} ${tempContactLastName}`);
            await contactList.deleteContactByName(`${tempContactFirstName} ${tempContactLastName}`);
        })

        await test.step('Then I should be able to see a succesful message', async () => {
            await expect(contactList.toastMessage).toHaveText(/Contact ".*" was deleted\./);
            await page.waitForSelector('.toastMessage', { state: 'detached', timeout: 10000 });
        })

        await test.step('And I should no longer see the contact in the "Contacts" list', async () => {
            await navbar.clickMenuItem(ServiceNavbarMenu, 'Contacts');
            const deletedContact = await contactList.findContactRowByName(`${tempContactFirstName} ${tempContactLastName}`);
            await expect(deletedContact).toBeVisible({ visible: false});
        })
    })


    test.afterEach('Close the pages after each test', async ({ page }) => {
        await browserActions.closePage(page);
    })
})
