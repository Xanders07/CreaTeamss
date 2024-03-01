package com.myproject.backcreateams.services;

import org.springframework.stereotype.Service;

import com.myproject.backcreateams.repositories.ContactRequestRepository;
import com.myproject.backcreateams.models.ContactRequestEntity;
import com.myproject.backcreateams.models.UserEntity;
import com.myproject.backcreateams.enums.RequestStatus;

@Service
public class ContactRequestService {

    private final ContactRequestRepository contactRequestRepository;

    public ContactRequestService(ContactRequestRepository contactRequestRepository) {
        this.contactRequestRepository = contactRequestRepository;
    }

    public void sendContactRequest(UserEntity sender, UserEntity receiver) {

        if (sender != null && receiver != null) {
            ContactRequestEntity contactRequestEntity = new ContactRequestEntity();

            contactRequestEntity.setSender(sender);
            contactRequestEntity.setReceiver(receiver);
            contactRequestEntity.setStatus(RequestStatus.PENDING);

            contactRequestEntity = contactRequestRepository.save(contactRequestEntity);
        }

    }

}
