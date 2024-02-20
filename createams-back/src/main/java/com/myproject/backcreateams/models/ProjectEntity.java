package com.myproject.backcreateams.models;

import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "project")
public class ProjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_name", nullable = false, length = 255)
    private String project_name;


    @Lob
    @Column(name = "description", nullable = true)
    private String description;

    @ManyToMany(mappedBy = "projects")
    private List<UserEntity> users;

    public Long getId() {
        return id;
    }

    // Project Name
    public String getProjectName() {
        return project_name;
    }
    
    public void setProjectName(String project_name) {
        this.project_name = project_name;
    }

    // Description
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
