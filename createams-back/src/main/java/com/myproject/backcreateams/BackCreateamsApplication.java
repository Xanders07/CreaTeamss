package com.myproject.backcreateams;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.myproject.backcreateams.config.CorsConfig;

@SpringBootApplication( exclude = { SecurityAutoConfiguration.class } )
@EnableCaching
@EntityScan("com.myproject.backcreateams.models")
@EnableJpaRepositories("com.myproject.backcreateams.repositories")
@Import(CorsConfig.class)
public class BackCreateamsApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackCreateamsApplication.class, args);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
