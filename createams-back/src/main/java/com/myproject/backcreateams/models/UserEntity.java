package com.myproject.backcreateams.models;

import javax.persistence.*;

@Entity
@Table(name = "user")
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

    @Column(name = "image", nullable = true, columnDefinition = "TEXT")
    private String image;

    @Column(name = "premium")
    private Boolean premium;

    public Long getId() {
        return id;
    }

    // Pseudo
    public String getPseudo() {
        return pseudo;
    }
    
    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    // Name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getters et setters pour 'surname'
    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    // Password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Mail
    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    // Job
    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    // Mentor
    public String getMentor() {
        return mentor;
    }

    public void setMentor(String mentor) {
        this.mentor = mentor;
    }

    // Image
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    // Premium
    public Boolean getPremium() {
        return premium;
    }

    public void setPremium(Boolean premium) {
        this.premium = premium;
    }
}
