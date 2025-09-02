package com.lakshan.ecowise;

import org.junit.runner.RunWith;
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;

@RunWith(Cucumber.class)
@CucumberOptions(
        features = "src/test/resources/features",
        glue = "com.lakshan.ecowise.steps",
        monochrome = true
)
public class CucumberTestRunner {

}
