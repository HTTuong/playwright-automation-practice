import { faker } from '@faker-js/faker';
import { test, expect } from '../fixtures/pages.fixture';

test('Checkout with random data each run', async ({ loggedInPage, checkoutPage, cartPage, page }) => {
  await loggedInPage.addFirstItemToCart();
  await loggedInPage.goToCart();
  await cartPage.goToCheckout(); 

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const zipCode = faker.location.zipCode();

  await checkoutPage.fillInformation(firstName, lastName, zipCode);
  await checkoutPage.continueCheckout();
  await expect(checkoutPage.summaryInfo).toBeVisible();
});