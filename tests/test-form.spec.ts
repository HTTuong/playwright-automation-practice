import { test, expect } from '@playwright/test';


test.describe("Test Input", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com')
    })


    test('Check and fill input', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user')
        await expect(page.getByPlaceholder('Username')).toHaveValue('standard_user')
    })

    test('Check Login', async ({ page}) => {
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByRole('button', {name: 'Login'}).click()
        await expect(page).toHaveURL(/inventory/)
    })

    test('Check Login faild', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('wrong_user')
        await page.getByPlaceholder('Password').fill('wrong_pass')
        await page.getByRole('button', {name: 'Login'}).click()
        await expect(page.getByText('Username and password do not match')).toBeVisible()

    })

    test('Find by selector' , async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByRole('button', {name: 'Login'}).click()
        const firstProduct = page.locator('.inventory_item').first()
        await expect(firstProduct).toBeVisible()
    })

})