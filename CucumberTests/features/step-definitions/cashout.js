const { Given, When, Then } = require('@wdio/cucumber-framework');

const LoginPage = require('../pageobjects/login.page');
const BankingPage = require('../pageobjects/banking.page');
const RegistrationPage = require('../pageobjects/registration.page')
const Constants = require('../constants');
const AccountPage = require('../pageobjects/account.page');
const HomePage = require('../pageobjects/home.page');
const { refreshBrowser } = require('../pageobjects/registration.page');
const EventPage = require('../pageobjects/event.page');
const BetSlip = require('../pageobjects/betslip.page');
const MyBet = require('../pageobjects/myBets.page');
const { navigateToMyBets } = require('../pageobjects/login.page');

var balanceBeforePlacingBet;

Given('user logged in to the application for validating cashout',async function () {
   await LoginPage.openURL()
  await LoginPage.openLoginScreen()
  await LoginPage.login(Constants.USERNAME,Constants.PASSWORD)
  await browser.pause(2000) 
});


When('user placed a bet to cashout',async function () {
  await HomePage.clickOnMoreSports()
  await browser.pause(1000)
  await HomePage.selectFromSideMenu(HomePage.SOCCER_SPORT_LNK)
  await browser.pause(2000)
  await EventPage.ClickOnUpcoming()
  await browser.pause(2000)
  await EventPage.addOddtoBetSlip()
  await browser.pause(2000)
  await BetSlip.enterStakeAmount(Constants.STAKE_MIN)
  await BetSlip.clickOnPlaceButton()
  await browser.pause(2000)    
});


When('Navigate to My Bets section through account icon',async function () {
  balanceBeforePlacingBet = await HomePage.getUserActiveBalance()
  console.log("balanceBeforePlacingBet" + balanceBeforePlacingBet)
  await HomePage.clickOnAccountIcon()
  await AccountPage.clickOnMyBet()
  await browser.pause(1000)
});



When('Click on cashout menu',async function () {
 await MyBet.clickOnCashout()
});



When('Click on cashout button and perform cashout functionality',async function () {
 await MyBet.clickOnCashoutButton()
 await expect(MyBet.CONFIRMCASHOUT_BTN).toBeDisplayed()
 await browser.pause(1000)
 await MyBet.clickOnConfirmBtn()
 browser.pause(3000)
 
 
});


Then('verify the successful cashout message displayed in popup',async function () {
  var cashoutMsg=await MyBet.cashoutSuccessfulMsg()
  await expect(cashoutMsg).toBe(Constants.CASHOUT_MSG)
  await browser.pause(2000)
  
});


Then('verify the account balance update after cashout',async function () {
 var CashoutAmountWithEuro=await MyBet.getCashoutAmount()
 var CashoutAmount= parseFloat(CashoutAmountWithEuro.toString().slice(1))
 console.log("CashoutAmount"+CashoutAmount)
 await MyBet.clickOnCloseBtn()
 var accountBalanceAfterCashout_Calculated=balanceBeforePlacingBet+CashoutAmount
 var accountBalanceAfterCashout= (accountBalanceAfterCashout_Calculated.toFixed(2))
 console.log("accountBalanceAfterCashout"+accountBalanceAfterCashout)
 accountBalanceFromHome = await HomePage.getUserActiveBalance()
 console.log("accountBalanceFromHome" + accountBalanceFromHome)
 await expect(accountBalanceAfterCashout).toBe(""+accountBalanceFromHome) 
});
