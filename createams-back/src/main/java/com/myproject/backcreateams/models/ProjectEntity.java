package com.myproject.backcreateams.models;

import java.util.List;

import javax.persistence.*;

import lombok.Data;

@Entity
@Table(name = "project")
@Data
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

}
