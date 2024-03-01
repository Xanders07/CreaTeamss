package com.myproject.backcreateams.models;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import com.myproject.backcreateams.enums.NotificationsStatus;

import lombok.Data;

@Entity
@Table(name = "notification")
@Data
public class NotificationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;
    
    @Enumerated(EnumType.STRING)
    private NotificationsStatus status;

    private LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        timestamp = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

}
