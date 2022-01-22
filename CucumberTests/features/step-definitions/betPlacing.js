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


var userEnteredStakeDisplayedInBottom
var returnsDisplayedInBottom
var balanceBeforePlacingBet
var playerNameInEventPage
Given('user is logged in and navigates to event page for soccer sport', async function () {
  await LoginPage.openURL()
  await LoginPage.openLoginScreen()
  await LoginPage.login(Constants.USERNAME, Constants.PASSWORD)
  await browser.pause(2000)
  await HomePage.clickOnMoreSports()
  await browser.pause(1000)
  await HomePage.selectFromSideMenu(HomePage.SOCCER_SPORT_LNK)
  await browser.pause(2000)
  await EventPage.ClickOnUpcoming()
  await browser.pause(2000)
  playerNameInEventPage = await EventPage.getFirstPlayerNameFromEventPage()
  console.log("playerNameInEventPage" + playerNameInEventPage)
  

});

When('user adds odd from the soccer page to betslip', async function () {
  await EventPage.addOddtoBetSlip()
  await browser.pause(2000)
});

When('user enters stakeamount on the betslip and user clicks on Bet Now button', async function () {
  await BetSlip.enterStakeAmount(Constants.STAKE_MIN)
});


Then('verify the return amount is displayed and it is equal to the return amount displayed in bottom of betslip', async function () {
  await expect(BetSlip.RETURN_AMT_UPPER).toBeDisplayed()
  returnsDisplayedInBottom = await BetSlip.getReturns_Bottom()
  await expect(BetSlip.RETURN_AMT_UPPER).toHaveText(returnsDisplayedInBottom)
});



Then('verify the user entered stake amount and the stake amount displayed in bottom of betslip are same', async function () {
  userEnteredStakeDisplayedInBottom = await BetSlip.getTotalStake()
  var GetUserEnterdValueWithCurrancy = await BetSlip.getValueFromUserEnteredStake()
  await expect(userEnteredStakeDisplayedInBottom).toBe(GetUserEnterdValueWithCurrancy)
});


Then('verify the betcount displayed in betslip', async function () {
  await expect(await BetSlip.getBetCount()).toBe(Constants.SINGLEBET_COUNT_INBETSLIP)
  var num = await HomePage.getUserActiveBalance()
  console.log("balance" + num)
});


Then('click on Placebet button', async function () {
  balanceBeforePlacingBet = await HomePage.getUserActiveBalance()

  await BetSlip.clickOnPlaceButton()
  await browser.pause(2000)
});

Then('verify the elements displayed in bet receipt after successfull bet placing', async function () {
  await expect(BetSlip.RECEIPT).toBeDisplayed()
  var actualDateInReceipt = (await BetSlip.getDateInReceipt()).slice(0, 10)
  await expect(actualDateInReceipt).toBe(await BetSlip.getCurrentDate())
  await expect(BetSlip.STAKE_RECEIPT).toHaveText(userEnteredStakeDisplayedInBottom)
  await expect(BetSlip.RETURNS_RECEIPT).toHaveText(returnsDisplayedInBottom)
  await expect(playerNameInEventPage).toBe(await BetSlip.getPlayerName())

});

Then('verify the account balance updating after successfull bet placing', async function () {
  var stakeWithoutEurovalue = await BetSlip.stakeValueWithoutEuro()
  console.log("balanceBeforePlacingBet" + balanceBeforePlacingBet)
  console.log("stakeWithoutEurovalue" + stakeWithoutEurovalue)
  var updatedUserBalance = parseFloat(balanceBeforePlacingBet - parseFloat(stakeWithoutEurovalue))
  console.log("updatedUserBalance" + updatedUserBalance)
  await expect(updatedUserBalance).toBe(await HomePage.getUserActiveBalance())

});

Then('Verify that the user is able to retain selections in bet receipt',async function () {
  await BetSlip.selectRetainCheckbox()
  await BetSlip.closeBetslipReceipt()
  await browser.pause(2000)
  await expect(await BetSlip.RETAINEDPLAYERNAME).toHaveText(playerNameInEventPage)
});