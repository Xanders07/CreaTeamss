package com.myproject.backcreateams.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

   @Override
   public void addCorsMappings(CorsRegistry registry) {
       registry.addMapping("/api/**")
           .allowedOrigins("http://localhost:4200", "http://localhost:8080")
           .allowedMethods("GET", "POST", "PUT", "DELETE")
           .allowedHeaders("content-type")
           .exposedHeaders("*") // Expose tous les en-têtes
           .allowCredentials(true);
   }
}
