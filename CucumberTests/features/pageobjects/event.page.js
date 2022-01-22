const Page = require('./page');
const elementUtil = require('../utils/elementUtil.page');
const faker = require('faker');
const constants = require('../constants');
/**
 * sub page containing specific selectors and methods for a specific page
 */
class EventPage extends Page {

  getXPathForOddsToPlaceBetLabel(num) {
    return ("//*[@class='sc-1ycborg-0 sc-niz7qs-0 eIzVHD hgFoV']/div[" + num + "]/div[2]/button[1]");

  }
  getXPathForFirstPlayer(num) {
    return ("//div[@class='sc-1ycborg-0 sc-niz7qs-0 eIzVHD hgFoV']/div[" + num + "]/div[1]/a/p[1]/span[1]");

  }
  get ODDS_BUTTON() { return $(this.getXPathForOddsToPlaceBetLabel(constants.PLACEBET_DIV_NUM)) }
  get FIRSTPLAYERNAME() {
    return $(this.getXPathForFirstPlayer(constants.PLACEBET_DIV_NUM))
  }
  get UPCOMING_LNK() {
    return $("//a[@title='Upcoming']")
  }


  async ClickOnUpcoming() {
    await elementUtil.clickOnElement(this.UPCOMING_LNK)
  }
  async addOddtoBetSlip() {
    await elementUtil.clickOnElement(this.ODDS_BUTTON)
  }
  async getFirstPlayerNameFromEventPage() {
    return await elementUtil.getElementText(this.FIRSTPLAYERNAME)
  }

}
module.exports = new EventPage();