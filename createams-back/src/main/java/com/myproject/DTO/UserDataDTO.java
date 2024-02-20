package com.myproject.DTO;

import java.util.Map;

import lombok.Data;

@Data
public class UserDataDTO {
    private String pseudo;
    private String mail;
    private String name;
    private String surname;
    private String mentor;
    private String image;
    private String job;
    private Boolean premium;
    private Map<String, Object> projects;
}