import { test, expect } from '../fixtures/pages.fixture';

const invalidCases = [
  { firstName: '', lastName: 'Hoang', zip: '00100', expectedError: 'First Name is required' },
  { firstName: 'Tuong', lastName: '', zip: '00100', expectedError: 'Last Name is required' },
  { firstName: 'Tuong', lastName: 'Hoang', zip: '', expectedError: 'Postal Code is required' },
];

for (const data of invalidCases) {
  test(`Missing information: ${data.expectedError}`, async ({ loggedInPage, loginPage, cartPage, checkoutPage, page }) => {
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')

    await loggedInPage.addFirstItemToCart()
    await loggedInPage.goToCart()
    await cartPage.checkoutButton.click();

    await checkoutPage.firstNameInput.fill(data.firstName);
    await checkoutPage.lastNameInput.fill(data.lastName);
    await checkoutPage.postalCodeInput.fill(data.zip);
    await checkoutPage.continueButton.click();

    await checkoutPage.expectErrorContains(data.expectedError)
  });
}