const { Given, When, Then } = require('@wdio/cucumber-framework');

const LoginPage = require('../pageobjects/login.page');
const BankingPage = require('../pageobjects/banking.page');
const RegistrationPage = require('../pageobjects/registration.page')
const Constants = require('../constants');
const AccountPage = require('../pageobjects/account.page');
const HomePage = require('../pageobjects/home.page');
const { refreshBrowser } = require('../pageobjects/registration.page');

Given('user is on login page of jennings', async function () {
  await LoginPage.openURL()
  await LoginPage.openLoginScreen()

});

When('user enters Username {string} and Password as {string} and clicks on login button', async function (username, password) {
  await LoginPage.login(username, password)
  await browser.pause(2000)
});

Then('verify whether deposit button is displayed in screen', async function () {

  await expect(HomePage.DEPOSIT_BTN).toBeDisplayed()
});
Then('verify the user profile and balance displayed in page', async function () {
  await expect(HomePage.ACCOUNT_ICON).toBeDisplayed()
  await HomePage.clickOnAccountIcon()
  await expect(AccountPage.LOGGEDIN_ACCOUNTNAME).toBeDisplayed()
  await expect(HomePage.USERBALANCE).toBeDisplayed()
});