package com.lakshan.ecowise;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class EcoWiseApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcoWiseApplication.class, args);
    }

}
