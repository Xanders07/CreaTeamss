package com.myproject.DTO;

import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private Long id;
    private String pseudo;
    private String mail;
    private String surname;
    private String name;
    private Boolean premium;
    private List<ProjectDTO> projects;
    private String job;
    private String image;
    private String mentor;
}