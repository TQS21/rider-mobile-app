const {By, until} = require('selenium-webdriver');
const {timeout} = require('../config');

function browser(driver){
  function waitAndLocateByClassName(selector){
    return driver.wait(until.elementLocated(By.className(selector)), timeout);
  }
  
  function waitAndLocateByXpath(selector){
    return driver.wait(until.elementLocated(By.xpath(selector)), timeout);
  }

  return {
    waitAndLocateByClassName,
    waitAndLocateByXpath
  };
}

module.exports = browser;