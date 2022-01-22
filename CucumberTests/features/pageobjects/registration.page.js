const Page = require('./page');
const elementUtil = require('../utils/elementUtil.page');
const faker = require('faker');
var pepArrayActual = []
let expectedOptions = ["I am not PEP", "I am PEP"]
/**
 * sub page containing specific selectors and methods for a specific page
 */
class RegistrationPage extends Page {

  getXpathForTitle = (Title) => {
    return ("//label[normalize-space()='" + Title + "']");
  }

  async Title(title) { return $("//label[normalize-space()='" + title + "']") }


  /**
   * define selectors using getter methods for personal information section
   */

  get JOINNOW_LINK() {
    return $("//span[@class='sc-1z0laxe-3 fNpEbk']")
  }
  get FIRST_NAME_TXT() {
    return $("//input[@data-test='first-name']")
  }
  get LAST_NAME_TXT() {
    return $("//input[@data-test='last-name']")
  }
  get MOBILE_NUMBER_TXT() {
    return $("//input[@type='number']")
  }

  get DAY_DROPDOWN() {
    return $("//div[contains(text(),'Day')]")
  }
  get MONTH_DROPDOWN() {
    return $("//div[contains(text(),'Month')]")
  }

  get YEAR_DROPDOWN() {
    return $("//div[contains(text(),'Year')]")
  }

  get CONTINUE_BTN() {
    return $("//button[normalize-space()='Continue']")
  }
  /**
   * define selectors using getter methods for Account  section
   */
  get EMAIL_LBL() {
    return $("//div[contains(text(),'Email*')]")
  }

  get EMAIL_TXT() {
    return $("//input[@data-test='email-id']")
  }
  get USERNAME_TXT() {
    return $("//input[@name='username']")
  }
  get PASSWORD_TXT() {
    return $("//input[@data-test='pass-word']")
  }
  get TERMS_CHKBOX() {
    return $("//input[@id='termsAndConditionsOne']")
  }
  get COMPLETE_BTN() {
    return $("//button[normalize-space()='Complete']")
  }

  get REGISTRATIONCOMPLETE_LBL() {
    return $("//h5[normalize-space()='Registration Complete']")
  }
  get REGISTRATIONCOMPLETE_MESSAGE() {
    return $("//p[contains(text(),'Welcome to JenningsBet! You’ve come to the right p')]")
  }

  get DEPOSITCASH_BTN() {
    return $("//button[normalize-space()='Deposit Cash']")
  }
  get CLOSE_BTN() {
    return $("//button[normalize-space()='CLOSE']")
  }

  /**
   * Opens the Registration Screen
   */
  async openRegistrationScreen() {
    await elementUtil.clickOnElement(await this.JOINNOW_LINK);
  }
  /**
    * Select the title
    */
  async selectTitle(title) {
    await elementUtil.clickOnElement(this.Title(title));
  }
  async enterPersonalInformation() {
    let MOBILE = await elementUtil.generateRandomNumber()
    await elementUtil.setElementValue(this.FIRST_NAME_TXT, faker.name.firstName())
    await elementUtil.setElementValue(this.LAST_NAME_TXT, faker.name.lastName());
    await elementUtil.setElementValue(this.MOBILE_NUMBER_TXT, MOBILE)
    await browser.pause(3000)
  }
  async selectDateOfBirth() {
    await browser.pause(2000)
    await elementUtil.clickOnElement(this.DAY_DROPDOWN)
    await browser.keys("\ue004");
    await elementUtil.clickOnElement(this.MONTH_DROPDOWN)
    await browser.keys("\ue004");
    await elementUtil.clickOnElement(this.YEAR_DROPDOWN)
    await browser.keys("\ue004");
  }
  /**
       * Click on continue button
       */
  async clickOnContinue() {
    await elementUtil.clickOnElement(this.CONTINUE_BTN);
    browser.pause(2000)
  }
  /**
    * 
    * @returns a random email address
    */
  async generateRandomEmail() {
    return await elementUtil.generateRandomString() + "@gmail.com"
  }

  /**
   * 
   * @returns a random username
   */
  async generateRandomUserName() {
    return await elementUtil.generateRandomString() + "Automation"
  }

  async enterAccountInformation() {
    let EMAIL = await this.generateRandomEmail()
    let USERNAME = await this.generateRandomUserName()
    await elementUtil.setElementValue(this.EMAIL_TXT, EMAIL)
    await elementUtil.setElementValue(this.USERNAME_TXT, USERNAME)
    await elementUtil.setElementValue(this.PASSWORD_TXT, "Automation123")
  }

  async clickOnTermsAndCondition() {
    await elementUtil.clickOnElement(this.TERMS_CHKBOX);
    browser.pause(2000)
  }

  async clickOnComplete() {
    await elementUtil.clickOnElement(this.COMPLETE_BTN);
    browser.pause(2000)
  }
  async getSuccessfulRegistrationText() {
    return await elementUtil.getElementText(this.REGISTRATIONCOMPLETE_LBL);

  }
  async clickOnDepositCash() {
    await elementUtil.clickOnElement(this.DEPOSITCASH_BTN)

  }

}
module.exports = new RegistrationPage();