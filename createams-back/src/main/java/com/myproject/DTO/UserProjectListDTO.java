package com.myproject.DTO;

import lombok.Data;

@Data
public class UserProjectListDTO {
    private String projectName;
    private String description;
    private String createdAt;
}