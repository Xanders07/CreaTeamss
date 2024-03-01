package com.myproject.backcreateams.models;

import java.util.List;

import javax.persistence.*;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "project")
@Data
public class ProjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "projectName", nullable = false, length = 255)
    private String projectName;

    @Lob
    @Column(name = "description", nullable = true)
    private String description;

    @ManyToMany(mappedBy = "projects")
    @JsonBackReference
    private List<UserEntity> users;

}
