const { test, expect } = require('@playwright/test');
const assert = require("assert");

test('existing user test', async ({ page }) => {
    // Go to https://www.demoblaze.com/
    await page.goto('https://www.demoblaze.com/');
    // Click a:has-text("Sign up")
    await page.click('a:has-text("Sign up")');
    // Click text=Log in × Username: Password: Close Log in >> input[type="text"]
    await page.click('text=Sign up × Username: Password: Close Sign up >> input[type="text"]');
    // Fill text=Log in × Username: Password: Close Log in >> input[type="text"]
    await page.fill('text=Sign up × Username: Password: Close Sign up >> input[type="text"]', 'barbarskoo');
    // Press Tab
    await page.press('text=Sign up × Username: Password: Close Sign up >> input[type="text"]', 'Tab');
    // Fill text=Log in × Username: Password: Close Log in >> input[type="password"]
    await page.fill('text=Sign up × Username: Password: Close Sign up >> input[type="password"]', 'barbarsko');
    // Press Enter
    await page.press('text=Log in × Username: Password: Close Log in >> input[type="password"]', 'Enter');

    page.on('dialog', dialog=>{
        console.log(`Dialog msg: ${dialog.message()}`);
        assert("This user already exist.", dialog.message());
        dialog.dismiss().catch(()=>{});
    })
    // Click button:has-text("Sign up")
        await page.click('button:has-text("Sign up")')
});

test('empty cart test', async ({ page }) => {
    // Go to https://demoblaze.com/
    await page.goto('https://demoblaze.com/');
    // Click text=Cart
    await page.click('text=Cart');
    await expect(page).toHaveURL('https://demoblaze.com/cart.html');
    // Click button:has-text("Place Order")
    await page.click('button:has-text("Place Order")');
    // Click text=Total: Name: Country: City: Credit card: Month: Year: >> input[type="text"]
    await page.click('text=Total: Name: Country: City: Credit card: Month: Year: >> input[type="text"]');
    // Fill text=Total: Name: Country: City: Credit card: Month: Year: >> input[type="text"]
    await page.fill('text=Total: Name: Country: City: Credit card: Month: Year: >> input[type="text"]', 'test');
    // Click #country
    await page.click('#country');
    await page.fill('#country', 'test');
    await page.click('#city');
    await page.fill('#city', 'test');
    await page.click('#card');
    await page.fill('#card', '123456');
    // Click text=Purchase
    await page.click('text=Purchase');
    // Click text=Thank you for your purchase!

    const success = page.locator('div.showSweetAlert > h2');
    await expect(success).toHaveText('Thank you for your purchase!');
});


test('change cart sum test', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    await page.click('text=Monitors');
    await page.click('text=ASUS Full HD');
    await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=14');

    // Click text=Add to cart
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
    });
    await page.click('text=Add to cart');
    await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=14#');
    // Click text=Cart
    await page.click('text=Cart');
    await expect(page).toHaveURL('https://www.demoblaze.com/cart.html');

    let not_zero = page.locator('#totalp');
    await expect(not_zero).toHaveText('230');

    await page.goto('https://www.demoblaze.com/');
    await page.click('text=Nexus 6');
    await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=3');
    // Click text=Add to cart
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
    });
    await page.click('text=Add to cart');
    await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=3#');

    // Click text=Cart
    await page.click('text=Cart');
    await expect(page).toHaveURL('https://www.demoblaze.com/cart.html');

    let modified = page.locator('#totalp');
    await expect(modified).toHaveText('880');

    await page.click('text=Nexus 6Delete >> img');

    // Click text=Delete
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/cart.html#' }*/),
        page.click('text=Delete')
    ]);

    let not_zero2 = page.locator('#totalp');
    await expect(not_zero2).toHaveText('230');});
