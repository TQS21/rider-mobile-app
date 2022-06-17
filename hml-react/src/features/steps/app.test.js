const {Given, When, Then} = require('cucumber');
const {
  navigateToPage,
    enterInput,
    confirmPage,
} = require('../common/action');

Given('I am on the HomePage' , navigateToPage);


When('loggin with the credencials {string} and {string}', enterInput );

Then('I expect to be on the {string} route', confirmPage);



/* Then(/^the user should see the following .*$/, confirmMultipleTextVisibility);

When(/^the user clicks on '(.*)' .*$/, click);

When ('the user enters {string} into the {string} field', enterInput);

Then(/^the user should see '(.*)' .*$/, confirmTextVisibility);

Then('the user should see the Google Account used to sign in to the email', confirmUserId); */