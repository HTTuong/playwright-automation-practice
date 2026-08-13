import { test, expect } from '../fixtures/pages.fixture';
import InventoryPage from '../pages/InventoryPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'


test.describe('Checkout flow', () => {
    let checkoutPage: CheckoutPage
    let cartPage: CartPage
    let inventoryPage: InventoryPage

    test.beforeEach( async ({ loggedInPage, page }) => {
        inventoryPage = new InventoryPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)

        await loggedInPage.addFirstItemToCart()
        await loggedInPage.goToCart()
    })

    test('Checkout successfully with full information', async ({ page }) => {
        await cartPage.goToCheckout()
        await checkoutPage.fillInformation('Tuong', 'Hoang', '00760')
        await checkoutPage.continueCheckout()

        await expect(checkoutPage.summaryInfo).toBeVisible();
        await checkoutPage.finishCheckout()

        await checkoutPage.expectOrderComplete()
    });


     test('Money in total overview displayed correctly', async ({ page }) => {
        await cartPage.goToCheckout()
        await checkoutPage.fillInformation('Tuong', 'Hoang', '00760')
        await checkoutPage.continueCheckout()

        await expect(checkoutPage.summaryTotal).toContainText('Total: $');
    });

})