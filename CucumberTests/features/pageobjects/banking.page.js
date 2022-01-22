



const Page = require('./page');
const elementUtil = require('../utils/elementUtil.page');
const faker = require('faker');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class BankingPage extends Page {

  get DEPOSIT() {
    return $("//div[@class='sc-16u2hm9-2 sc-4dbw69-2 hFqnQz gKBbii']//span[contains(text(),'Deposit')]")
  }



}
module.exports = new BankingPage();