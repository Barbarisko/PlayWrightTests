const {expect} = require("@playwright/test");
const assert = require("assert");

class CartPage {
    /**
     * @param {import('playwright').Page} page
     */
    static success;
    constructor(page) {
        this.page = page;
    }
    async navigate() {
        // Go to https://www.demoblaze.com/
        await this.page.goto('https://demoblaze.com/cart.html');
    }
    async placeEmptyOrder() {
        // Click button:has-text("Place Order")
        await this.page.click('button:has-text("Place Order")');
        // Click text=Total: Name: Country: City: Credit card: Month: Year: >> input[type="text"]
        await this.page.click('text=Total: Name: Country: City: Credit card: Month: Year: >> input[type="text"]');
        // Fill text=Total: Name: Country: City: Credit card: Month: Year: >> input[type="text"]
        await this.page.fill('text=Total: Name: Country: City: Credit card: Month: Year: >> input[type="text"]', 'test');
        // Click #country
        await this.page.click('#country');
        await this.page.fill('#country', 'test');
        await this.page.click('#city');
        await this.page.fill('#city', 'test');
        await this.page.click('#card');
        await this.page.fill('#card', '123456');
        // Click text=Purchase
        await this.page.click('text=Purchase');
        // Click text=Thank you for your purchase!

        this.success = this.page.locator('div.showSweetAlert > h2');
        // await expect(success).toHaveText('Thank you for your purchase!')
    }

    async alterTotalSum() {
        await this.page.goto('https://www.demoblaze.com/');

        await this.page.click('text=Monitors');
        await this.page.click('text=ASUS Full HD');
        await expect(this.page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=14');

        // Click text=Add to cart
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        });
        await expect(this.page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=14#');
        // Click text=Cart
        await this.page.click('text=Cart');
        await expect(this.page).toHaveURL('https://www.demoblaze.com/cart.html');

        let not_zero = this.page.locator('#totalp');
        await expect(not_zero).toHaveText('230');
    }
}
module.exports = { CartPage };
