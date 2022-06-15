const {baseURL, email, password} = require('../config');
const helper = require('./browser');
const selector = require('./selectors');

const action = {
  navigateToPage: function() {
    return this.driver.get(baseURL);
  },
  enterInput: function(text, inputField) {
    const itemSelector = selector[inputField];
    const mapText = {
    	'<email>': email,
        '<password>': password
    };
    const value = mapText[text] || text;
    return helper(this.driver).waitAndLocateByClassName(itemSelector).sendKeys(value);
  },
  click: async function(identifier) {
  	const itemSelector = selector[identifier];
    await helper(this.driver).waitAndLocateByXpath(itemSelector).click();
  },
  confirmUserId: async function() {
    await helper(this.driver).waitAndLocateByXpath(`//a[contains(@aria-label, "${email}")]`);
  },
  confirmPage: async function(route) {
    driver.wait(until.urlIs(baseURL+route));
  },
  confirmTextVisibility: async function(text) {
    return helper(this.driver).waitAndLocateByClassName(itemSelector).sendKeys(value);
  },
  confirmMultipleTextVisibility: async function(dataTable) {
  // convert cucumber dataTables to array of objects
    const arrayOfObjects = dataTable.hashes();
    const locateText = [];

    arrayOfObjects.forEach((value) => {
      const textArray = Object.values(value);
      const [text] = textArray;
      locateText.push(helper(this.driver).waitAndLocateByXpath(`//*[text()="${text}"]`));
    });

    await Promise.all(locateText);
  }
};

module.exports = action;