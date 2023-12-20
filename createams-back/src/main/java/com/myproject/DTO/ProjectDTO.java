package com.myproject.DTO;

import lombok.Data;

@Data
public class ProjectDTO {
    private String pseudo;
    private String projectName;
    private String description;
    private String createdAt;
}