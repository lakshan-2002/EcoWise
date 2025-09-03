package com.lakshan.ecowise;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(classes = EcoWiseApplication.class)
@ActiveProfiles("test")   // Spring tells to load application-test.properties for this test
class EcoWiseApplicationTests {

    @Test
    void contextLoads() {
    }

}
