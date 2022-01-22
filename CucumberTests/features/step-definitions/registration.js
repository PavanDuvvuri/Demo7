const { Given, When, Then } = require('@wdio/cucumber-framework');

const LoginPage = require('../pageobjects/login.page');
const BankingPage = require('../pageobjects/banking.page');
const RegistrationPage = require('../pageobjects/registration.page')
const Constants = require('../constants');
const AccountPage = require('../pageobjects/account.page');
const HomePage = require('../pageobjects/home.page');
// Scenaro for both Valid Registration and Valid Registration from Login Page

Given('user is on Registration Screen launched from Signup button on Homepage for registration validation in jennings', async function () {
  console.log("Anjana try")
  await LoginPage.openURL()
  await browser.pause(6000)
  // await $("//span[@class='sc-1z0laxe-3 fNpEbk']").click()
  await RegistrationPage.openRegistrationScreen()
  browser.pause(2000);
});
When('select the title {string}', async function (title) {
  await RegistrationPage.selectTitle(title)
});
When('Fill the personal Details and select date of birth in Registration Form and Click on Continue Button for signup in jennings', async function () {
  await RegistrationPage.enterPersonalInformation()
  await RegistrationPage.selectDateOfBirth()
  await RegistrationPage.clickOnContinue()
  //await $("//div[contains(text(),'3')]").click()
  //await browser.setValue('input', ['CTRL', 'A'])
  //await browser.keys(['CTRL', 'A'])
  //await browser.keys("\ue004"); 
  await browser.pause(2000);
  await expect(RegistrationPage.EMAIL_LBL).toBeDisplayed()

});


When('Fill the Account details and click on complete button', async function () {
  await RegistrationPage.enterAccountInformation()
  await RegistrationPage.clickOnTermsAndCondition()
  await RegistrationPage.clickOnComplete()
  await browser.pause(2000);
  await expect(RegistrationPage.REGISTRATIONCOMPLETE_LBL).toBeDisplayed()

});
Then('Verify that {string} is displayed', async function (succesfulRegistrationTxt) {
  await expect(RegistrationPage.REGISTRATIONCOMPLETE_LBL).toHaveText(succesfulRegistrationTxt);
});

Then('verify the message displayed in registration complete screen and buttons displyed in screen', async function () {
  await expect(RegistrationPage.REGISTRATIONCOMPLETE_MESSAGE).toHaveTextContaining(Constants.REGISTRATIONCOMPLETE_MSG)
  await expect(RegistrationPage.DEPOSITCASH_BTN).toBeDisplayed()
  await expect(RegistrationPage.CLOSE_BTN).toBeDisplayed()
});

//  browser.navigateTo("https://jenningsbet.preprod.fsbtech.com/my-account/?tab=banking")
Then('verify the functionality of Deposit Cash button', async function () {
  RegistrationPage.clickOnDepositCash()
  await browser.pause(1000)
  await expect(BankingPage.DEPOSIT).toBeDisplayed()
});

Then('verify user is logged in', async function () {
  await browser.pause(1000)
  await expect(HomePage.ACCOUNT_ICON).toBeDisplayed()
  await HomePage.clickOnAccountIcon()
  await expect(AccountPage.LOGGEDIN_ACCOUNTNAME).toBeDisplayed()
});
