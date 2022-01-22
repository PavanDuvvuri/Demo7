const constants = require("../constants");


class elementUtil {

    //returns true if element is displayed
    async IsElementDisplayed(element) {
        element.waitForDisplayed({ timeout: 3000 })
        return await (await element).isDisplayed()
    }
    //Verifies whether the element is clickable or not
    async IsElementClickable(element) {
        if (this.IsElementDisplayed) {
            return await (await element).isClickable()
        } else
            console.log("Element not displayed")
    }
    //clicks on the given element
    async clickOnElement(element) {
        if (this.IsElementClickable) {
            return await (await element).click()
        } else
            console.log("Element not clickable")
    }
    /**
 * Waits until the element is clickable for specific time
 */

    async waitForElementClickable(ele) {
        await ele.waitForClickable({ timeout: 6000 })
    }

    //Inputs the given value into the textfield
    async setElementValue(element, value) {
        await (await element).setValue(value)
    }

    //returns the text of the element
    async getElementText(element) {
        return await (await element).getText()
    }
     //returns the text of the element with index
     async getElementTextWithIndex(element,index) {
        return await (await element[index]).getText()
    }

    //Explicitly waits until the home page is loaded using waitUntil method
    async getPageTitle(pageTitle) {
        browser.waitUntil(function () {
            return (browser.getTitle() == pageTitle)
        }, {
            timeout: 10000,
            timeoutMsg: 'Title is not displayed after the given time'
        });
        browser.pause(3000)
        return await (await browser).getTitle()
    }

    /**
     * Returns the attribue value of the element
     */
    async getAttributeValue(element, attr) {
        return await (await element).getAttribute(attr)
    }

    /**
     * Scrolls to the element
     */
    async scrollToElement(elem) {
        return await elem.scrollIntoView();
    }

    /**
     * Generates a random string
     */
    async generateRandomString() {
        return await Math.random().toString(36).substring(2, 11)
    }

    /**
     * 
     * @returns a random number
     */
    generateRandomNumber() {
        return Math.random().toString().slice(2, 12)
    }
    /**
     * Verifies if the checkbox is selected or not before clicking on the checkbox
     */
    async selectCheckbox(ele) {
        if (ele.isSelected()) {
            console.log("Checckbox is already selected")
        }
        else {
            return await ele.click()
        }
    }

    /**
     * Select from drop down using visibletext
     */
    async selectByVisibleTxt(ele, text) {

        await ele.selectByVisibleText(text)
    }

    /**
     * Select from drop down using element index
     */
    async selectByElementIndex(ele, index) {

        await ele.selectByIndex(index)
    }


    /**
     * Select from drop down using attribute value of the element
     */
    async selectByAttributeValueofElement(ele, attrname, value) {

        await ele.selectByAttributeValue(attrname, value)
    }

    /**
  * Move to element before clicking on it
  */
    async moveToElement(ele) {

        return await ele.moveTo()
    }

    async waitForElementExist(ele) {
        return await ele.waitForExist({ timeout: 5000 })
    }
    /**
     * Return true if element enabled
     */
    async isElementEnabled(element) {

        return await (await element).isEnabled()

    }
    /**
     * Return the value in text area
     */
    async getElementValue(element) {
        return await (await element).getValue()
    }
    /**
 * Wait until specefic condition satisfied
 */
    async waitUntil(element,condition) {
        browser.waitUntil(function () {
            return element.isDisplayed() === true
        }, 10000, 'Element is not displayed')
    }
    /**
 * Method to clear the value in text area
 */
  async clearValue(element)
  {
       element.waitForDisplayed()
       return await (await element).clearValue()
  }
   /**
 * Method to get atribute value
 */
    async getAtribute(element,atributeName)
    {
        return await (element).getAttribute(atributeName)
    }


}
module.exports = new elementUtil();