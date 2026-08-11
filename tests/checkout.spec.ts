import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage'
import InventoryPage from '../pages/InventoryPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'


test.describe('Checkout flow', () => {
    let checkoutPage: CheckoutPage
    let cartPage: CartPage
    let inventoryPage: InventoryPage

    test.beforeEach( async ({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.login('standard_user', 'secret_sauce')

        inventoryPage = new InventoryPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)

        await inventoryPage.addFirstItemToCart()
        await inventoryPage.goToCart()
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