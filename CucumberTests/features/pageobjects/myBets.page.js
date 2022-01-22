const Page = require('./page');
const constants = require('../constants');
const elementUtil = require('../utils/elementUtil.page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MyBet extends Page {
    get CASHOUT_LNK() {
        return $("//*[contains(text(),'Cashout')]")
      }
      //Cashout elements
    get CASHOUT_BTN(){
        return $("//button[@class='sc-1sz7x3e-7 sc-aovhqv-3 ebtGhy eSwqeh']")
    }  
    get CONFIRMCASHOUT_BTN(){
        return $("//button[@class='sc-1sz7x3e-7 sc-aovhqv-3 eIVQWX gEctKT']")
    }
    get CLOSE_BTN(){
        return $("//button[normalize-space()='X']")
    }
    get CASHOUT_SUCCESS_MSG(){
        return $("//div[@class='sc-1vii5sb-5 cKHzXs']")
    }
    get CASHOUT_SUCCESS_MSG(){
        return $("//div[@class='sc-1vii5sb-5 cKHzXs']")
    }
    get CASHOUT_SUCCESS_AMOUNT(){
        return $("//div[@class='sc-1vii5sb-4 exIlDH']")
    }
    get CLOSE_BTN(){
        return $("//div[@class='sc-1vii5sb-6 sc-11ytozr-1 ewCwmx ctelyR']")
    }
    get CASHOUT_AMOUNT(){
        return $("//div[@class='sc-1vii5sb-4 exIlDH']")
    }



async clickOnCashout(){
    await elementUtil.clickOnElement(this.CASHOUT_LNK)
}

async clickOnCashoutButton(){
    await elementUtil.clickOnElement(this.CASHOUT_BTN)
}
async getCashoutBtnText(){
  return  await elementUtil.getElementText(this.CASHOUT_BTN)
}
async getConfirmCashoutBtnText(){
    return  await elementUtil.getElementText(this.CONFIRMCASHOUT_BTN)
  }
  async clickOnCloseBtn(){
   await elementUtil.clickOnElement(this.CLOSE_BTN)
  }
  async clickOnConfirmBtn(){
    await elementUtil.clickOnElement(this.CONFIRMCASHOUT_BTN)
   }
   async cashoutSuccessfulMsg(){
    return  await elementUtil.getElementText(this.CASHOUT_SUCCESS_MSG)
  }
  async getCashoutAmount(){
    return  await elementUtil.getElementText(this.CASHOUT_AMOUNT)
  }


}

module.exports = new MyBet();