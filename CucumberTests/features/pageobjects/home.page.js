const Page = require('./page');
const constants = require('../constants');
const elementUtil = require('../utils/elementUtil.page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {

  /**
  * 
  * @param {*} countryName 
   * @returns xpath for the countryname
  */
  getXPathForCountry(countryName) {
    return ("//*[@id='484198376']//span[contains(normalize-space(),'" + countryName + "')]")
  }

  /*Returns the xPath for the given League 
     *Param: LegueName
    */
  getXPathForLeague(leagueName) {
    return ("//*[@id='484198376']/div/section[2]//div[@class='dsm-subcategory-title-container']/span[normalize-space()='" + leagueName + "']");
  }
  /**
  * //Returns the xPath for the given sport name
  * @param - name of the sport
  */
  getXPathForSportName(option) {
    return ("//section[@id='1462528891']//span[contains(normalize-space(),'" + option + "')]")
  }

  /**
  * //Returns the xPath for the firstevent
  * @param - options -> id of the first event   
  * @param - num -> enter 1 for the first player name and 2 for the second playername
  */
  getXPathForFirstEventPlayerName(option, num) {
    return ("//*[@id='" + option + "']//div[@class='js-child-container']/div[1]//a[@class='events-multi-market-app__name-container']/span[" + num + "]");
  }

  get DEPOSIT_BTN() { return $("//span[@class='sc-1z0laxe-2 sc-m7ygur-0 hZeZLE ffimml']") }

  get ACCOUNT_ICON() {
    return $("//i[@class='sc-2w6j3y-0 fIXusl icon-my-account']")
  }
  get USERBALANCE() {
    return $("//span[@class='sc-1z0laxe-1 sc-m7ygur-1 dCrMGh dcnWdm']")
  }
  //Sports locators
  get SOCCER_SPORT_LNK() {
    return $("//span[@id='elementSoccer']")
  }
  get MORE_SPORT_LNK() {
    return $("//span[normalize-space()='More Sports']")
  }

  async clickOnAccountIcon() {
    await elementUtil.clickOnElement(this.ACCOUNT_ICON)
  }
  /*
  * Get the User's balance from header of the site
  */
  async getUserActiveBalance() {

    var balance_with_euro = await elementUtil.getElementText(this.USERBALANCE)
    console.log("balance with euro", balance_with_euro)
    var balance = parseFloat(balance_with_euro.toString().slice(1))
    return balance
  }

  /*
  * Get the User's balance with euro from header of the site
  */
  async getUserActiveBalance_withEuro() {
    var balance_with_euro = await elementUtil.getElementText(this.USER_BAL)
    console.log("balance with euro", balance_with_euro)
    return balance_with_euro
  }


  /**
  * Click on a side menu options
  */
  async selectFromSideMenu(option) {
    await elementUtil.scrollToElement(option)
    await elementUtil.waitForElementClickable(option)
    await elementUtil.clickOnElement(option)
  }
  async clickOnMoreSports() {
    await elementUtil.scrollToElement(this.MORE_SPORT_LNK)
    await elementUtil.waitForElementClickable(this.MORE_SPORT_LNK)
    await elementUtil.clickOnElement(this.MORE_SPORT_LNK)
  }


  //Navigates to home page
  async navigeToHomePage() {
    await elementUtil.clickOnElement(this.PREMATCH_LNK)
  }

  async waitUntilResponsibleGamblingPopupClose() {

    await this.RESPONSIBLE_GAMBLING_TOAST.waitUntil(async function () {
      return (this.getText()) !== constants.RESPONSIBLE_GAMBLING_POPUP_TXT
    }, {
      timeout: 5000,
      timeoutMsg: 'Responsible Gambling popup displayed after 5s'
    });

  }


  /**
    * Method opens the profile menu
    * Param : 
    */

  async openProfileMenu() {
    await elementUtil.waitForElementClickable(this.PROFILE)
    await elementUtil.clickOnElement(this.PROFILE)
  }

  /**
 * Method to launch Account history screen
 * Param : 
 */

  async launchAccountHistoryScreen() {
    await elementUtil.waitForElementClickable(this.ACCT_HISTORY_MENU)
    await elementUtil.clickOnElement(this.ACCT_HISTORY_MENU)
  }


  /*
   * Get the User's balance with euro from header of the site
   */
  async getUserActiveBalance_withEuro() {

    var balance_with_euro = await elementUtil.getElementText(this.USER_BAL)
    console.log("balance with euro", balance_with_euro)

    return balance_with_euro

  }

}

module.exports = new HomePage();