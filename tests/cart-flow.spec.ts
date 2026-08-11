import { test, expect } from '@playwright/test';
import LoginPage  from '../pages/LoginPage';
import  InventoryPage from '../pages/InventoryPage';
import  CartPage  from '../pages/CartPage';


test.describe('Cart flow', () => {
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
    });

    test('Add 1 product to cart', async ({page}) => {
        await inventoryPage.addFirstItemToCart()
        await inventoryPage.expectCartBadgeCount('1')
    })

    test('Add 3 product to cart', async ({page}) => {
        await inventoryPage.addItemToCartByIndex(0);
        await inventoryPage.addItemToCartByIndex(1);
        await inventoryPage.addItemToCartByIndex(2);
        await inventoryPage.expectCartBadgeCount('3');
    })

    test('Remove product in cart', async ({ page }) => {
        await inventoryPage.addFirstItemToCart()
        await inventoryPage.goToCart()
        await cartPage.removeFirstItem()
        await inventoryPage.expectCartBadgeHidden()
    });

    test('Check added product in cart', async ({ page }) => {
        const productName = await inventoryPage.getFirstItemName()
        await inventoryPage.addFirstItemToCart()
        await inventoryPage.goToCart()
        await cartPage.expectItemNameVisible(productName)
    });
})
