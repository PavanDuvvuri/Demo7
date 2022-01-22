const Page = require('./page');
const elementUtil = require('../utils/elementUtil.page');
//const { waitUntil } = require('../utils/elementUtil.page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  get LOGIN_LNK() {
    return $("//span[@class='sc-1z0laxe-1 sc-m7ygur-1 dCrMGh dcnWdm']")
  }

  get USERNAME_TXT() {
    return $("//input[@type='text']")
  }
  get PASSWORD_TXT() {
    return $("//input[@type='password']")
  }
  get LOGIN_SUBMIT_BTN() {
    return $("//button[normalize-space()='Log In']")
  }


  /* get inputEmail() {
    return $('//input[@id="userName"]')
  }
  get inputPassword() {
    return $('//input[@id="password"]')
  }
  get btnSubmit() {
    return $("//span[@class='button__value'][normalize-space()='Login']")
  }
  get LOGIN_LNK() {
    return $("//div[@class='header-auth__account-item js-login-btn']")
  }
  get LOGIN_SCREEN() {
    return $("//div[@class='quick-login-header']//span[contains(text(),'Login')]")
  }
  get COOCKIEBANNERCLOSE_BTN() {
    return $("//button[@class='cookie-policy-accept-button']")
  }
  get SIGN_UP_BUTTON() {
    return $("//button[contains(@class,'join-now-btn')]")
  }
  get ACCOUNT_NAME() {
    return $("//div[@class='account-name ']")
  }
  get USER_BALANCE() {
    return $("//div[@class='balance-container js-info-popup']/span")
  }
  get MYBET_LNK() {
    return $("//*[@id='headerAuthenticationApp']//li[@class='account-links']//a[normalize-space()='My Bets']")
  }
  get CASHOUT_BTN() {
    return $("//*[@id='grouped-region']//div[6]/button[1]")
  }
  get CASHOUT_AMOUNT() {
    return $("//*[@id='grouped-region']//div[6]/button[1]/span/strong")
  }
  get CASHOUT_POPUP_BTN() {
    return $("//*[@id='cashout-popup-cover']/div/div[2]/button/span[2]")
  }

  get EYE_BUTTON() {
    return $('div.js-password-eye');
  }

  get CANCEL_BUTTON() {
    return $(`[id="cancelBtn"]`);
  }

  get ERROR_MSG() {
    return $('div.error-container.error  div');
  } */

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async login(Username, Password) {
    await elementUtil.waitUntil(this.USERNAME_TXT)
    //  await elementUtil.waitUntil(this.btnSubmit)
    await elementUtil.setElementValue(this.USERNAME_TXT, Username)
    await elementUtil.setElementValue(this.PASSWORD_TXT, Password)
    await elementUtil.clickOnElement(this.LOGIN_SUBMIT_BTN)
    //this.closeCookiePolicyBanner()
    //await elementUtil.waitUntil(this.ACCOUNT_NAME)
    // console.log("Error occured while login into the application")
    // this.clickCloseOnKYCPopUp()

  }


  /**   
   * clicks on Login button on the homapge and opens login screen
   * @param login_Lnk 
   */
  async openLoginScreen() {
    await elementUtil.clickOnElement(this.LOGIN_LNK);
    // await (await this.LOGIN_LNK).click();
  }

  async clickSignUpButton() {
    await elementUtil.clickOnElement(this.SIGN_UP_BUTTON)
  }

  /**
   * Gets the user balance after login
   */
  async getUserBalance() {
    var Balance = await elementUtil.getElementText(this.USER_BALANCE)
    return Balance.slice(1, Balance.length)
  }

  /**
   * Navigate to Mybets page
   */
  async navigateToMyBets() {
    elementUtil.clickOnElement(this.ACCOUNT_NAME)
    elementUtil.clickOnElement(this.MYBET_LNK)
  }

  /**
   * Clicks on Cashout
   */
  async getCashoutAmount() {
    var amount = elementUtil.getElementText(this.CASHOUT_AMOUNT)
    return amount.slice(1, amount.length)
  }

  /**
   * overwrite specifc options to adapt it to page object
   */
  open() {
    return super.open('login');
  }

  /**
   * overwrite specifc options to adapt it to page object
   */
  async openURL() {
    await super.open('sportsbook/');
    await browser.pause(3000)
    await super.maximizeBrowser()
    await browser.pause(6000)
    //await super.refreshBrowser()
    this.closeCookiePolicyBanner()

  }

  /**
   * Checks for the cookie banner on home page and closes if it is displayed
   * @param {closes cookie policy banner on the home page} login_Lnk 
   */
  async closeCookiePolicyBanner() {
    if (this.COOCKIEBANNERCLOSE_BTN.isDisplayed()) {
      await elementUtil.clickOnElement(this.COOCKIEBANNERCLOSE_BTN)
    }
  }

  /**   
   * clicks on Login button on the homapge and opens login screen
   * @param login_Lnk 
   */
  async openLoginScreen(login_Lnk) {
    await elementUtil.clickOnElement(this.LOGIN_LNK);
    // await (await this.LOGIN_LNK).click();
  }

  async clickSignUpButton() {
    await elementUtil.clickOnElement(this.SIGN_UP_BUTTON)
  }

  /**
   * Gets the user balance after login
   */
  async getUserBalance() {
    var Balance = await elementUtil.getElementText(this.USER_BALANCE)
    return Balance.slice(1, Balance.length)
  }

  async waitUntilPriceChange(userbalance) {
    await this.USER_BALANCE.waitUntil(async function () {
      return (await this.getText()) !== userbalance
    }, {
      timeout: 30000,
      timeoutMsg: 'User balance not changed after 20sec'
    });

  }
  /**
   * Navigate to Mybets page
   */
  async navigateToMyBets() {
    await elementUtil.clickOnElement(this.ACCOUNT_NAME)
    await elementUtil.clickOnElement(this.MYBET_LNK)
  }

  /**
   * Clicks on Cashout
   */
  async getCashoutAmount() {
    var amount = elementUtil.getElementText(this.CASHOUT_AMOUNT)
    return amount.slice(1, amount.length)
  }

  /**
   * clicks on cashout button
   */
  async clickOnCashOut() {
    await elementUtil.clickOnElement(this.CASHOUT_BTN)
    await elementUtil.clickOnElement(this.CASHOUT_POPUP_BTN)
  }

  //clicks close icon on KYC upload popup
  clickCloseOnKYCPopUp() {
    if (elementUtil.IsElementDisplayed(this.CLOSE_KYC_POPUP)) {
      elementUtil.clickOnElement(this.CLOSE_KYC_POPUP)
    }
  }

  async clickSignupFromLoginPopUp() {
    await this.openLoginScreen();
    await this.clickSignUpButton();
  }

  async navigateTo() {
    await super.open('sportsbook/');
    await browser.pause(3000)
    await super.maximizeBrowser()
    await browser.pause(6000)
  }

  async enterEmailAndPassword(Email, password) {
    await elementUtil.waitUntil(this.Email)
    await elementUtil.waitUntil(this.btnSubmit)
    await elementUtil.setElementValue(this.inputEmail, Email)
    await elementUtil.setElementValue(this.inputPassword, password)
  }

  async clickEyeButton() {
    await elementUtil.waitUntil(this.EYE_BUTTON)
    await elementUtil.clickOnElement(this.EYE_BUTTON);
  }

  async retreivePasswordAttributeValue(propertyName) {
    return elementUtil.getAttributeValue(this.inputPassword, propertyName);
  }

  async clickCancelButton() {
    await elementUtil.clickOnElement(this.CANCEL_BUTTON);
  }

  async clickLoginButton() {
    await elementUtil.clickOnElement(this.btnSubmit)
  }
}
module.exports = new LoginPage();