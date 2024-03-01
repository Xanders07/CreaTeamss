package com.myproject.backcreateams.DTO;

import lombok.Data;

@Data
public class UserCreateDTO {
    private String pseudo;
    private String mail;
    private String password;
    private Boolean premium;
}