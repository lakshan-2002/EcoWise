package com.lakshan.ecowise.ui;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class AddWasteLogUiTest {
    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        WebDriverManager.chromedriver().setup(); // Download the correct ChromeDriver version
        driver = new ChromeDriver();
        driver.get("http://localhost:5173/logs");
    }

    @Test
    public void testAddWasteLogSuccess() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.findElement(By.name("itemName")).sendKeys("Bread");
        driver.findElement(By.name("category")).sendKeys("Grains & Bakery");
        driver.findElement(By.name("quantity")).sendKeys("5");
        driver.findElement(By.name("reason")).sendKeys("expired");
        driver.findElement(By.name("unit")).sendKeys("slices");
        driver.findElement(By.name("wastedDate")).sendKeys("2025-08-26");

        WebElement addButton = wait.until(
                ExpectedConditions.elementToBeClickable(By.className("logs-submit-btn")));
        addButton.click();

        assertTrue(driver.getCurrentUrl().contains("/logs"));
    }

    @AfterEach
    public void tearDown() {
        driver.quit();
    }
}
