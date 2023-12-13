package com.myproject.backcreateams;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.myproject.backcreateams.models")
@EnableJpaRepositories("com.myproject.backcreateams.repositories")
public class BackCreateamsApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackCreateamsApplication.class, args);
    }
}
