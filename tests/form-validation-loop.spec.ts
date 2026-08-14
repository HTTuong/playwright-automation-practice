import { test } from '../fixtures/pages.fixture';
import { checkoutInfo } from '../test-data/checkout-info';

const invalidCases = [
  { data: checkoutInfo.missingFirstName, expectedError: 'First Name is required' },
  { data: checkoutInfo.missingLastName, expectedError: 'Last Name is required' },
  { data: checkoutInfo.missingPostalCode, expectedError: 'Postal Code is required' },
];

for (const { data, expectedError } of invalidCases) {
  test(`Missing information: ${expectedError}`, async ({ loggedInPage, loginPage, cartPage, checkoutPage, page }) => {
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')

    await loggedInPage.addFirstItemToCart()
    await loggedInPage.goToCart()
    await cartPage.checkoutButton.click();

    await checkoutPage.fillInformation(data.firstName, data.lastName, data.postalCode);
    await checkoutPage.continueCheckout();
    await checkoutPage.expectErrorContains(expectedError);
  });
}