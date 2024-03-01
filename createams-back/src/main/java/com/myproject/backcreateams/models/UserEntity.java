package com.myproject.backcreateams.models;

import lombok.Data;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "user")
@Data
public class UserEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "pseudo", nullable = false, length = 50)
        private String pseudo;

        @Column(name = "name", length = 50)
        private String name;

        @Column(name = "surname", length = 50)
        private String surname;

        @Column(name = "password", nullable = false, length = 100)
        private String password;

        @Column(name = "mail", nullable = false, length = 255)
        private String mail;

        @Column(name = "job", nullable = true, length = 255)
        private String job;

        @Column(name = "mentor", nullable = true, length = 50)
        private String mentor;

        @Lob
        @Column(name = "image", nullable = true)
        private byte[] image;

        @Column(name = "premium")
        private Boolean premium;

        @ManyToMany(cascade = CascadeType.ALL)
        @JoinTable(name = "user_project", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"))
        @JsonManagedReference
        private List<ProjectEntity> projects;

        @ManyToMany
        @JoinTable(name = "user_contacts", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "contact_id"))
        private List<UserEntity> contacts;

        @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
        private List<NotificationEntity> receivedNotifications = new ArrayList<>();
        
        @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
        private List<NotificationEntity> sentNotifications = new ArrayList<>();
        
}
