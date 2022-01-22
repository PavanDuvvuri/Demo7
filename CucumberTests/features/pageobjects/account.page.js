const Page = require('./page');
const elementUtil = require('../utils/elementUtil.page');
const faker = require('faker');
var pepArrayActual = []
let expectedOptions = ["I am not PEP", "I am PEP"]
/**
 * sub page containing specific selectors and methods for a specific page
 */
class AccountPage extends Page {
    get OPENBET_OPT() {
        return $("//a[normalize-space()='Open Bets']")
    }
    get LOGGEDIN_ACCOUNTNAME() {
        return $("//div[@class='sc-oepnmo-2 hwMoxF']")
    }
    get MYBET_OPT() {
        return $("//a[normalize-space()='{my bets}']")
    }

  
    async clickOnOpenBet() {
        await elementUtil.clickOnElement(this.OPENBET_OPT)
    }

    async clickOnMyBet() {
        await elementUtil.clickOnElement(this.MYBET_OPT)
    }
}

module.exports = new AccountPage();