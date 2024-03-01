package com.myproject.backcreateams.DTO;

import java.util.List;

import lombok.Data;

@Data
public class UserDataProfilDTO {
    private Long id;
    private String pseudo;
    private String mail;
    private String name;
    private String surname;
    private byte[] image;
    private String mentor;
    private String job;
    private Boolean premium;
    private List<UserProjectDTO> projects;
    private List<UserBasicDataDTO> contacts;
}
