

////input[@placeholder='Stake']

const Page = require('./page');
const elementUtil = require('../utils/elementUtil.page');
const faker = require('faker');
const HomePage = require('../pageobjects/home.page');
/**
 * sub page containing specific selectors and methods for a specific page
 */
class BetslipPage extends Page {

    get STAKE_TXT() {
        return $("//input[@placeholder='Stake']")
    }
    get RETURN_AMT_UPPER() {
        return $("//span[@class='sc-qzkh8y-2 sc-17xk7tn-1 cXIlIS fQigLs']")
    }
    //ul[2]//li[2]//h6[1]

    get RETURN_AMT_BOTTOM() {
        return $("(//h6[@class='sc-1c7zan4-3 sc-1c7zan4-4 sc-slv3vk-1 eEvebr ferRRK fjrwxk'])[2]")
    }
    get TOTALSTAKE_LBL() {
        return $("(//h6[@class='sc-1c7zan4-3 sc-slv3vk-0 eEvebr hiIzjZ'])[2]")
    }
    get BETCOUNT() {
        return $("//span[@class='sc-uzl2kp-3 sc-ggcw4f-3 eufKRH ebwZJS']")
    }
    get PLACEBET_BUTTON() {
        return $("//button[normalize-space()='Place Bet']")
    }
    //Locators in betslip after successfull bet placement

    get RECEIPT() {
        return $("//h3[normalize-space()='Betslip Receipt']")
    }

    get STAKE_RECEIPT() {
        return $("//div[@class='sc-9kce03-0 fcdjBy']//ul[2]//li[2]//h5[1]")
    }
    get RETURNS_RECEIPT() {
        return $("(//h5[@class='sc-9kce03-9 sc-56lk11-3 gsuwsB bBxjJC'])[2]")
    }
    get DATE_RECEIPT() {
        return $("//p[@class='sc-9kce03-4 sc-56lk11-1 eFdHzU euIvvw']")
    }
    get PLAYER_NAME_RECEIPT() {
        return $("//div[@class='sc-i0dd66-10 sc-1o60xh3-1 hgGuwL gwBgMD']")
    }
    get RETAIN_CHECKBOX() {
        return $("//input[@type='checkbox' and @class='sc-d0g8qb-6 kNTTgp']")
    }
    get CLOSE_RECEIPT() {
        return $("//button[normalize-space()='Close Receipt']")
    }
    get RETAINEDPLAYERNAME() {
        return $("//*[@class='sc-11ali95-1 sc-u5gc7-0 jNGpLe eqWBmn']")
    }




    async enterStakeAmount(stake) {
        await elementUtil.setElementValue(this.STAKE_TXT, stake)
    }

    async getReturns_Bottom() {
        return await elementUtil.getElementText(this.RETURN_AMT_BOTTOM)
    }
    async getTotalStake() {
        var stakeDisplayed = await elementUtil.getElementText(this.TOTALSTAKE_LBL)
        return stakeDisplayed
    }

    async getValueFromUserEnteredStake() {
        var userEnteredStake = await elementUtil.getElementValue(this.STAKE_TXT)
        var userEnteredStakeWithCurrancy = "£" + userEnteredStake
        return userEnteredStakeWithCurrancy
    }
    async getBetCount() {
        return await elementUtil.getElementText(this.BETCOUNT)
    }

    async clickOnPlaceButton() {
        return await elementUtil.clickOnElement(this.PLACEBET_BUTTON)
    }
    async getPlayerName() {
        return await elementUtil.getElementText(this.PLAYER_NAME_RECEIPT)
    }

    ///////////////////////////
    async stakeValueWithoutEuro() {
        // var stake=parseFloat(this.STAKE_RECEIPT.toString().slice(1))
        // return  stake

        var stake_with_euro = await elementUtil.getElementText(this.STAKE_RECEIPT)
        console.log("bstake with euro", stake_with_euro)
        var stakeWithouEuro = parseFloat(stake_with_euro.toString().slice(1))
        return stakeWithouEuro

    }

    /**
   * Method to get current date
   */
    async getCurrentDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        return today = dd + '/' + mm + '/' + yyyy;

    }
    /**
  * Method to get expected date
  */
    async getDateInReceipt() {
        return await elementUtil.getElementText(this.DATE_RECEIPT)

    }
    /**
 * Method to select retain selection checkbox
 */
    async selectRetainCheckbox() {
        return await elementUtil.clickOnElement(this.RETAIN_CHECKBOX)

    }
    /**
* Method to close betslip receipt
*/
    async closeBetslipReceipt() {
        return await elementUtil.clickOnElement(this.CLOSE_RECEIPT)

    }

}
module.exports = new BetslipPage();