package com.myproject.DTO;

import lombok.Data;

@Data
public class UserUpdateDTO {
    private String pseudo;
    private String name;
    private String surname;
    private String mail;
    private String password;
    private Boolean premium;
}
