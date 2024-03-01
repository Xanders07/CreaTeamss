package com.myproject.backcreateams.DTO;

import lombok.Data;

@Data
public class UserProjectDTO {
    private Long id;
    private String pseudo;
    private String projectName;
    private String description;
}