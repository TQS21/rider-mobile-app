package com.example.demo.login;


import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.cucumber.java.en.And;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
// import org.junit.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

// import static org.junit.Assert.*;
// import static org.hamcrest.CoreMatchers.*;

import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.chrome.ChromeDriver;

import io.github.bonigarcia.seljup.SeleniumJupiter;

@ExtendWith(SeleniumJupiter.class)
public class LoginSteps {

    private WebDriver driver;
	private String baseUrl= "http://localhost:3000/";

/* 	@BeforeEach
	public void setUp() throws Exception {
    System.setProperty("webdriver.gecko.driver", "/usr/local/bin/geckodriver");

    driver = new FirefoxDriver();
    baseUrl = "http://localhost:3000";
    driver.manage().timeouts();//.implicitlyWait(30, TimeUnit.SECONDS);
	} */

    @Given("I am on the Home page")
    public void start_on_page() {
        System.setProperty("webdriver.gecko.driver", "/usr/local/bin/geckodriver");
        driver = new FirefoxDriver();
        driver.manage().timeouts();
		driver.get(baseUrl);
    }

    @Given("I am on the {string} page")
    public void go_to_page(final String url) {
        System.out.println(baseUrl+url);
        System.out.println(driver.getCurrentUrl());
		assertEquals(baseUrl+url, driver.getCurrentUrl());
    }
    @When("loggin with the credencials {string} and {string}")
    public void loggin_with_credencials(final String email, final String password) {
        // Write code here that turns the phrase above into concrete actions
        //System.out.println("I wait "+int1+" hour");
        driver.findElement(By.name("email")).click();
		driver.findElement(By.name("email")).clear();
		driver.findElement(By.name("email")).sendKeys("costav689@gmail.com");

		driver.findElement(By.name("password")).click();
		driver.findElement(By.name("password")).clear();
		driver.findElement(By.name("password")).sendKeys("asdfqwer");

        driver.findElement(By.xpath("//body")).click();
		driver.findElement(By.xpath("//div[@id='root']/div/form/div/div/div[3]/button")).click();

    }


    @When("i accept the delivery with the name {string}")
    public void accept_job(final String delivery) {
        // Write code here that turns the phrase above into concrete actions
        //System.out.println("I wait "+int1+" hour");

		driver.findElement(By.xpath("//*[contains(text(),'"+delivery+"')]/div/a/button")).click();

    }


    @When("i click on details of the delivery with the name {string}")
    public void details_product(final String delivery) {
        // Write code here that turns the phrase above into concrete actions
        //System.out.println("I wait "+int1+" hour");

        driver.findElement(By.xpath("//*[contains(text(),'"+delivery+"')]/div/a[2]/button")).click();

    }

    @When("I accompish the job")
    public void job_done() {
        // Write code here that turns the phrase above into concrete actions
        //System.out.println("I wait "+int1+" hour");

		driver.findElement(By.xpath("//div[@id='root']/div/main/div/button")).click();

    }

    @When("I click on logout")
    public void log_out() {
        // Write code here that turns the phrase above into concrete actions
        //System.out.println("I wait "+int1+" hour");

		driver.findElement(By.linkText("Logout")).click();

    }

    @Then("I expect to be on the {string} page")
    public void assert_page_url_end(final String route) {
        // Write code here that turns the phrase above into concrete actions
        //System.out.println("my belly should growl");

		assertEquals(baseUrl+route, driver.getCurrentUrl());
        driver.quit();

    }


    @Then("I expect to be on the page {string}")
    public void assert_page_url(final String route) {
        // Write code here that turns the phrase above into concrete actions
        //System.out.println("my belly should growl");

		assertEquals(baseUrl+route, driver.getCurrentUrl());

    }
        
    @And("see the product name {string}")
    public void assert_product_name_quit(final String name) {
        // Write code here that turns the phrase above into concrete actions
        //System.out.println("my belly should growl");
        String product_name = driver.findElement(By.xpath("//div[@id='root']/div/main/div/div/h1")).getText();
		assertEquals(name.equals(product_name), true);
        driver.quit();

    }
    @And("see the product named {string}")
    public void assert_product_name(final String name) {
        // Write code here that turns the phrase above into concrete actions
        //System.out.println("my belly should growl");
        String product_name = driver.findElement(By.xpath("//div[@id='root']/div/main/div/div/h1")).getText();
		assertEquals(name.equals(product_name), true);

    }

}