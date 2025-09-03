package com.lakshan.ecowise.ui;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.aspectj.weaver.tools.cache.SimpleCacheFactory.path;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginUiTest {
    private WebDriver driver;
    private ChromeOptions options;

    public LoginUiTest() {
        this.options = new ChromeOptions();
        options.setBinary("/usr/bin/google-chrome"); // Path to Chrome binary
        this.driver = new ChromeDriver(options);
    }

    @BeforeEach
    public void setUp() {
        WebDriverManager.chromedriver().setup(); // Download the correct ChromeDriver version
        driver.get("http://localhost:5173/login");
    }

    @Test
    public void testLoginSuccess() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement emailField = driver.findElement(By.name("email"));
        emailField.sendKeys("kasun@gmail.com");

        WebElement passwordField = driver.findElement(By.name("password"));
        passwordField.sendKeys("kasun123");

        WebElement loginButton = wait.until(
                ExpectedConditions.elementToBeClickable(By.className("login-button")));
        loginButton.click();

        wait.until(ExpectedConditions.urlContains("/dashboard"));
        assertTrue(driver.getCurrentUrl().contains("/dashboard"));
    }

    @Test
    public void testLoginFailure() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement emailField = driver.findElement(By.name("email"));
        emailField.sendKeys("kasun@gmail.com");

        WebElement passwordField = driver.findElement(By.name("password"));
        passwordField.sendKeys("kasun");

        WebElement loginButton = wait.until(
                ExpectedConditions.elementToBeClickable(By.className("login-button")));
        loginButton.click();

        assertTrue(driver.getCurrentUrl().contains("/login"));

    }

    @AfterEach
    public void tearDown() {
        driver.quit();
    }

}
