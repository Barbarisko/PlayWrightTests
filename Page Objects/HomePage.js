const { Page }  = require("playwright");
const assert = require("assert");

class HomePage {
    // page : Page;
    isNotSignedUp;

    constructor(page) {
        this.page = page;
    }
    async open() {
        await this.page.goto('https://demoblaze.com/');
    }
    async goToLoginWindow() {
        await this.page.click('a:has-text("Sign up")');
        await this.page.click('text=Sign up × Username: Password: Close Sign up >> input[type="text"]');
    }
    async signUp(login, password){
        await this.page.fill('text=Username: Password: >> input[type="text"]', login);
        await this.page.click('input[type="password"]');
        await this.page.fill('input[type="password"]', password);
    }
    async userAlreadyExists()        // : Promise<boolean>
        {
        this.page.on('dialog', dialog=>{
            console.log(`Dialog msg: ${dialog.message()}`);
            if(dialog.message() === "This user already exist."){
                this.isNotSignedUp = true;
            }
            dialog.dismiss().catch(()=>{});
        })
            this.isNotSignedUp = true;

            await this.page.click('button:has-text("Sign up")') ;
        }}
module.exports = { HomePage };
