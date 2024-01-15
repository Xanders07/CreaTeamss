package com.myproject.DTO;

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
}