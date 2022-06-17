const { When, Then, After, Given } = require('cucumber');
const assert = require('assert');
const { Builder, By, until, Browser } = require('selenium-webdriver');


Given('I am on the {string} route', function(route: string): void {
    this.driver = new Builder()
        .forBrowser("geckodriver")
        .build();
 
    this.driver.wait(until.elementLocated(By.tagName('h4')));
 
    // await this.driver.get('http://localhost:3000'+ route);
    this.driver.get('http://localhost:3000'+ route);
});
 
When('loggin with the credencials {string} and {string}', function(email: string,password: string): void {
    this.deriver.findElements(By.name('email')).sendKeys(email);
    this.deriver.findElements(By.name('password')).sendKeys(password);
    this.deriver.findElements(By.className('button is-primary is-outlined is-pulled-right')).click();
    
});
 
Then('I expect to be on the {string} route', function(route: string): void {
    this.driver.wait(until.elementLocated(By.tagName('h4')));
 
    // await this.driver.get('http://localhost:3000'+ route);
    this.driver.get('http://localhost:3000'+ route);
});
 
After(async function() {
    this.driver.close();
});