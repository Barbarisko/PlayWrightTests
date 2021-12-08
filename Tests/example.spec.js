const { test, expect } = require('@playwright/test');
const v8toIstanbul = require('v8-to-istanbul')
const {HomePage} = require("../Page Objects/HomePage.js");

test('User barbarskoo exists', async ({ page }) => {
    await page.coverage.startJSCoverage();
    await page.coverage.startCSSCoverage();

    const homepage = new HomePage(page);
    await homepage.open();
    await homepage.goToLoginWindow();
    await homepage.signUp('barbarskoo', 'barbarskoo');
    await homepage.userAlreadyExists();

    expect(homepage.isNotSignedUp).toBeTruthy();
    expect(await page.screenshot()).toMatchSnapshot('screenshot.png');

    const JScoverage = await page.coverage.stopJSCoverage();
    for(const entry of JScoverage){
        const  converter = new v8toIstanbul('', 0, {source: entry.source});
        await converter.load();
        converter.applyCoverage(entry.functions);
        console.log(JSON.stringify(converter.toIstanbul()));
    }
    const CSScoverage = await  page.coverage.stopCSSCoverage();
    for (const entry of CSScoverage){
        console.log(entry.url);    }});


