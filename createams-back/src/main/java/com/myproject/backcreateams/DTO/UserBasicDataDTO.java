package com.myproject.backcreateams.DTO;

import lombok.Data;

@Data
public class UserBasicDataDTO {
    private Long id;
    private String pseudo;
    private String mail;
    private String name;
    private String surname;
    private byte[] image;
    private String mentor;
    private String job;
    private Boolean premium;
}
