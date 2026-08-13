import { test, expect } from '../fixtures/pages.fixture';

test.describe('Checkout flow', () => {
    test.beforeEach( async ({ loggedInPage }) => {
        await loggedInPage.addFirstItemToCart()
        await loggedInPage.goToCart()
    })

    test('Checkout successfully with full information', async ({ cartPage, checkoutPage }) => {
        await cartPage.goToCheckout()
        await checkoutPage.fillInformation('Tuong', 'Hoang', '00760')
        await checkoutPage.continueCheckout()

        await expect(checkoutPage.summaryInfo).toBeVisible();
        await checkoutPage.finishCheckout()

        await checkoutPage.expectOrderComplete()
    });


     test('Money in total overview displayed correctly', async ({ cartPage, checkoutPage }) => {
        await cartPage.goToCheckout()
        await checkoutPage.fillInformation('Tuong', 'Hoang', '00760')
        await checkoutPage.continueCheckout()

        await expect(checkoutPage.summaryTotal).toContainText('Total: $');
    });

})