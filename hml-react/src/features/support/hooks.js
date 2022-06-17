const {Before, After} = require('cucumber');

Before(function() {
  return this.driver.manage().window().maximize();
});

After(function() {
  return this.driver.quit();
});