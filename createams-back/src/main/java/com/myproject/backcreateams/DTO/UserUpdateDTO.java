package com.myproject.backcreateams.DTO;

import lombok.Data;

@Data
public class UserUpdateDTO {
    private Long id;
    private String name;
    private String surname;
    private String pseudo;
    private String mail;
    private String job;
}
