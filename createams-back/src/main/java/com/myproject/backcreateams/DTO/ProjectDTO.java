package com.myproject.backcreateams.DTO;

import lombok.Data;

@Data
public class ProjectDTO {
    private Long id;
    private String pseudo;
    private String projectName;
    private String description;
    private String createdAt;
}