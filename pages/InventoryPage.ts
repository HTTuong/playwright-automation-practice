import { Page, Locator, expect } from "@playwright/test";

export default class InventoryPage {
    readonly page: Page
    readonly inventoryItems: Locator
    readonly cartBadge: Locator
    readonly cartLink: Locator
    readonly sortDropdown: Locator

    constructor(page: Page) {
        this.page = page
         this.inventoryItems = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
        this.sortDropdown = page.getByRole('combobox');
    }

    async addFirstItemToCart() {
        await this.inventoryItems.first().getByRole('button', { name: 'Add to cart' }).click();
    }

    async addItemToCartByIndex(index: number) {
        await this.inventoryItems.nth(index).getByRole('button', { name: 'Add to cart' }).click();
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async getFirstItemName(): Promise<string> {
        return (await this.inventoryItems.first().locator('.inventory_item_name').textContent()) ?? '';
    }

    async expectCartBadgeCount(count: string) {
        await expect(this.cartBadge).toHaveText(count);
    }

    async expectCartBadgeHidden() {
        await expect(this.cartBadge).toBeHidden();
    }
}