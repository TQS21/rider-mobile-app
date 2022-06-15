Feature: Log in
 
    Scenario: Log in as a user
        Given I am on the Home page
        When loggin with the credencials 'costav689@gmail.com' and 'asdfqwer'
        Then I expect to be on the 'deliveries' page

    Scenario: Accept delivery in deliveries page
        Given I am on the Home page
        When loggin with the credencials 'costav689@gmail.com' and 'asdfqwer'
        Then I expect to be on the page 'deliveries'
        When i accept the delivery with the name 'brownies'
        Then I expect to be on the page 'currentJob' 
        And see the product name 'brownies'


    Scenario: See delivery details page
        Given I am on the Home page
        When loggin with the credencials 'costav689@gmail.com' and 'asdfqwer'
        Then I expect to be on the page 'deliveries'
        When i click on details of the delivery with the name 'brownies'
        Then I expect to be on the page 'Specification' 
        And see the product name 'brownies'


    Scenario: Accompish a job
        Given I am on the Home page
        When loggin with the credencials 'costav689@gmail.com' and 'asdfqwer'
        Then I expect to be on the page 'deliveries'
        When i accept the delivery with the name 'brownies'
        Then I expect to be on the page 'currentJob'
        And see the product named 'brownies'
        When I accompish the job
        Then I expect to be on the 'deliveries' page


    Scenario: logout as a user
        Given I am on the Home page
        When loggin with the credencials 'costav689@gmail.com' and 'asdfqwer'
        Then I expect to be on the page 'deliveries'
        When I click on logout
        Then I expect to be on the 'login' page
