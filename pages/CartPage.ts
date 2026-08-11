import { Page, Locator, expect } from "@playwright/test";

export default class CartPage {
    readonly page: Page;
    readonly cartItemNames: Locator;
    readonly removeButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItemNames = page.locator('.inventory_item_name');
        this.removeButton = page.getByRole('button', { name: 'Remove' });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    async removeFirstItem() {
        await this.removeButton.click();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async expectItemNameVisible(name: string) {
        await expect(this.cartItemNames).toHaveText(name);
    }
}