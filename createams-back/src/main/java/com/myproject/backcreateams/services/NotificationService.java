package com.myproject.backcreateams.services;

import org.springframework.stereotype.Service;

import com.myproject.backcreateams.models.NotificationEntity;
import com.myproject.backcreateams.models.UserEntity;
import com.myproject.backcreateams.repositories.NotificationRepository;
import com.myproject.backcreateams.enums.NotificationsStatus;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public void createNotification(UserEntity user) {
        NotificationEntity notificationEntity = new NotificationEntity();

        if (user != null) {
            notificationEntity.setStatus(NotificationsStatus.UNREAD);
            notificationEntity.setUser(user);

            notificationEntity = notificationRepository.save(notificationEntity);
        }
    }
}
