import { test as base} from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import CheckoutPage from "../pages/CheckoutPage";
import CartPage from "../pages/CartPage";
import InventoryPage from "../pages/InventoryPage";

type PageFixture = {
    loginPage: LoginPage
    checkoutPage: CheckoutPage
    cartPage: CartPage
    inventoryPage: InventoryPage
}

export const test = base.extend<PageFixture>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },

    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page)
        await use(checkoutPage)
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page)
        await use(cartPage)
    },

    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page)
        await use(inventoryPage)
    }
})

export { expect } from '@playwright/test';

