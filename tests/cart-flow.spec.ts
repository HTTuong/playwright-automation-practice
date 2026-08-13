import { test } from '../fixtures/pages.fixture';
import  CartPage  from '../pages/CartPage';


test.describe('Cart flow', () => {
    test('Add 1 product to cart', async ({loggedInPage}) => {
        await loggedInPage.addFirstItemToCart()
        await loggedInPage.expectCartBadgeCount('1')
    })

    test('Add 3 product to cart', async ({loggedInPage}) => {
        await loggedInPage.addItemToCartByIndex(0);
        await loggedInPage.addItemToCartByIndex(1);
        await loggedInPage.addItemToCartByIndex(2);
        await loggedInPage.expectCartBadgeCount('3');
    })

    test('Remove product in cart', async ({ loggedInPage, page }) => {
        await loggedInPage.addFirstItemToCart()
        await loggedInPage.goToCart()
        const cartPage = new CartPage(page);
        await cartPage.removeFirstItem()
        await loggedInPage.expectCartBadgeHidden()
    });

    test('Check added product in cart', async ({ loggedInPage, page }) => {
        const productName = await loggedInPage.getFirstItemName()
        await loggedInPage.addFirstItemToCart()
        await loggedInPage.goToCart()
        const cartPage = new CartPage(page);
        await cartPage.expectItemNameVisible(productName)
    });
})
